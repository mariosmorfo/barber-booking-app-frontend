import { api } from "./api";                   
import { getToken } from "../utils/authTokenUtil";
import type { UserType } from "../types/userType";

const BASE = "/api/user";

type ApiRes<T> = { status: boolean; data: T };

export type UserCreate = Omit<UserType, "_id" | "createdAt" | "updatedAt">;

export type UserUpdate = Partial<Omit<UserType, "_id" | "createdAt" | "updatedAt" | "username">>;

export async function registerUser(newUser: UserCreate) {
  const { data } = await api.post<ApiRes<UserType>>(`${BASE}/create`, newUser);
  if (!data.status) throw new Error("Failed to create user");
  return data.data;
}

export async function getAllUsers() {
  const { data } = await api.get<ApiRes<UserType[]>>(`${BASE}`);
  if (!data.status) throw new Error("Failed to fetch users");
  return data.data;
}

export async function getUserByUsername(username: string) {
  const { data } = await api.get<ApiRes<UserType>>(`${BASE}/${username}`);
  if (!data.status) throw new Error("Failed to fetch user");
  return data.data;
}

export async function updateUser(username: string, updated: UserUpdate){
  const { data } = await api.patch<ApiRes<UserType>>(
    `${BASE}/update/${username}`,
    updated,
  );
  if (!data.status) throw new Error("Failed to update user");
  return data.data;
}

export async function deleteUserByUsername(username: string) {
  const { data } = await api.delete<ApiRes<UserType | null>>(
    `${BASE}/delete/${username}`,
  );
  if (!data.status) throw new Error("Failed to delete user");
  return data.data; 
}
