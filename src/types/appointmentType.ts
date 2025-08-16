import { z } from "zod";

const personRefSchema = z.object({
  _id: z.string(),
  firstname: z.string().optional(),
  lastname: z.string().optional(),
  username: z.string().optional(),
});
const idOrPerson = z.union([z.string(), personRefSchema]);

export const appointmentSchema = z.object({
  _id: z.string().optional(),
  userId: idOrPerson,
  barberId: idOrPerson,
  serviceName: z.string().min(1, "Service name is required"),
  dateTime: z.string().datetime({ offset: true }),
  status: z.enum(["booked", "cancelled", "completed"]).default("booked"),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type AppointmentType = z.infer<typeof appointmentSchema>;

export const appointmentPopulatedSchema = appointmentSchema.extend({
  userId: personRefSchema,
  barberId: personRefSchema,
});
export type AppointmentPopulated = z.infer<typeof appointmentPopulatedSchema>;

export const createAppointmentInputSchema = z.object({
  barberId: z.string().min(1, "Barber ID is required"),
  serviceName: z.string().min(1, "Service name is required"),
  dateTime: z.string().datetime({ offset: true }),
});
export type CreateAppointmentInput = z.infer<typeof createAppointmentInputSchema>;
