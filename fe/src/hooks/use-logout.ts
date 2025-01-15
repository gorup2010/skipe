import { logout } from "@/lib/auth";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
    const navigate = useNavigate();
    const { mutate, isPending, isSuccess, isError, error } = useMutation({
      mutationFn: async () => {
        const response = await logout();
        return response;
      },
      onError: (error) => {
        console.log("Error in useLogout " + error);
      },
      onSuccess: () => {
        localStorage.removeItem("user");
        return navigate('/login');
      },
    });
    return {
      logout: mutate,
      isSuccess,
      isPending,
      isError,
      errorMessage: error?.message,
      error,
    };
}