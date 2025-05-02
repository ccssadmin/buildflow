import { createSlice } from "@reduxjs/toolkit";

import {
  getColorAction,
  getCountryAction,
  getUserDepartmentAction,
  getDepartmentAction,
  addDepartmentAction,
  updateDepartmentAction,
  getProductToolsAction,
  getDesignationAction,
  getRolesAction,
  getMarketRegionAction,
  getRegionAction,
  getLanguageAction,
  getShiftAction,
  getRoleSettingAction,
  updateRoleSettingAction,
  noBoardAccessRequestAction,
  newUserAccessRequestAction,
  getIndustryAction,
  getCustomerTypeAction,
  getCustomerRegionAction,
  getPackageAction,
  getToolStatusAction,
  getCategoriesAction,
  getPlatformsAction,
  getSubscriptionsListAction,
  getProductOwnersAction,
  getPackageToolDetailsAction,
  getCurrencyAction,
  getStatusCodeMasterAction,
  getFontFamilyAction,
  getLabelsAction,
  getCustomerLanguageAction,
  getPrimaryMarketAction,
  getPeriodicToolsAction,
  getPeriodicDetailsAction,
  getAllAgencyAction,
  getAllCountryDetailAction,
getUpdatesMarketRegionsAction,
getAllTimeZoneDetailAction,
getTicketsbyboardParticipantsAction,
addBoardAction,
getBoardAction,
editBoardAction,
createTicketDetailsAction
} from "../actions/masterAction";
import { getLoginBoardDetailsdAction } from "../actions/kanbanAction";

const initialState = {
  color: {
    data: [],
    loading: false,
    error: null,
  },
  country: {
    data: [],
    loading: false,
    error: null,
  },
  userDepartment: {
    data: [],
    loading: false,
    error: null,
  },
  department: {
    data: [],
    loading: false,
    error: null,
  },
  board:{
    data:[],
    loading: false,
    error: null,
  },
  tools: {
    data: [],
    loading: false,
    error: null,
  },
  designation: {
    data: [],
    loading: false,
    error: null,
  },
  roles: {
    data: [],
    loading: false,
    error: null,
  },
  region: {
    data: [],
    loading: false,
    error: null,
  },
  regionMasterList: {
    data: [],
    loading: false,
    error: null,
  },
  language: {
    data: [],
    loading: false,
    error: null,
  },
  shift: {
    data: [],
    loading: false,
    error: null,
  },
  permission: {
    data: [],
    loading: false,
    error: null,
  },
  noBoardAccess: {
    data: [],
    loading: false,
    error: null,
  },
  newUserAccess: {
    data: [],
    loading: false,
    error: null,
  },
  industry: {
    data: [],
    loading: false,
    error: null,
  },
  customerRegion: {
    data: [],
    loading: false,
    error: null,
  },
  customerType: {
    data: [],
    loading: false,
    error: null,
  },
  package: {
    data: [],
    loading: false,
    error: null,
  },
  platforms: {
    data: [],
    loading: false,
    error: null,
  },
  subscriptionsList: {
    data: [],
    loading: false,
    error: null,
  },
  toolStatus: {
    data: [],
    loading: false,
    error: null,
  },
  categories: {
    data: [],
    loading: false,
    error: null,
  },
  productOwners: {
    data: [],
    loading: false,
    error: null,
  },
  packageTool: {
    data: [],
    loading: false,
    error: null,
  },
  currency: {
    data: [],
    loading: false,
    error: null,
  },
  statusCodeMaster: {
    data: [],
    loading: false,
    error: null,
  },
  fontFamilyMaster: {
    data: [],
    loading: false,
    error: null,
  },
  labels: {
    data: [],
    loading: false,
    error: null,
  },
  customerLanguage: {
    data: [],
    loading: false,
    error: null,
  },
  primaryMarket : {
    data: [],
    loading: false,
    error: null,
  },
  periodicTools: {
    data: [],
    loading: false,
    error: null,
  },
  periodicDetails: {
    data: [],
    loading: false,
    error: null,
  },
  agency: {
    data: [],
    loading: false,
    error: null,
  },
  allCountryDetail: {
    data: [],
    loading: false,
    error: null,
  },
  updatesMarketRegions: {
    data: [],
    loading: false,
    error: null,
  },
  getAllTimeZoneDetail: {
    data: [],
    loading: false,
    error: null,
  },
  getTicketsbyboardParticipants: {
    data: [],
    loading: false,
    error: null,
  },
  createTicketDetails: {
    data: [],
    loading: false,
    error: null,
  },
  loginBoardDetails: {
    data: [],
    loading: false,
    error: null,
    message: "",
  },
};

