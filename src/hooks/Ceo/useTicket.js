import { useDispatch, useSelector } from "react-redux";
import { selectApprovals, selectTickets, selectTicketDetails } from "../../store/selector/ceo/ticketSelector";
import { updateProjectApprovalAction, createticketAction, getticketbyidAction } from "../../store/actions/Ceo/TicketCreateAction";

export const useTicket = () => {
  const dispatch = useDispatch();

  const ticket = useSelector(selectTickets);
  const ticketDetails = useSelector(selectTicketDetails);
  const approvals = useSelector(selectApprovals);

  const createTicket = async (ticketData) => {
    try {
      const result = await dispatch(createticketAction(ticketData)).unwrap();
      return { success: true, data: result };
    } catch (error) {
      console.error("Failed to create ticket:", error);
      return { success: false, error };
    }
  };

  const fetchTicketById = async (ticketId) => {
    try {
      const result = await dispatch(getticketbyidAction(ticketId)).unwrap();
      return { success: true, data: result };
    } catch (error) {
      console.error("Failed to fetch ticket by ID:", error);
      return { success: false, error };
    }
  };

  const updateProjectApprovalHook = async (approvalData) => {
    try {
      const result = await dispatch(updateProjectApprovalAction(approvalData)).unwrap();
      return { success: true, data: result };
    } catch (error) {
      console.error("Failed to update project approval:", error);
      return { success: false, error };
    }
  };

  return {
    ticket,
    ticketDetails,
    approvals,
    createTicket,
    fetchTicketById,
    updateProjectApprovalHook
  };
};