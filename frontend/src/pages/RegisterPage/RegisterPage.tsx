import { useNavigate } from 'react-router-dom';
import s from './RegisterPage.module.css';

function RegisterPage() {
  const navigate = useNavigate();

  return (
    <div className={s.page}>
      <div className={s.inner}>
        <h1 className={s.title}>
          Регистрация
        </h1>

        <label className={s.label}>Имя или ник</label>
        <input className={s.input} type="text" placeholder="sasha_travels" />

        <label className={s.label}>Email</label>
        <input className={s.input} type="email" placeholder="mail@example.com" />

        <label className={s.label}>Пароль</label>
        <input className={s.input} type="password" placeholder="••••••••" />

        <label className={s.label}>Подтвердите пароль</label>
        <input className={`${s.input} ${s.inputLast}`} type="password" placeholder="••••••••" />

        <button className={s.btnPrimary} onClick={() => navigate('/places')}>
          Зарегистрироваться →
        </button>

        <div className={s.divider}><span>или</span></div>

        <button className={s.btnGhost} onClick={() => navigate('/login')}>
          Уже есть аккаунт? Войти
        </button>
      </div>
    </div>
  );
}

export default RegisterPage;