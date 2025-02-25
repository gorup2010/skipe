import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getFriendInvitationsQueryOptions } from "./get-friend-invitation";
import { getFriendsQueryOptions } from "@/features/friend/api/get-friends";
import { getChatroomsQueryOptions } from "@/features/chat/api/get-chatrooms";

export const acceptInvitation = ({
  invitationId,
}: {
  invitationId: number | undefined;
}): Promise<void> => {
  if (invitationId == undefined) throw new Error();
  return api.post(`friend-invitations/${invitationId}/accept`, {
    invitationId,
  });
};

type Options = {
  mutationConfig?: MutationConfig<typeof acceptInvitation>;
};

export const useAcceptFriendInvitation = ({ mutationConfig }: Options = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: acceptInvitation,
    onError: (error) => {
      console.log("Error in useAcceptFriendInvitation " + error);
    },
    ...restConfig,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getFriendInvitationsQueryOptions().queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: getFriendsQueryOptions().queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: getChatroomsQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
  });
};
