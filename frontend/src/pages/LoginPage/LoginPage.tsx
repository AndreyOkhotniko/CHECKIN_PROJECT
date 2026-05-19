import { useNavigate } from 'react-router-dom';
import s from './LoginPage.module.css';

function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className={s.page}>
      <div className={s.inner}>
        <h1 className={s.title}>
          Вход или
          <br />
          регистрация
        </h1>

        <label className={s.label}>Имя или ник</label>
        <input className={`${s.input} ${s.active}`} type="text" placeholder="sasha_travels" />

        <label className={s.label}>Email или телефон</label>
        <input className={s.input} type="text" placeholder="mail@example.com" />

        <label className={s.label}>Пароль</label>
        <input className={`${s.input} ${s.inputLast}`} type="password" placeholder="••••••••" />

        <button className={s.btnPrimary} onClick={() => navigate('/places')}>
          Продолжить →
        </button>

        <div className={s.divider}>
          <span>или</span>
        </div>

        <button className={s.btnGhost}>Войти по коду на email</button>
      </div>
    </div>
  );
}

export default LoginPage;