const masterSlice = createSlice({
  name: "master",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /** CORE COLORS */
    builder.addCase(getColorAction.pending, (state, action) => {
      state.color.loading = true;
    });
    builder.addCase(getColorAction.fulfilled, (state, action) => {
      const data = action.payload;
      state.color.data = data;
      state.color.loading = false;
    });
    builder.addCase(getColorAction.rejected, (state, action) => {
      state.fetchError = action.error;
      state.color.loading = false;
    });

    /** COUNTRY */
    builder.addCase(getCountryAction.pending, (state, action) => {
      state.country.loading = true;
    });
    builder.addCase(getCountryAction.fulfilled, (state, action) => {
      const data = action.payload;
      state.country.data = data;
      state.country.loading = false;
    });
    builder.addCase(getCountryAction.rejected, (state, action) => {
      state.fetchError = action.error;
      state.country.loading = false;
    });

    /** USER DEPARTMENT */
    builder.addCase(getUserDepartmentAction.pending, (state, action) => {
      state.userDepartment.loading = true;
    });
    builder.addCase(getUserDepartmentAction.fulfilled, (state, action) => {
      const data = action.payload;
      state.userDepartment.data = data;
      state.userDepartment.loading = false;
    });
    builder.addCase(getUserDepartmentAction.rejected, (state, action) => {
      state.fetchError = action.error;
      state.userDepartment.loading = false;
    });

     /** DEPARTMENT */
     builder.addCase(getDepartmentAction.pending, (state, action) => {
      state.department.loading = true;
    });
    builder.addCase(getDepartmentAction.fulfilled, (state, action) => {
      const data = action.payload;
      state.department.data = data;
      state.department.loading = false;
    });
    builder.addCase(getDepartmentAction.rejected, (state, action) => {
      state.fetchError = action.error;
      state.department.loading = false;
    });


    /** ADD NEW DEPARTMENT */
    builder.addCase(addDepartmentAction.pending, (state, action) => {
      state.department.loading = true;
    });
    builder.addCase(addDepartmentAction.fulfilled, (state, action) => {
      state.department.data.push({
        deptID: action.payload.deptID,
        name: action.meta.arg.name,
      });
      state.department.loading = false;
    });
    builder.addCase(addDepartmentAction.rejected, (state, action) => {
      state.fetchError = action.error;
      state.department.loading = false;
    });

    
    /** ADD NEW Board */
    builder.addCase(getBoardAction.pending, (state, action) => {
      state.board.loading = true;
    });
    builder.addCase(getBoardAction.fulfilled, (state, action) => {
      const data = action.payload;
      state.board.data = data;
      state.board.loading = false;
    });
    builder.addCase(getBoardAction.rejected, (state, action) => {
      state.fetchError = action.error;
      state.board.loading = false;
    });

    builder.addCase(addBoardAction.pending, (state, action) => {
      state.board.loading = true;
    });
    builder.addCase(addBoardAction.fulfilled, (state, action) => {
      state.board.data.push({
        boardId: action.payload.boardId,
        name: action.meta.arg.name,
      });
      state.board.loading = false;
    });
    builder.addCase(addBoardAction.rejected, (state, action) => {
      state.fetchError = action.error;
      state.board.loading = false;
    });

    builder.addCase(editBoardAction.pending, (state, action) => {
      state.board.loading = true;
    });

    builder.addCase(editBoardAction.fulfilled, (state, action) => {
      const updatedBoard = action.payload;
      const index = state.board.data.findIndex(
        (item) => item.boardId === updatedBoard.boardId
      );
      if (index !== -1) {
        state.board.data[index] = updatedBoard; 
      }
      state.board.loading = false;
    });
    
    builder.addCase(editBoardAction.rejected, (state, action) => {
      state.fetchError = action.error;
      state.board.loading = false;
    });

    /** UPDATE DEPARTMENT */
    builder.addCase(updateDepartmentAction.pending, (state, action) => {
      state.department.loading = true;
    });
    builder.addCase(updateDepartmentAction.fulfilled, (state, action) => {
      const index = state.department.data.findIndex(
        (item) => item.deptID === action.meta.arg.deptID
      );
      if (index !== -1) {
        state.department.data[index]["name"] = action.meta.arg.name; // Update existing data
      }
      state.department.loading = false;
    });
    builder.addCase(updateDepartmentAction.rejected, (state, action) => {
      state.fetchError = action.error;
      state.department.loading = false;
    });

    /** PRODUCT & TOOLS */
    builder.addCase(getProductToolsAction.pending, (state, action) => {
      state.tools.loading = true;
    });
    builder.addCase(getProductToolsAction.fulfilled, (state, action) => {
      const data = action.payload;
      state.tools.data = data;
      state.tools.loading = false;
    });
    builder.addCase(getProductToolsAction.rejected, (state, action) => {
      state.fetchError = action.error;
      state.tools.loading = false;
    });

    /** DESIGNATION */
    builder.addCase(getDesignationAction.pending, (state, action) => {
      state.designation.loading = true;
    });
    builder.addCase(getDesignationAction.fulfilled, (state, action) => {
      const data = action.payload;
      state.designation.data = data;
      state.designation.loading = false;
    });
    builder.addCase(getDesignationAction.rejected, (state, action) => {
      state.fetchError = action.error;
      state.designation.loading = false;
    });

    /** ROLES */
    builder.addCase(getRolesAction.pending, (state, action) => {
      state.roles.loading = true;
    });
    builder.addCase(getRolesAction.fulfilled, (state, action) => {
      const data = action.payload;
      state.roles.data = data;
      state.roles.loading = false;
    });
    builder.addCase(getRolesAction.rejected, (state, action) => {
      state.fetchError = action.error;
      state.roles.loading = false;
    });

    /** MARKET / REGION */
    builder.addCase(getMarketRegionAction.pending, (state, action) => {
      state.region.loading = true;
    });
    builder.addCase(getMarketRegionAction.fulfilled, (state, action) => {
      const data = action.payload;
      state.region.data = data;
      state.region.loading = false;
    });
    builder.addCase(getMarketRegionAction.rejected, (state, action) => {
      state.fetchError = action.error;
      state.region.loading = false;
    });

    /** REGION */
    builder.addCase(getRegionAction.pending, (state, action) => {
      state.regionMasterList.loading = true;
    });
    builder.addCase(getRegionAction.fulfilled, (state, action) => {
      const data = action.payload;
      state.regionMasterList.data = data;
      state.regionMasterList.loading = false;
    });
    builder.addCase(getRegionAction.rejected, (state, action) => {
      state.fetchError = action.error;
      state.regionMasterList.loading = false;
    });

    /** LANGUAGE */
    builder.addCase(getLanguageAction.pending, (state, action) => {
      state.language.loading = true;
    });
    builder.addCase(getLanguageAction.fulfilled, (state, action) => {
      const data = action.payload;
      state.language.data = data;
      state.language.loading = false;
    });
    builder.addCase(getLanguageAction.rejected, (state, action) => {
      state.fetchError = action.error;
      state.language.loading = false;
    });

    /** SHIFT TIMING */
    builder.addCase(getShiftAction.pending, (state, action) => {
      state.shift.loading = true;
    });
    builder.addCase(getShiftAction.fulfilled, (state, action) => {
      const data = action.payload;
      state.shift.data = data;
      state.shift.loading = false;
    });
    builder.addCase(getShiftAction.rejected, (state, action) => {
      state.fetchError = action.error;
      state.shift.loading = false;
    });

    /** ROLES & RESTRICTION */
    builder.addCase(getRoleSettingAction.pending, (state, action) => {
      state.permission.loading = true;
    });
    builder.addCase(getRoleSettingAction.fulfilled, (state, action) => {
      const data = action.payload;
      state.permission.data = data;
      state.permission.loading = false;
    });
    builder.addCase(getRoleSettingAction.rejected, (state, action) => {
      state.fetchError = action.error;
      state.permission.loading = false;
    });

    /** UPDATE ROLES & RESTRICTION SETTINGS */
    builder.addCase(updateRoleSettingAction.pending, (state, action) => {
      state.permission.loading = true;
    });
    builder.addCase(updateRoleSettingAction.fulfilled, (state, action) => {
      // const updatedData = state.data.map((feature) => ({
      //     ...feature,
      //     details: feature.details.map((detail) => ({
      //         ...detail,
      //         roles: detail.roles.map((role) =>
      //             role.id === action.meta.arg.id ? { ...role, ischecked: !role.ischecked } : role
      //         ),
      //     })),
      // }));

      // state.permission.data = updatedData;
      state.permission.loading = false;
    });
    builder.addCase(updateRoleSettingAction.rejected, (state, action) => {
      state.fetchError = action.error;
      state.permission.loading = false;
    });

    /*** MAIL SENT **/
    builder.addCase(noBoardAccessRequestAction.pending, (state, action) => {
      state.noBoardAccess.loading = true;
    });
    builder.addCase(noBoardAccessRequestAction.fulfilled, (state, action) => {
      const data = action.payload;
      state.noBoardAccess.data = data;
      state.noBoardAccess.loading = false;
    });
    builder.addCase(noBoardAccessRequestAction.rejected, (state, action) => {
      state.fetchError = action.error;
      state.noBoardAccess.loading = false;
    });

    builder.addCase(newUserAccessRequestAction.pending, (state, action) => {
      state.newUserAccess.loading = true;
    });
    builder.addCase(newUserAccessRequestAction.fulfilled, (state, action) => {
      const data = action.payload;
      state.newUserAccess.data = data;
      state.newUserAccess.loading = false;
    });
    builder.addCase(newUserAccessRequestAction.rejected, (state, action) => {
      state.fetchError = action.error;
      state.newUserAccess.loading = false;
    });

    /** INDUSTRY */
    builder.addCase(getIndustryAction.pending, (state, action) => {
      state.industry.loading = true;
    });
    builder.addCase(getIndustryAction.fulfilled, (state, action) => {
      const data = action.payload;
      state.industry.data = data;
      state.industry.loading = false;
    });
    builder.addCase(getIndustryAction.rejected, (state, action) => {
      state.fetchError = action.error;
      state.industry.loading = false;
    });

    /** CUSTOMER TYPE */
    builder.addCase(getCustomerTypeAction.pending, (state, action) => {
      state.customerType.loading = true;
    });
    builder.addCase(getCustomerTypeAction.fulfilled, (state, action) => {
      const data = action.payload;
      state.customerType.data = data;
      state.customerType.loading = false;
    });
    builder.addCase(getCustomerTypeAction.rejected, (state, action) => {
      state.fetchError = action.error;
      state.customerType.loading = false;
    });

    /** CUSTOMER REGION */
    builder.addCase(getCustomerRegionAction.pending, (state, action) => {
      state.customerRegion.loading = true;
    });
    builder.addCase(getCustomerRegionAction.fulfilled, (state, action) => {
      const data = action.payload;
      state.customerRegion.data = data;
      state.customerRegion.loading = false;
    });
    builder.addCase(getCustomerRegionAction.rejected, (state, action) => {
      state.fetchError = action.error;
      state.customerRegion.loading = false;
    });

    /** PACKAGE */
    builder.addCase(getPackageAction.pending, (state, action) => {
      state.package.loading = true;
    });
    builder.addCase(getPackageAction.fulfilled, (state, action) => {
      const data = action.payload;
      state.package.data = data;
      state.package.loading = false;
    });
    builder.addCase(getPackageAction.rejected, (state, action) => {
      state.fetchError = action.error;
      state.package.loading = false;
    });

    /** Tool Status */
    builder.addCase(getToolStatusAction.pending, (state, action) => {
      state.toolStatus.loading = true;
    });
    builder.addCase(getToolStatusAction.fulfilled, (state, action) => {
      const data = action.payload;
      state.toolStatus.data = data;
      state.toolStatus.loading = false;
    });
    builder.addCase(getToolStatusAction.rejected, (state, action) => {
      state.fetchError = action.error;
      state.toolStatus.loading = false;
    });

    /** CATEGORIES */
    builder.addCase(getCategoriesAction.pending, (state, action) => {
      state.categories.loading = true;
    });
    builder.addCase(getCategoriesAction.fulfilled, (state, action) => {
      const data = action.payload;
      state.categories.data = data;
      state.categories.loading = false;
    });
    builder.addCase(getCategoriesAction.rejected, (state, action) => {
      state.fetchError = action.error;
      state.categories.loading = false;
    });

    /** PLATFORMS */
    builder.addCase(getPlatformsAction.pending, (state, action) => {
      state.platforms.loading = true;
    });
    builder.addCase(getPlatformsAction.fulfilled, (state, action) => {
      const data = action.payload;
      state.platforms.data = data;
      state.platforms.loading = false;
    });
    builder.addCase(getPlatformsAction.rejected, (state, action) => {
      state.fetchError = action.error;
      state.platforms.loading = false;
    });

    /** SUBSCRIPTIONS */
    builder.addCase(getSubscriptionsListAction.pending, (state, action) => {
      state.subscriptionsList.loading = true;
    });
    builder.addCase(getSubscriptionsListAction.fulfilled, (state, action) => {
      const data = action.payload;
      state.subscriptionsList.data = data;
      state.subscriptionsList.loading = false;
    });
    builder.addCase(getSubscriptionsListAction.rejected, (state, action) => {
      state.fetchError = action.error;
      state.subscriptionsList.loading = false;
    });

    /** PRODUCT OWNERS */
    builder.addCase(getProductOwnersAction.pending, (state, action) => {
      state.productOwners.loading = true;
    });
    builder.addCase(getProductOwnersAction.fulfilled, (state, action) => {
      const data = action.payload;
      state.productOwners.data = data;
      state.productOwners.loading = false;
    });
    builder.addCase(getProductOwnersAction.rejected, (state, action) => {
      state.fetchError = action.error;
      state.productOwners.loading = false;
    });

    /** PACKAGE MAPPED TOOLS */
    builder.addCase(getPackageToolDetailsAction.pending, (state, action) => {
      state.packageTool.loading = true;
    });
    builder.addCase(getPackageToolDetailsAction.fulfilled, (state, action) => {
      const data = action.payload;
      state.packageTool.data = data;
      state.packageTool.loading = false;
    });
    builder.addCase(getPackageToolDetailsAction.rejected, (state, action) => {
      state.fetchError = action.error;
      state.packageTool.loading = false;
    });

    /** CURRENCY */
    builder.addCase(getCurrencyAction.pending, (state, action) => {
      state.currency.loading = true;
    });
    builder.addCase(getCurrencyAction.fulfilled, (state, action) => {
      const data = action.payload;
      state.currency.data = data;
      state.currency.loading = false;
    });
    builder.addCase(getCurrencyAction.rejected, (state, action) => {
      state.fetchError = action.error;
      state.currency.loading = false;
    });

    /** CORE COLORS */
    builder.addCase(getStatusCodeMasterAction.pending, (state, action) => {
      state.statusCodeMaster.loading = true;
    });
    builder.addCase(getStatusCodeMasterAction.fulfilled, (state, action) => {
      const data = action.payload;
      state.statusCodeMaster.data = data;
      state.statusCodeMaster.loading = false;
    });
    builder.addCase(getStatusCodeMasterAction.rejected, (state, action) => {
      state.fetchError = action.error;
      state.statusCodeMaster.loading = false;
    });

    /** GET FONT FAMILY */
    builder.addCase(getFontFamilyAction.pending, (state, action) => {
      state.fontFamilyMaster.loading = true;
    });
    builder.addCase(getFontFamilyAction.fulfilled, (state, action) => {
      const data = action.payload;
      state.fontFamilyMaster.data = data;
      state.fontFamilyMaster.loading = false;
    });
    builder.addCase(getFontFamilyAction.rejected, (state, action) => {
      state.fetchError = action.error;
      state.fontFamilyMaster.loading = false;
    });

    /** GET LABELS */
    builder.addCase(getLabelsAction.pending, (state, action) => {
      state.labels.loading = true;
    });
    builder.addCase(getLabelsAction.fulfilled, (state, action) => {
      const data = action.payload;
      state.labels.data = data;
      state.labels.loading = false;
    });
    builder.addCase(getLabelsAction.rejected, (state, action) => {
      state.fetchError = action.error;
      state.labels.loading = false;
    });

    /** CUSTOMER LANGUAGE */
    builder.addCase(getCustomerLanguageAction.pending, (state, action) => {
      state.customerLanguage.loading = true;
    });
    builder.addCase(getCustomerLanguageAction.fulfilled, (state, action) => {
      const data = action.payload;
      state.customerLanguage.data = data;
      state.customerLanguage.loading = false;
    });
    builder.addCase(getCustomerLanguageAction.rejected, (state, action) => {
      state.fetchError = action.error;
      state.customerLanguage.loading = false;
    });
    
    /** PRIMARY MARKET LIST */
    builder.addCase(getPrimaryMarketAction.pending, (state, action) => {
      state.primaryMarket.loading = true;
    });
    builder.addCase(getPrimaryMarketAction.fulfilled, (state, action) => {
      const data = action.payload;
      state.primaryMarket.data = data;
      state.primaryMarket.loading = false;
    });
    builder.addCase(getPrimaryMarketAction.rejected, (state, action) => {
      state.fetchError = action.error;
      state.primaryMarket.loading = false;
    });

    /** PERIODIC_TOOLS_MASTER */
    builder.addCase(getPeriodicToolsAction.pending, (state, action) => {
      state.periodicTools.loading = true;
    });
    builder.addCase(getPeriodicToolsAction.fulfilled, (state, action) => {
      const data = action.payload;
      state.periodicTools.data = data;
      state.periodicTools.loading = false;
    });
    builder.addCase(getPeriodicToolsAction.rejected, (state, action) => {
      state.fetchError = action.error;
      state.periodicTools.loading = false;
    });

    /** PERIODIC_DETAILS_MASTER */
    builder.addCase(getPeriodicDetailsAction.pending, (state, action) => {
      state.periodicDetails.loading = true;
    });
    builder.addCase(getPeriodicDetailsAction.fulfilled, (state, action) => {
      const data = action.payload;
      state.periodicDetails.data = data;
      state.periodicDetails.loading = false;
    });
    builder.addCase(getPeriodicDetailsAction.rejected, (state, action) => {
      state.fetchError = action.error;
      state.periodicDetails.loading = false;
    });

     /** AGENCY LIST */
     builder.addCase(getAllAgencyAction.pending, (state, action) => {
      state.agency.loading = true;
    });
    builder.addCase(getAllAgencyAction.fulfilled, (state, action) => {
      const data = action.payload;
      state.agency.data = data;
      state.agency.loading = false;
    });
    builder.addCase(getAllAgencyAction.rejected, (state, action) => {
      state.fetchError = action.error;
      state.agency.loading = false;
    });

    /** ALL COUNTRY DETAIL */
    builder.addCase(getAllCountryDetailAction.pending, (state, action) => {
      state.allCountryDetail.loading = true;
    });
    builder.addCase(getAllCountryDetailAction.fulfilled, (state, action) => {
      const data = action.payload;
      state.allCountryDetail.data = data;
      state.allCountryDetail.loading = false;
    });
    builder.addCase(getAllCountryDetailAction.rejected, (state, action) => {
      state.fetchError = action.error;
      state.allCountryDetail.loading = false;
    });

    /** GET PERIODIC UPDATES MARKET REGIONS **/
    builder.addCase(getUpdatesMarketRegionsAction.pending, (state, action) => {
      state.updatesMarketRegions.loading = true;
    });
    builder.addCase(getUpdatesMarketRegionsAction.fulfilled, (state, action) => {
      const data = action.payload;
      state.updatesMarketRegions.data = data;
      state.updatesMarketRegions.loading = false;
    });
    builder.addCase(getUpdatesMarketRegionsAction.rejected, (state, action) => {
      state.fetchError = action.error;
      state.updatesMarketRegions.loading = false;
    });

    /** GET TIME ZONE DETAIL **/
    builder.addCase(getAllTimeZoneDetailAction.pending, (state, action) => {
      state.getAllTimeZoneDetail.loading = true;
    });
    builder.addCase(getAllTimeZoneDetailAction.fulfilled, (state, action) => {
      const data = action.payload;
      state.getAllTimeZoneDetail.data = data;
      state.getAllTimeZoneDetail.loading = false;
    });
    builder.addCase(getAllTimeZoneDetailAction.rejected, (state, action) => {
      state.fetchError = action.error;
      state.getAllTimeZoneDetail.loading = false;
    });

     /** GET PARTICIPANTS UPDATES - KANBAN BOARD **/
     builder.addCase(getTicketsbyboardParticipantsAction.pending, (state, action) => {
      state.getTicketsbyboardParticipants.loading = true;
    });
    builder.addCase(getTicketsbyboardParticipantsAction.fulfilled, (state, action) => {
      const data = action.payload;
      
      state.getTicketsbyboardParticipants.data = data;
      state.getTicketsbyboardParticipants.loading = false;
    });
    builder.addCase(getTicketsbyboardParticipantsAction.rejected, (state, action) => {
      state.fetchError = action.error;
      state.getTicketsbyboardParticipants.loading = false;
    });

    /** create ticket commmet */
    builder.addCase(createTicketDetailsAction.pending, (state, action) => {
      state.createTicketDetails.loading = true;
    });
    builder.addCase(createTicketDetailsAction.fulfilled, (state, action) => {
      const data = action.payload;
      state.createTicketDetails.data = data;
      state.createTicketDetails.loading = false;
    });
    builder.addCase(createTicketDetailsAction.rejected, (state, action) => {
      state.fetchError = action.error;
      state.createTicketDetails.loading = false;
    });
    /** USED TO GET LOGIN BOARD DETAILS */
    builder.addCase(getLoginBoardDetailsdAction.pending, (state, action) => {
      state.loginBoardDetails.loading = true;
    });
    builder.addCase(getLoginBoardDetailsdAction.fulfilled, (state, action) => {
      const data = action.payload;
      state.loginBoardDetails.data = data;
      state.loginBoardDetails.loading = false;
    });
    builder.addCase(getLoginBoardDetailsdAction.rejected, (state, action) => {
      state.fetchError = action.error;
      state.loginBoardDetails.loading = false;
    });

  
  },
});

export default masterSlice;
