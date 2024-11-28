import { z } from "zod";

import { api } from "./api-client";
import { AuthResponse } from "@/types/api";

export const logout = (): Promise<void> => {
  return api.post("/auth/logout");
};

export const loginInputSchema = z.object({
  email: z.string().email("Email không hợp lệ").trim(),
  password: z.string().min(8, "Mật khẩu phải có ít nhất 8 kí tự").trim(),
});

export type LoginInput = z.infer<typeof loginInputSchema>;

export const loginWithEmailAndPassword = (
  data: LoginInput
): Promise<AuthResponse> => {
  return api.post("login", data);
};

export const registerInputSchema = z
  .object({
    email: z.string().email("Email không hợp lệ").trim(),
    password: z.string().min(8, "Mật khẩu phải có ít nhất 8 kí tự").trim(),
    confirmedPassword: z
      .string()
      .min(8, "Mật khẩu nhắc lại phải có 8 ký tự")
      .trim(),
  })
  .refine((data) => data.password === data.confirmedPassword, {
    message: "Mật khẩu nhắc lại không đúng",
    path: ["confirmedPassword"],
  });

export type RegisterInput = z.infer<typeof registerInputSchema>;

export const registerWithEmailAndPassword = (
  data: RegisterInput
): Promise<AuthResponse> => {
  return api.post("/auth/register", data);
};
