import { api } from "../services/api";

const BASE = "/api/barber"

export type ServiceItem = { name: string; duration: number; price: number };

export type BarberCreate = {
  firstname: string;
  lastname: string;
  username: string;
  phone: string;
  age?: string;
  email: string;
  password: string;
  servicesOffered: ServiceItem[];
};

export type BarberUpdate = Partial<Omit<BarberCreate, "username" | "password">> & {
  password?: string; 
};

type ApiRes<T> = { status: boolean; data: T };

export async function getAllBarbers() {
  const { data } = await api.get<ApiRes<any[]>>(`${BASE}`);
  if (!data.status) throw new Error("Failed to fetch barbers");
  return data.data;
}

export async function createBarber(input: BarberCreate) {
  const { data } = await api.post<ApiRes<any>>(`${BASE}/create`, input); 
  if (!data.status) throw new Error("Failed to create barber");
  return data.data;
}

export async function updateBarber(username: string, patch: BarberUpdate) {
  const { data } = await api.patch<ApiRes<any>>(`${BASE}/update/${username}`, patch); 
  if (!data.status) throw new Error("Failed to update barber");
  return data.data;
}

export async function deleteBarberByUsername(username: string) {
  const { data } = await api.delete<ApiRes<any>>(`${BASE}/delete/${username}`); 
  if (!data.status) throw new Error("Failed to delete barber");
  return data.data;
}
