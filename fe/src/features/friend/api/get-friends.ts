import { User } from "@/types/api";
import { api } from "@/lib/api-client";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const getFriends = (): Promise<User[]> => {
  return api.get("friends");
};

export const getFriendsQueryOptions = () => {
  return queryOptions({
    queryKey: ["friends"],
    queryFn: async () => {
      const apiResponse = await getFriends();

      // Map of userId to User
      const response = new Map<number, User>();
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
