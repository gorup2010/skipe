import { FriendInvitation, FriendInvitationGetDto } from "@/types/api";
import { api } from "@/lib/api-client";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const getFriendInvitation = (): Promise<FriendInvitationGetDto> => {
  return api.get("friend-invitations");
};

// Use this way you can get the queryKey in other hook to invalidate the query.
export const getFriendsInvitationQueryOptions = () => {
  return queryOptions({
    queryKey: ["friend-invitations"],
    queryFn: async () => {
      const apiResponse = await getFriendInvitation();

      // Map of userId to FriendInvitation
      const response = {
        asSender: new Map<number, FriendInvitation>(),
        asReveiver: new Map<number, FriendInvitation>(),
      };
      apiResponse.sentInvt.forEach((invt) =>
        response.asSender.set(invt.receiver.id, invt)
      );
      apiResponse.receivedInvt.forEach((invt) =>
        response.asSender.set(invt.sender.id, invt)
      );

      return response;
    },
    refetchOnWindowFocus: false,
    retry: false,
  });
};

// You can import and use it by:
// const friendInvitationsQuery = useFriendInvitations 
export const useFriendInvitations = () => {
  return useQuery({
    ...getFriendsInvitationQueryOptions()
  });
};

