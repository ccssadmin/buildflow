import axios from "axios";
import Config from "../config";
import loggerService from "./logger.service";
import { issetAuthToken, getAuthToken } from "../utils/storage";

// Request methods
const GET = "GET";
const POST = "POST";
const PUT = "PUT";
const DELETE = "DELETE";

// Create axios instance with basic configuration
const createAxiosInstance = () => {
  const instance = axios.create({
    baseURL: Config.apiBaseUrl,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
  });

  let isRefreshing = false;
  let failedQueue = [];
  // Define justLoggedIn variable at the module scope
  let justLoggedIn = false;

  const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    });

    failedQueue = [];
  };

  instance.interceptors.request.use(
    (config) => {
      if (issetAuthToken()) {
        config.headers["Authorization"] = `Bearer ${getAuthToken()}`;
      } else {
        delete config.headers["Authorization"];
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      justLoggedIn = false;
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      
      if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
          .then(token => {
            originalRequest.headers['Authorization'] = 'Bearer ' + token;
            return axiosBase(originalRequest);
          })
          .catch(err => {
            return Promise.reject(err);
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          const event = new Event('session_expired');
          document.dispatchEvent(event);
          return Promise.reject(error);
        }

        try {
          const { data } = await refreshToken({ refreshToken });
          localStorage.setItem("accessToken", data.token);
          localStorage.setItem("refreshToken", data.refreshToken);
          
          if (data.expiresIn) {
            const expirationTime = Date.now() + (data.expiresIn * 1000);
            localStorage.setItem("tokenExpiration", expirationTime.toString());
          }

          axiosBase.defaults.headers.common['Authorization'] = 'Bearer ' + data.token;
          originalRequest.headers['Authorization'] = 'Bearer ' + data.token;
          
          processQueue(null, data.token);
          return axiosBase(originalRequest);
        } catch (err) {
          processQueue(err, null);
          const event = new Event('session_expired');
          document.dispatchEvent(event);
          return Promise.reject(error);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );

  return {
    instance,
    setJustLoggedIn: (value) => { justLoggedIn = value; }
  };
};


const { instance: axiosBase, setJustLoggedIn } = createAxiosInstance();

/**
 * Http request
 */
export const request = async (
  method,
  path,
  httpParams,
  body,
  disableLoader = false
) => {
  consoleRequestResponseTime("request", Config.apiBaseUrl + "" + path);

  try {
    let response;
    switch (method) {
      case GET:
        response = await axiosBase.get(path, { params: httpParams });
        break;
      case POST:
        response = await axiosBase.post(path, body, { params: httpParams });
        break;
      case PUT:
        response = await axiosBase.put(path, body, { params: httpParams });
        break;
      case DELETE:
        response = await axiosBase.delete(path, { params: httpParams, data: body });
        break;
      default:
        throw new Error(`Unsupported method: ${method}`);
    }

    const processedData = processResponseData("success", path, response);
    return processedData;
  } catch (error) {
    processResponseData("failure", path, error);
    throw error;
  }
};

/**
 * Process the response data
 */
export const processResponseData = (type, path, data, failureMsg) => {
  if (type === "success") {
    if (Config.trackHttpResponseInConsole) {
      loggerService.showLog("Response Success");
      loggerService.showLog(["Request Url", Config.apiBaseUrl + "" + path]);
      loggerService.showLog(["Body", data]);
    }
    return data;
  } else {
    if (Config.trackHttpResponseInConsole) {
      loggerService.showLog("Response Failure");
      loggerService.showLog(["Url", Config.apiBaseUrl + "" + path]);
      loggerService.showLog(["Body", data]);
    }
    console.log(failureMsg);
  }
};

/**
 * Convert json null to empty write console
 */
export const convertNulltoEmpty = (data) => {
  let stringifyData = JSON.stringify(data).replace(/null/i, '""');
  stringifyData = stringifyData.replace(/null/g, '""');
  return JSON.parse(stringifyData);
};

/**
 * Request / Response Time Tracker
 */
const consoleRequestResponseTime = (type, url) => {
  if (Config.trackHttpTimeInConsole) {
    if (type === "request") {
      console.log("Request Url", url);
      console.log("Time Started", new Date());
    } else {
      console.log("Response Url", url);
      console.log("Time Ended", new Date());
    }
  }
};

/**
 * File upload handler
 */
export const doFileUpload = async (url, params) => {
  try {
    const formData = new FormData();
    if (params[0].body?.pageType === "ticket") {
      formData.append("files", params[0].file);
      formData.append("ticket_id", params[0].body?.ticketId);
    } else if (params[0].body?.pageType === "tool") {
      formData.append("files", params[0].file);
      formData.append("TicketId", params[0].body?.ticketId);
      formData.append("ToolId", params[0].body?.toolId);
      formData.append("tool_ticket_id", params[0].body?.tool_ticket_id);
    } else if (params[0].body?.pageType === "comment") {
      params[0].file.forEach((val) => {
        formData.append(`attachedFiles`, val);
      });
      formData.append("ticket_id", params[0].body?.ticket_id);
      formData.append("tool_id", params[0].body?.tool_id);
      formData.append("tool_ticket_id", params[0].body?.tool_ticket_id);
      formData.append("comment_id", params[0].body?.comment_id);
      formData.append("content", params[0].body?.content);
      formData.append("mentions", params[0].body?.mentions);
      const deletedAttachmentIds = params[0].body?.deleted_attachments.join(",");
      formData.append("deleted_attachments", deletedAttachmentIds);
    }

    const response = await axios.post(url, formData, {
      baseURL: Config.apiBaseUrl,
      headers: {
        Accept: "multipart/form-data",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });

    const validResponse = response.data;
    const processedData = processResponseData("success", url, validResponse);
    return processedData;
  } catch (error) {
    console.error("Error during file upload:", error);
    throw error;
  }
};

/**
 * File Download
 */
export const doFileDownload = async (path, httpParams, body, disableLoader = false) => {
  consoleRequestResponseTime("request", Config.apiBaseUrl + "" + path);

  try {
    const response = await axiosBase.post(path, body, { 
      params: httpParams, 
      responseType: "blob" 
    });
    
    if (response?.data) {
      const blobData = new Blob([response.data]);
      const blobUrl = URL.createObjectURL(blobData);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = body.file_name;
      a.click();
      URL.revokeObjectURL(blobUrl);
    }
  } catch (error) {
    processResponseData("failure", path, error);
    throw error;
  }
};

export { setJustLoggedIn };

export default {
  GET: (path, ...props) => request(GET, path, ...props),
  POST: (path, ...props) => request(POST, path, props.params, ...props),
  PUT: (path, ...props) => request(PUT, path, props.params, ...props),
  DELETE: (path, ...props) => request(DELETE, path, props.params, ...props),
  FILEUPLOAD: (path, ...props) => doFileUpload(path, props),
  FILEDOWNLOAD: (path, ...props) => doFileDownload(path, props.params, ...props),
};