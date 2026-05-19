import { z } from 'zod';

export const schema = z.object({
  nickname: z.string().min(1, 'Поле обязательно для заполнения!'),
  password: z.string().min(4, 'Пароль должен содержать 4 или более символов'),
});

export type TypeForm = z.infer<typeof schema>;
