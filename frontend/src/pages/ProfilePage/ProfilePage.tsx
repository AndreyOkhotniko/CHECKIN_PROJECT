import { useEffect, useRef, useState } from 'react';
import useAuthStore from '../../store/authStore';
import s from './ProfilePage.module.css';

function ProfilePage() {
  const { user, logout } = useAuthStore();
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copyRef = async () => {
    try {
      await navigator.clipboard.writeText('checkin.app/ref/aleksei24');
      setCopied(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  if (!user) {
    return <h1>401</h1>;
  }

  return (
    <div className={s.page}>
      <div className={s.scrollArea}>
        <div className={s.content}>
          <div className={s.profileTop}>
            <div className={s.avatar}>АЛ</div>
            <div className={s.nickname}>@{user.name}</div>
            <div className={s.stampBadge}>
              <span className={s.badgeDot} />
              <span className={s.badgeText}>12 штампов</span>
            </div>
          </div>

          <div>
            <div className={s.secLabel}>Реферальная ссылка</div>
            <div className={s.refRow}>
              <span className={s.refLink}>checkin.app/ref/aleksei24</span>
              <button className={s.btnCopy} type="button" onClick={copyRef}>
                {copied ? 'Скопировано' : 'Скопировать'}
              </button>
            </div>
          </div>

          <div>
            <div className={s.secLabel}>Мои штампы</div>
            <div className={s.stampsRow}>
              <div className={s.stampCard}>
                <div className={s.stampThumb}>штамп</div>
                <span className={s.stampCardName}>Кофейня</span>
              </div>
              <div className={s.stampCard}>
                <div className={s.stampThumb}>штамп</div>
                <span className={s.stampCardName}>Книги</span>
              </div>
              <div className={s.stampCard}>
                <div className={s.stampThumb}>штамп</div>
                <span className={s.stampCardName}>Галерея</span>
              </div>
            </div>
          </div>

          <button className={s.btnLogout} type="button" onClick={logout}>
            Выйти
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
