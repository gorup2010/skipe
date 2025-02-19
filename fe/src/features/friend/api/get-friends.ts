import { Friend } from "@/types/api";
import { api } from "@/lib/api-client";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const getFriends = (): Promise<Friend[]> => {
  return api.get("/users/myself/friends");
};

export const getFriendsQueryOptions = () => {
  return queryOptions({
    queryKey: ["/users/myself/friends"],
    queryFn: async () => {
      const apiResponse = await getFriends();

      // Map of userId to User
      const response = new Map<number, Friend>();
      apiResponse.forEach((friend) => response.set(friend.id, friend));

      return response;
    },
    refetchOnWindowFocus: false,
    retry: false,
  });
};

export const useFriends = () => {
  return useQuery({ ...getFriendsQueryOptions() });
};
