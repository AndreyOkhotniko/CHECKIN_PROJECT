import { useNavigate } from 'react-router-dom';
import s from './RolePage.module.css';

function RolePage() {
  const navigate = useNavigate();

  const handleSelect = (role: string) => {
    navigate('/login', { state: { role: role } });
  };

  return (
    <div className={s.page}>
      <div className={s.inner}>
        <h1 className={s.title}>Кто вы?</h1>
        <div className={s.cards}>
          <div className={s.card} onClick={() => handleSelect('subj')}>
            <div className={s.cardTitle}>Я гость</div>
            <div className={s.cardDesc}>Сканирую QR, собираю штампы</div>
          </div>
          <div className={s.card} onClick={() => handleSelect('obj')}>
            <div className={s.cardTitle}>Я владелец</div>
            <div className={s.cardDesc}>Создаю место, выдаю штампы</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RolePage;
