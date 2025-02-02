import { api } from "@/lib/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getFriendInvitationsQueryOptions } from "./get-friend-invitation";

export const createFriendInvitation = (userId: number): Promise<void> => {
  return api.post("friend-invitations", { userId });
};

export const useCreateFriendInvitation = () => {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: number) => {
      const response = await createFriendInvitation(userId);
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
