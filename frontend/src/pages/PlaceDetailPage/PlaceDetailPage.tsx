import { Link, useParams } from 'react-router-dom';
import s from './PlaceDetailPage.module.css';
import { usePlaceById } from '@/hooks/usePlaces';
import { CATEGORIES_MOCK } from '@/mocks/places.mock';

const categoryMap = new Map(CATEGORIES_MOCK.map((c) => [c.id, c.name]));

function PlaceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const hasStamp = false;

  const { isLoading, isError, error, data } = usePlaceById(id ? Number(id) : undefined);

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  if (isError) {
    return <h1>Ошибка: {error.message}</h1>;
  }

  if (!data) {
    return <h1>Not found</h1>;
  }

  const { name, description, address, category_id } = data;

  return (
    <div className={s.page}>
      <Link to="/" className={s.backLink}>
        ← К списку
      </Link>

      <div className={s.scrollArea}>
        <div className={s.content}>
          <div className={s.detailImg}>[ штамп ]</div>

          <div className={s.placeName}>{name}</div>
          <div className={s.placeMeta}>
            {categoryMap.get(category_id)}
            <br />
            {address}
          </div>
          <div className={s.placeDescription}>{description}</div>

          {hasStamp ? (
            <>
              <button className={s.btnPrimaryDisabled} type="button">
                Отсканировать QR
              </button>
              <div className={s.stampStatus}>✓ Штамп уже получен — 12 апр 2025</div>
            </>
          ) : (
            <button className={s.btnPrimary} type="button">
              Отсканировать QR
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default PlaceDetailPage;
