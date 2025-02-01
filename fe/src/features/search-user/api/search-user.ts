import { useQuery } from "@tanstack/react-query";
import { User } from "@/types/api";
import { api } from "@/lib/api-client";

export const searchUser = (username: string, page: number): Promise<User[]> => {
  return api.get("users", {
    params: {
      username,
      page,
    },
  });
};

export const useSearchUser = (username: string, page: number) => {
  return useQuery({
    queryKey: ["users", username, page],
    queryFn: async () => {
      if (username === "") {
        return [];
      }
      return await searchUser(username, page);
    },
    refetchOnWindowFocus: false,
    retry: false,
  });
};
