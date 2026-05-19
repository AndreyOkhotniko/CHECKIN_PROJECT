import { z } from 'zod';

export const schema = z
  .object({
    nickname: z.string().min(1, 'Поле обязательно для заполнения!'),
    email: z.email(),
    password: z
      .string()
      .min(4, 'Пароль должен содержать 4 или более символов')
      .refine(
        checkDifficultPassword,
        'Слишком простой пароль! Пароль должен содержать буквы в нижнем регистре, буквы в верхнем регистре и цифры.',
      ),
    passwordConfirm: z.string().min(4, 'Пароль должен содержать 4 или более символов'),
  })
  .refine(comparisonPassword, { message: 'Пароли должны совпадать.', path: ['passwordConfirm'] });

function comparisonPassword(data: { password: string; passwordConfirm: string }) {
  return data.password === data.passwordConfirm;
}

function checkDifficultPassword(password: string) {
  return /[a-z]/.test(password) && /[A-Z]/.test(password) && /[0-9]/.test(password);
}

export type TypeForm = z.infer<typeof schema>;
