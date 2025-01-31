import { FriendInvitation } from "@/types/api";
import { api } from "./api-client";

export const getFriendInvitation = (
  page: number
): Promise<FriendInvitation[]> => {
  return api.get("friend-invitations", {
    params: {
      page,
    },
  });
};

export const createFriendInvitation = (userId: number): Promise<void> => {
  return api.post("friend-invitations", { userId });
};

export const deleteFriendInvitation = (invitationId: number): Promise<void> => {
  return api.delete(`friend-invitations/${invitationId}`);
};
