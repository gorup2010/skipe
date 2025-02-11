import { FriendInvitation, FriendInvitationGetDto } from "@/types/api";
import { api } from "@/lib/api-client";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const getFriendInvitation = (): Promise<FriendInvitationGetDto> => {
  return api.get("friend-invitations");
};

export const getFriendInvitationsQueryOptions = () => {
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
        response.asReveiver.set(invt.sender.id, invt)
      );

      return response;
    },
    refetchOnWindowFocus: false,
    retry: false,
  });
};


export const useFriendInvitations = () => {
  return useQuery({
    ...getFriendInvitationsQueryOptions()
  });
};
