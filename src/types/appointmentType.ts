import { z } from 'zod'

export const appointmentSchema = z.object({
  _id: z.string().optional(),                     
  userId: z.string().nonempty('User ID is required'),
  barberId: z.string().nonempty('Barber ID is required'),
  serviceName: z.string().min(1, 'Service name is required'),
  dateTime: z.string().refine((dt) => !isNaN(Date.parse(dt)), {
    message: 'Must be a valid ISO date string',
  }),
  status: z.enum(['booked', 'cancelled', 'completed']).default('booked'),
  createdAt: z.string().optional(),               
  updatedAt: z.string().optional(),             
})

export type AppointmentType = z.infer<typeof appointmentSchema>
