import { Message } from "@/types/api";
import { api } from "@/lib/api-client";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const getMessages = (chatroomId: number): Promise<Message[]> => {
  return api.get(`chatrooms/${chatroomId}/messages`);
};

export const getMessagesQueryOptions = (chatroomId: number | undefined) => {
  return queryOptions({
    queryKey: ["chatrooms", chatroomId, "messages"],
    queryFn: async () => {
      if (chatroomId === undefined) return [];
      return await getMessages(chatroomId);
    },
    refetchOnWindowFocus: false,
    retry: false,
  });
};

export const useMessages = (chatroomId: number | undefined) => {
  return useQuery({
    ...getMessagesQueryOptions(chatroomId),
  });
};
