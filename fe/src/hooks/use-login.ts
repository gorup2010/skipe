import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { LoginInput, loginWithEmailAndPassword } from '@/lib/auth';

export const useLogin = () => {
  const navigate = useNavigate();
  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: async (userData: LoginInput) => {
      const response = await loginWithEmailAndPassword(userData);
      return response;
    },
    onError: (error) => {
      console.log("Error in useLogin " + error);
    },
    onSuccess: (response) => {
      localStorage.setItem("user", JSON.stringify(response));
      return navigate('/');
    },
  });
  return {
    login: mutate,
    isSuccess,
    isPending,
    isError,
    errorMessage: error?.message,
    error,
  };
};