import { api } from "./axios";

export type User = {
  id: number;
  email: string;
};

export type AuthResponse = {
  accessToken: string;
  user: User;
};

type AuthPayload = {
  email: string;
  password: string;
};

export const authApi = {
  login: async ({ email, password }: AuthPayload): Promise<AuthResponse> => {
    const { data } = await api.post("/login", { email, password });

    return data;
  },

  register: async ({ email, password }: AuthPayload): Promise<AuthResponse> => {
    const { data } = await api.post("/register", { email, password });

    return data;
  },
};
