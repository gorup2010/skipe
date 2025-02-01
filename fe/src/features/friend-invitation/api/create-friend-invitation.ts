import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

export const createFriendInvitation = (userId: number): Promise<void> => {
  return api.post("friend-invitations", { userId });
};

export const useCreateFriendInvitation = () => {
  return useMutation({
    mutationFn: async (userId: number) => {
      const response = await createFriendInvitation(userId);
      return response;
    },
    onError: (error) => {
      console.log("Error in useCreateFriendInvitation " + error);
    },
    onSuccess: () => {},
  });
};
