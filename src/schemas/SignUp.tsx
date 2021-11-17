import * as z from 'zod';

export const userTypeSchema = z.object({
  userType: z.string().min(1, { message: 'you need to select a user type' }),
});

export const passwordSchema = z.object({
  password: z
    .string()

    .regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,}$/, {
      message:
        'Password must have one capital letter, one number, one special character (+!%&) and at least 8 characters long ',
    }),
});

export const emailSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'email is required' })
    .email({ message: 'email not valid' }),
});
