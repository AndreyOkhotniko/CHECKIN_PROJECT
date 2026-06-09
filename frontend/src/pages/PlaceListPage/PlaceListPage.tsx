import { useState } from 'react';
import s from './PlaceListPage.module.css';
import { usePlaces } from '@/hooks/usePlaces';
import { Link } from 'react-router-dom';
import { CATEGORIES_MOCK } from '@/mocks/places.mock';

const categoryMap = new Map(CATEGORIES_MOCK.map((c) => [c.id, c.name]));

function PlaceListPage() {
  const [categories, setCategories] = useState<number[]>([]);
  const [search, setSearch] = useState('');

  const { data } = usePlaces();

  if (data === undefined) {
    return <h1>Мест не найдено</h1>;
  }

  const filtredPlaces =
    categories.length === 0 ? data : data.filter((place) => categories.includes(place.category_id));

  const searchedPlaces = filtredPlaces.filter((place) =>
    place.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className={s.page}>
      <header className={s.header}>
        <span className={s.logo}>Чекин</span>
      </header>

      <div className={s.scrollArea}>
        <div className={s.content}>
          <input
            className={s.search}
            type="text"
            placeholder="Найти место..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />

          <div className={s.pills}>
            {CATEGORIES_MOCK.map((cat) => (
              <button
                key={cat.id}
                className={`${s.pill} ${categories.includes(cat.id) ? s.pillActive : ''}`}
                type="button"
                onClick={() => {
                  setCategories(
                    categories.includes(cat.id)
                      ? categories.filter((id) => id !== cat.id)
                      : [...categories, cat.id],
                  );
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {searchedPlaces.length === 0 ? (
            <h2>Мест не найдено</h2>
          ) : (
            searchedPlaces.map((place) => (
              <div className={s.card} key={place.id}>
                <div className={s.cardImg}>[ Preview ]</div>
                <div className={s.cardBody}>
                  <Link to={`/places/${place.id}`} className={s.cardName}>
                    {place.name}
                  </Link>
                  <div className={s.cardMeta}>
                    {categoryMap.get(place.category_id)} · {place.description}
                  </div>
                  <button className={s.btnSm}>Подробнее →</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <nav className={s.bottomNav}>
        <div className={`${s.bnItem} ${s.bnItemActive}`}>
          <span className={s.bnIconSq} />
          Места
        </div>
        <div className={s.bnItem}>
          <span className={s.bnIconStar} />
          Коллекция
        </div>
        <div className={s.bnItem}>
          <span className={s.bnIconDot} />
          Профиль
        </div>
      </nav>
    </div>
  );
}

export default PlaceListPage;
