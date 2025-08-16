import { api } from "./api";
import type { LoginCredentials } from "../types/loginType";

const BASE = "/api/auth";

type ApiRes =
  | { status: true; data: string | { token: string } }
  | { status: false; data: string };

export const loginUser = async (credentials: LoginCredentials) => {
  const { data } = await api.post<ApiRes>(`${BASE}/login`, credentials); 

  if (!data.status) {
    throw new Error(typeof data.data === "string" ? data.data : "Login failed");
  }
  const token = typeof data.data === "string" ? data.data : data.data.token;
  if (!token) throw new Error("Invalid login response");
  return token;
};

export const loginBarber = async (credentials: LoginCredentials) => {
  const { data } = await api.post<ApiRes>(`${BASE}/barber-login`, credentials); 

  if (!data.status) {
    throw new Error(typeof data.data === "string" ? data.data : "Login failed");
  }
  const token = typeof data.data === "string" ? data.data : data.data.token;
  if (!token) throw new Error("Invalid login response");
  return token;
};



