import { z } from 'zod';
import { GenderType } from '../../DB/model/user.model';

export const signupSchema = {
  body: z
    .object({
      fullName: z.string().min(2, 'Name must be at least 2 characters'),
      email: z.string().email('Invalid email address'),
      password: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .regex(
          /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
          'Password must contain upper, lower, number and special char'
        ),
      cPassword: z.string(),
      phone: z
        .string()
        .min(7, 'Phone looks too short')
        .max(20, 'Phone looks too long')
        .optional()
        .or(z.literal('')),
      address: z
        .string()
        .max(255, 'Address too long')
        .optional()
        .or(z.literal('')),
      gender: z.enum(Object.values(GenderType)).optional(),
      age: z.preprocess((val) => {
        if (typeof val === 'string' && val.trim() === '') return undefined;
        return typeof val === 'string' ? Number(val) : val;
      }, z.number().int().min(18, 'Age must be 18 or older').max(60).optional()),
    })
    .refine((data) => data.password === data.cPassword, {
      message: 'Passwords do not match',
      path: ['cPassword'],
    }),
};

export type signupSchemaType = z.infer<typeof signupSchema.body>;
