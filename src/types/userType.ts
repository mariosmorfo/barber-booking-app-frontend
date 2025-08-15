import { z } from 'zod';

export const userSchema = z
  .object({
    _id: z.string().optional(),
    firstname: z.string().min(1, 'First name is required'),
    lastname: z.string().min(1, 'Last name is required'),
    username: z.string().min(1, 'Username is required'),
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
    phone: z.string().min(1, 'Phone is required'),
    age: z.string().min(1, 'Age is required'),
    role: z.enum(['ADMIN', 'BARBER', 'CUSTOMER']).default('CUSTOMER'),
    address: z
      .object({
        city: z.string().optional(),
        street: z.string().optional(),
      })
      .optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
  })
  .refine(d => d.password === d.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type UserType = z.infer<typeof userSchema>;
