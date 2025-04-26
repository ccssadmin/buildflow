import { useDispatch, useSelector } from "react-redux"
import { createTickets } from "../../store/selector/ceo/ticketSelector";
import { createticketAction } from "../../store/actions/Ceo/TicketCreate";

export const useTicket = () =>{
    const dispatch = useDispatch();

    const ticket = useSelector(createTickets);

    const createTicket = async (ticketData) =>{
        try{
            const result = await dispatch(createticketAction(ticketData)).unwrap();
            return result;
        }catch(error){
            console.log("Failed to create ticket:", error);
            return {success:false, error};
        }
    };

    return{
        ticket,

        createTicket
    }
}