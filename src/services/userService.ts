import { api } from "./api";                   
import { getToken } from "../utils/authTokenUtil";
import type { UserType } from "../types/userType";

const BASE = "/api/user";


const authHeaders = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

type ApiRes<T> = { status: boolean; data: T };

export type UserCreate = Omit<UserType, "_id" | "createdAt" | "updatedAt">;


export type UserUpdate = Partial<Omit<UserType, "_id" | "createdAt" | "updatedAt" | "username">>;


export async function registerUser(newUser: UserCreate): Promise<UserType> {
  const { data } = await api.post<ApiRes<UserType>>(`${BASE}/create`, newUser);
  if (!data.status) throw new Error("Failed to create user");
  return data.data;
}


export async function getAllUsers(): Promise<UserType[]> {
  const { data } = await api.get<ApiRes<UserType[]>>(`${BASE}`, {
    headers: authHeaders(),
  });
  if (!data.status) throw new Error("Failed to fetch users");
  return data.data;
}


export async function getUserByUsername(username: string): Promise<UserType> {
  const { data } = await api.get<ApiRes<UserType>>(`${BASE}/${username}`, {
    headers: authHeaders(),
  });
  if (!data.status) throw new Error("Failed to fetch user");
  return data.data;
}


export async function updateUser(username: string, updated: UserUpdate): Promise<UserType> {
  const { data } = await api.patch<ApiRes<UserType>>(
    `${BASE}/update/${username}`,
    updated,
    { headers: authHeaders() }
  );
  if (!data.status) throw new Error("Failed to update user");
  return data.data;
}


export async function deleteUserByUsername(username: string): Promise<UserType | null> {
  const { data } = await api.delete<ApiRes<UserType | null>>(
    `${BASE}/delete/${username}`,
    { headers: authHeaders() }
  );
  if (!data.status) throw new Error("Failed to delete user");
  return data.data; 
}
