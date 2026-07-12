import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useAuth } from "@/app/context/AuthContext";

import { authApi } from "../api/auth";

export const useRegister = () => {
  // const { logIn } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authApi.register,
    onSuccess: () => {
      // logIn(data.accessToken);
      navigate("/auth/login");
    },
  });
};

export const useLogin = () => {
  const { logIn } = useAuth();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      logIn(data.accessToken);
    },
  });
};
