import { z } from 'zod'

export const serviceOfferedSchema = z.object({
  name: z.string().min(1, 'Service name is required'),
  duration: z.number().min(1, 'Duration must be at least 1'),
  price: z.number().min(0, 'Price must be non-negative'),
})

export const barberSchema = z
  .object({
    _id: z.string().optional(),
    firstname: z.string().min(1, 'Firstname is required'),
    lastname: z.string().min(1, 'Lastname is required'),
    username: z.string().min(1, 'Username is required'),
    phone: z.string().min(1, 'Phone is required'),
    age: z.string().optional(),
    email: z.string().email('Email is invalid'),
    password: z.string().min(1, 'Password is required'),
    confirmPassword: z.string(),
    role: z.enum(['ADMIN', 'BARBER', 'CUSTOMER']).default('BARBER'),
    servicesOffered: z.array(serviceOfferedSchema),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
  }).refine(d => d.password === d.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type BarberType = z.infer<typeof barberSchema>
