import { z } from "zod";

import { api } from "./api-client";
import { AuthResponse } from "@/types/api";
import EventEmitter from "events";

export const logout = (): void => {
  
};

export const loginInputSchema = z.object({
  username: z.string().min(6, 'Tên tài khoản phải có ít nhất 6 ký tự').regex(/^[A-Za-z][A-Za-z0-9_]{7,29}$/, 'Tên tài khoản chỉ được chứa chữ cái, số và dấu "_".').trim(),
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
    username: z.string().min(6, 'Tên tài khoản phải có ít nhất 6 ký tự').regex(/^[A-Za-z][A-Za-z0-9_]{7,29}$/, 'Tên tài khoản chỉ được chứa chữ cái, số và dấu "_".').trim(),
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
  return api.post("register", data);
};



export const getAuth = (): AuthResponse | null => {
  const storedData = localStorage.getItem('user');

  if (!storedData) {
    return null;
  }

  try {
    const response: AuthResponse = JSON.parse(storedData);
    return response;
  } catch (error) {
    console.error('Error parsing localStorage data:', error);
    return null;
  }
};

const logoutEmitter = new EventEmitter();

export const emitLogoutEvent = () => {
  logoutEmitter.emit('logout')
}

export const addLogoutListener = (callback: () => void) => {
  logoutEmitter.addListener('logout', callback)
}

export const removeLogoutListener = (callback: () => void) => {
  logoutEmitter.removeListener('logout', callback)
}