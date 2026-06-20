import { Link } from 'react-router-dom';
import s from './CollectionPage.module.css';

function CollectionPage() {
  return (
    <div className={s.page}>
      <div className={s.scrollArea}>
        <div className={s.content}>
          <div className={s.titleRow}>
            <span className={s.title}>Коллекция</span>
            <span className={s.countBadge}>2</span>
          </div>

          <div className={s.card}>
            <div className={s.stampThumb}>штамп</div>
            <div className={s.cardBody}>
              <div className={s.cardName}>Кофейня «Утро»</div>
              <div className={s.cardDate}>12 апр 2025</div>
              <span className={s.badge}>Кафе</span>
            </div>
            <span className={s.chev}>›</span>
          </div>

          <div className={s.card}>
            <div className={s.stampThumb}>штамп</div>
            <div className={s.cardBody}>
              <div className={s.cardName}>Книжный «Страница»</div>
              <div className={s.cardDate}>3 мар 2025</div>
              <span className={s.badge}>Книги</span>
            </div>
            <span className={s.chev}>›</span>
          </div>

          <Link to="/" className={s.cardDashed}>
            <div className={s.dashedThumb} />
            <div className={s.dashedBody}>
              <div className={s.dashedTitle}>Найти ещё места</div>
              <div className={s.dashedSub}>Осталось 4 из 6 доступных</div>
            </div>
            <span className={s.chev}>›</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CollectionPage;
