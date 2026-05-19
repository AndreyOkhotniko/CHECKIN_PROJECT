import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { schema, type TypeForm } from './schema';

import s from './LoginPage.module.css';
function LoginPage() {
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
        <h1 className={s.title}>
          Вход или
          <br />
          <Link to={'/register'}>регистрация</Link>
        </h1>

        <label className={s.label}>Никнейм</label>
        <input
          className={`${s.input} ${s.active}`}
          type="text"
          placeholder="sasha_travels"
          {...register('nickname')}
        />
        {formState.errors.nickname && <p>{formState.errors.nickname.message}</p>}

        <label className={s.label}>Пароль</label>
        <input
          className={`${s.input} ${s.inputLast}`}
          type="password"
          placeholder="••••••••"
          {...register('password')}
        />
        {formState.errors.password && <p>{formState.errors.password.message}</p>}

        <button className={s.btnPrimary} type="submit">
          Продолжить →
        </button>

        <div className={s.divider}>
          <span>или</span>
        </div>

        <button className={s.btnGhost} type="button">
          Войти по коду на email
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
