import { api } from "@/lib/api-client";

export const deleteFriendInvitation = (invitationId: number): Promise<void> => {
    return api.delete(`friend-invitations/${invitationId}`);
  };