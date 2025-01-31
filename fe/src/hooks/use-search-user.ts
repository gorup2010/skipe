import { searchUser } from "@/lib/user";
import { useQuery } from "@tanstack/react-query";

export const useSearchUser = (username: string, page: number) => {
  const { data, isPending, error } = useQuery({
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

  return {
    users: data,
    isPending,
    error,
  };
};
