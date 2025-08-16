import { api } from "./api";
import type { AppointmentType } from "../types/appointmentType";

const BASE = "/api/appointment";

type ApiRes<T> = { status: boolean; data: T; };


export type CreateAppointmentInput = {
  barberId: string;   
  serviceName: string;
  dateTime: string;  
};


export async function findAllAppointmentsAdmin() {
  const { data } = await api.get<ApiRes<AppointmentType[]>>(`${BASE}/`);
  if (!data.status) throw new Error("Failed to fetch appointments");
  return data.data;
}

export async function createAppointment(token: string, payload: CreateAppointmentInput){
  const { data } = await api.post<ApiRes<AppointmentType>>(`${BASE}/create`, payload);
  if (!data.status) throw new Error("Failed to create appointment");
  return data.data;
}

export async function getMyAppointments(token: string, userId: string){
  const { data } = await api.get<ApiRes<AppointmentType[]>>(`${BASE}/user/${userId}`);
  if (!data.status) throw new Error("Failed to fetch appointments");
  return data.data;
}


export async function getAppointmentsByBarber(barberId: string){
  const { data } = await api.get<ApiRes<AppointmentType[]>>(`${BASE}/barber/${barberId}`);
  if (!data.status) throw new Error("Failed to fetch appointments by barber");
  return data.data;
}

export async function cancelAppointment(token: string, id: string) {
  const { data } = await api.delete<{ message: string }>(
    `${BASE}/cancel/${id}`);
  return data.message;
}

export type AppointmentStatus = "booked" | "cancelled" | "completed";


export async function updateAppointmentStatus(id: string ,status: AppointmentStatus) {
  const { data } = await api.patch<ApiRes<AppointmentType>>(
    `${BASE}/status/${id}`,{ status });
  if (!data.status) throw new Error("Failed to update status");
  return data.data;
}

