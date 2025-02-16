import { Chatroom } from "@/types/api";
import { api } from "@/lib/api-client";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const getChatrooms = (): Promise<Chatroom[]> => {
  return api.get("chatrooms");
};

export const getChatroomsQueryOptions = () => {
  return queryOptions({
    queryKey: ["chatrooms"],
    queryFn: async () => {
      const apiResponse = await getChatrooms();

      return apiResponse;
    },
    refetchOnWindowFocus: false,
    retry: false,
  });
};

export const useChatrooms = () => {
  return useQuery({
    ...getChatroomsQueryOptions()
  });
};