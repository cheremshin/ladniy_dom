import { z } from 'zod';

export const schema = z.object({
    email: z.email({ message: 'Неверный Email' }),
    password: z.string().min(8, { message: 'Пароль должен быть не менее 8 символов' }),
});

export type SignInValues = z.infer<typeof schema>;
