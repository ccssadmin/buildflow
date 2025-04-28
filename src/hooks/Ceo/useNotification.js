import { useDispatch, useSelector } from "react-redux"
import { createNotification } from "../../store/selector/ceo/notificationSelector";
import { createnotificationAction } from "../../store/actions/Ceo/createNotification";

export const useNotification = () =>{
    const dispatch = useDispatch();

    const notification = useSelector(createNotification);

    const createNotify = async (notificationData) =>{
        try{
            const result = await dispatch(createnotificationAction(notificationData)).unwrap();
            return result;
        }catch(error){
            console.log("Failed to create notification:", error);
            return {success:false, error};
        }
    };

    return{
        notification,

        createNotify
    }
}