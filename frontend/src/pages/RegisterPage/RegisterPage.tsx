import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { schema, type TypeForm } from './schema';
import s from './RegisterPage.module.css';
import { zodResolver } from '@hookform/resolvers/zod';

function RegisterPage() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm<TypeForm>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  });

  const onSubmit = (data: TypeForm) => {
    console.log(data);
  };

  return (
    <div className={s.page}>
      <form className={s.inner} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={s.title}>Регистрация</h1>

        <label className={s.label}>Имя или ник</label>
        <input
          className={s.input}
          type="text"
          placeholder="sasha_travels"
          {...register('nickname')}
        />
        {formState.errors.nickname && <p>{formState.errors.nickname.message}</p>}

        <label className={s.label}>Email</label>
        <input
          className={s.input}
          type="email"
          placeholder="mail@example.com"
          {...register('email')}
        />
        {formState.errors.email && <p>{formState.errors.email.message}</p>}

        <label className={s.label}>Пароль</label>
        <input
          className={s.input}
          type="password"
          placeholder="••••••••"
          {...register('password')}
        />
        {formState.errors.password && <p>{formState.errors.password.message}</p>}

        <label className={s.label}>Подтвердите пароль</label>
        <input
          className={`${s.input} ${s.inputLast}`}
          type="password"
          placeholder="••••••••"
          {...register('passwordConfirm')}
        />
        {formState.errors.passwordConfirm && <p>{formState.errors.passwordConfirm.message}</p>}

        <button className={s.btnPrimary} type="submit">
          Зарегистрироваться →
        </button>

        <div className={s.divider}>
          <span>или</span>
        </div>

        <button className={s.btnGhost} onClick={() => navigate('/login')} type="button">
          Уже есть аккаунт? Войти
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
