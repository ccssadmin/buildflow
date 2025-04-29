export const selectApprovals = (state) => state.updateprojectapproval?.approvals || [];
export const selectTicketDetails = (state) => state.getticket?.ticketDetails || null;
export const selectTickets = (state) => state.createticket?.createticket || [];