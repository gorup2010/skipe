import { api } from "@/lib/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getFriendInvitationsQueryOptions } from "./get-friend-invitation";

export const deleteFriendInvitation = (invitationId: number): Promise<void> => {
  return api.delete(`friend-invitations/${invitationId}`);
};

export const useDeleteFriendInvitation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: number | undefined) => {
      if (userId == undefined) throw new Error();
      const response = await deleteFriendInvitation(userId);
      return response;
    },
    onError: (error) => {
      console.log("Error in useCreateFriendInvitation " + error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getFriendInvitationsQueryOptions().queryKey,
      });
    },
  });
};
