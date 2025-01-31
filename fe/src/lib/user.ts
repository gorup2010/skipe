import { User } from "@/types/api";
import { api } from "./api-client";

export const searchUser = (
  username: string,
  page: number
): Promise<User[]> => {
  return api.get("users", {
    params: {
      username,
      page,
    },
  });
};
