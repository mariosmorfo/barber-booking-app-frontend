import {z} from 'zod';

export const loginSchema = z.object({
  username: z.string().nonempty("Username is required").min(5),
  password: z.string().nonempty("Password is required").min(5)
})

export type LoginCredentials = z.infer< typeof loginSchema>