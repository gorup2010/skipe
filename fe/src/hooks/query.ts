import { FriendInvitationGetDto } from "@/types/api";
import { api } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

export const getFriendInvitation = (
  page: number
): Promise<FriendInvitationGetDto> => {
  return api.get("friend-invitations", {
    params: {
      page,
    },
  });
};

export const useGetFriendInvitation = (page: number) => {
  return useQuery({
    queryKey: ["friend-invitations", page],
    queryFn: async () => {
      return await getFriendInvitation(page);
    },
    refetchOnWindowFocus: false,
    retry: false,
  });
};
