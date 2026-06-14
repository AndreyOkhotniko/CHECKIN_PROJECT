# Чекин — Дизайн-система

> Цифровая книга штампов. Визуальный язык приложения вдохновлён японскими паспортами путешественника, советскими штампами и принципами wabi-sabi.

---

## Цвета

### Основная палитра

| Токен | Hex | Применение |
|-------|-----|-----------|
| `A` — Акцент | `#C4513A` | CTA-кнопки, активные состояния, штамп по умолчанию |
| `BG` — Фон | `#F7F4EF` | Фон экранов, тёплый белый |
| `DK` — Тёмный | `#1A1714` | Основной текст, иконки, аватар |
| `MU` — Приглушённый | `#8A7B70` | Вторичный текст, неактивные элементы |
| `ML` — Мягкий | `#C5B8AF` | Плейсхолдеры, метаданные, третичный текст |
| `BD` — Граница | `#E8E2DB` | Разделители, бордюры полей |
| `WH` — Белый | `#FFFFFF` | Карточки, модалки, футеры |

### Цвета штампов (палитра мест)

```
Кофейня (Кафе)   #C4513A  — терракот
Книжный (Книги)  #2B4570  — индиго
Музей (Культура) #3A6B4A  — лесной
Горизонт (Бар)   #7B2D42  — бургунди
Сад Камней (Парк)#445566  — сланец
Галерея          #5B3D7A  — слива
```

### Тёмный режим (QR-сканер)
```
Фон тёмный   #0E0B09
Фон страницы #13100E
```

---

## Типографика

**Шрифт:** Inter (Google Fonts)  
**Стек:** `'Inter', -apple-system, sans-serif`

| Роль | Размер | Вес | Применение |
|------|--------|-----|-----------|
| Hero | 30px | 800 | Логотип ЧЕКИН на онбординге |
| H1 | 28px | 700 | Заголовки разделов (Места, Коллекция) |
| H2 | 26px | 700 | Название места на детальном экране |
| H3 | 24px | 700 | Имя пользователя, заголовок штампа |
| H4 | 20px | 700 | Профиль, аналитика |
| Body-L | 18px | 700 | Заголовки форм (Новое место) |
| Body | 15px | 600 | Название карточки, основные действия |
| Body-S | 14px | 500 | Текст кнопок, описания |
| Caption | 13px | 400 | Адрес, дата, метаданные |
| Micro | 12px | 500 | Бейдж, иконки навигации |
| Label | 11px | 600 | SEC-LABEL — рубрики (uppercase, +0.05em) |
| Mini | 10px | 500 | Метки осей графика |

### SEC-LABEL — подписи разделов
```css
font: 600 11px/1 'Inter', sans-serif;
letter-spacing: 0.05em;
text-transform: uppercase;
color: #8A7B70;
margin-bottom: 10px;
```

---

## Отступы и геометрия

| Токен | Значение | Применение |
|-------|----------|-----------|
| `SB` | 62px | Status bar clearance (iOS padding-top) |
| `--r-card` | 16px | Карточки |
| `--r-input` | 12px | Поля ввода |
| `--r-btn` | 14px | Кнопки |
| `--r-chip` | 20px | Чипсы-фильтры |
| `--r-avatar` | 50% | Аватар пользователя |
| `--gap-card` | 10px | Вертикальный зазор между карточками |
| `--pad-screen` | 20px | Горизонтальный отступ экрана |
| `--pad-footer` | 12px 20px 32px | Отступ футера с кнопкой |

### Тени
```css
/* Карточка */
box-shadow: 0 1px 4px rgba(0,0,0,0.06);

/* Аватар / Модальное */
box-shadow: 0 1px 4px rgba(0,0,0,0.07);

/* QR-код */
box-shadow: 0 4px 24px rgba(0,0,0,0.10);
```

---

## Анимации

```css
/* Появление снизу — используется для каждого нового экрана */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}
.sc { animation: fadeUp 0.22s ease-out both; }

/* Сканирующая линия QR */
@keyframes scanLine {
  0%   { transform: translateY(-46px); opacity: 0; }
  10%  { opacity: 1; }
  90%  { opacity: 1; }
  100% { transform: translateY(46px); opacity: 0; }
}
.scan-line { animation: scanLine 2.2s ease-in-out infinite; }

/* Появление штампа — пружинистый */
@keyframes stampReveal {
  0%   { opacity: 0; transform: scale(0.6) rotate(-8deg); }
  65%  { transform: scale(1.07) rotate(2deg); }
  100% { opacity: 1; transform: scale(1) rotate(0deg); }
}
.stamp-anim { animation: stampReveal 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
```

---

## Компоненты

### Кнопка Primary `.btn-p`
```css
width: 100%;
padding: 15px;
background: #C4513A;
color: #fff;
border: none;
border-radius: 14px;
font: 600 16px/1 'Inter', sans-serif;
display: flex; align-items: center; justify-content: center; gap: 8px;
transition: opacity 0.15s;
/* :active → opacity: 0.85 */
```

### Кнопка Secondary `.btn-s`
```css
width: 100%;
padding: 15px;
background: transparent;
border: 1.5px solid #E8E2DB;
border-radius: 14px;
color: #1A1714;
font: 500 16px/1 'Inter', sans-serif;
```

### Поле ввода `.inp`
```css
width: 100%;
padding: 13px 16px;
background: #fff;
border: 1.5px solid #E8E2DB;
border-radius: 12px;
font: 500 15px/1 'Inter', sans-serif;
color: #1A1714;
transition: border-color 0.15s;
/* :focus → border-color: #C4513A */
/* ::placeholder → color: #C5B8AF */
```

### Фильтр-чипс `.chip`
```css
padding: 7px 15px;
border-radius: 20px;
font: 500 13px 'Inter', sans-serif;
border: none; cursor: pointer;
transition: all 0.15s;

/* Активный .on */
background: #1A1714; color: #F7F4EF;

/* Неактивный .off */
background: #EDE9E3; color: #8A7B70;
```

### Карточка места `.card`
```css
display: flex; align-items: center; gap: 14px;
padding: 14px 16px;
background: #fff;
border-radius: 16px;
box-shadow: 0 1px 4px rgba(0,0,0,0.06);
cursor: pointer;
transition: transform 0.1s;
/* :active → transform: scale(0.98) */
```
Структура: `[Stamp 58px] [Название / Адрес / Бейдж] [Шеврон / Число]`

### Бейдж `.bdg`
```css
display: inline-flex; align-items: center;
padding: 3px 10px;
border-radius: 20px;
background: #EDE9E3;
color: #8A7B70;
font: 500 12px 'Inter', sans-serif;
```

### Нижняя навигация `.bnav`
```css
display: flex;
border-top: 1px solid #E8E2DB;
background: rgba(247,244,239,0.96);
backdrop-filter: blur(10px);
padding: 8px 0 26px; /* 26px — home indicator clearance */
```

Вкладка `.ntab`:
```css
flex: 1; display: flex; flex-direction: column;
align-items: center; gap: 4px;
padding: 8px 0; cursor: pointer; border: none; background: none;
```
Иконка 22×22. Лейбл `.nlbl`: `font: 500 10px/1 'Inter', sans-serif;`

**Гость:** Места (IcPin) · Коллекция (IcGrid) · Профиль (IcPers)  
**Владелец:** Места (IcGrid) · Аналитика (IcChart) · Профиль (IcPers)

---

## Штампы — 6 форм × 6 цветов

Каждый штамп — SVG 120×120 viewBox, масштабируется через `width`/`height`.  
Все линии, контуры, тексты — цвет места `p.color`.

| Форма | `shape` | Описание |
|-------|---------|----------|
| Круг | `circle` | Двойная окружность, пунктир, перекрестие, год |
| Октагон | `octagon` | 8-угольник (2 контура), горизонтальные линии |
| Квадрат | `square` | Двойной прямоугольник, диагональные уголки, сетка |
| Кольцо | `ring` | 3 окружности, пунктир, крест диагональный |
| Гексагон | `hex` | 6-угольник, прерывистая окружность-энсо |
| Бриллиант | `diamond` | 2 ромба, 9-точечная сетка |

Используемые размеры: 32px (сетка выбора), 44px (фантомы), 50px (профиль), 58px (список), 70px (коллекция), 78px (онбординг), 124px (превью), 158px (детали), 180px (подтверждение), 190px (карточка)

---

## Иконки

Все иконки — SVG stroke, `strokeLinecap="round"`, `strokeWidth` 1.75–2.

| Имя | Описание | Дефолт |
|-----|----------|--------|
| `IcBack` | Шеврон влево | 24px, DK |
| `IcChev` | Шеврон вправо | 18px, ML |
| `IcSearch` | Лупа | 18px, ML |
| `IcShare` | Поделиться (стрелка вверх) | 18px, WH |
| `IcCopy` | Копировать | 15px, A |
| `IcPin` | Пин локации | 22px, MU |
| `IcGrid` | Сетка 2×2 | 22px, MU |
| `IcPers` | Силуэт пользователя | 22px, MU |
| `IcChart` | Бар-чарт | 22px, MU |

---

## QR-код

Компонент `QRMock({size, color})` — SVG-рендер матрицы 21×21 (стандарт QR v1).  
Цвет модулей = `p.color` места. Размеры: 54px (дашборд мини), 172px (полноэкранный).

---

## Экраны

### Субъект (Гость) — 9 экранов

| # | Экран | Описание |
|---|-------|----------|
| 01 | Онбординг | Роль: гость / владелец |
| 02 | Вход / Регистрация | Переключаемые формы |
| 03 | Места | Список с фильтром по категории |
| 04 | Детали места | Штамп крупно + описание + CTA |
| 05 | QR Сканер | Тёмный UI, анимация scan-line |
| 06 | Подтверждение штампа | Анимация stampReveal |
| 07 | Коллекция | Собранные штампы + подсказка |
| 08 | Карточка штампа | Крупный штамп + поделиться |
| 09 | Профиль | Ник, счётчик, реферальная ссылка |

### Объект (Владелец) — 5 экранов

| # | Экран | Описание |
|---|-------|----------|
| 10 | Дашборд | Список мест + мини QR-коды |
| 11 | Добавить место | Форма (название / категория / адрес / описание) |
| 12 | Дизайн штампа | Выбор формы + цвет + живой превью |
| 13 | QR-код | Генерированный QR + скачать PDF |
| 14 | Аналитика | Статистика, бар-чарт 7 дней, лента активности |

---

## Потоки навигации

```
Онбординг
  ├─ Я гость ──→ Вход/Регистрация ──→ Места ──→ Детали места ──→ QR Сканер ──→ Подтверждение ──→ Коллекция
  │                                      └─ Коллекция ─┐         └─ Карточка штампа
  │                                      └─ Профиль ───┘
  └─ Я владелец ──→ Дашборд ──→ Аналитика
                       └─ Добавить место ──→ Дизайн штампа ──→ QR-код
                       └─ [клик на QR] ──→ QR-код места
```

---

## Технический стек

- **Framework:** React 18.3.1 (UMD) + Babel Standalone 7.29.0 (JSX)
- **Шрифт:** Inter via Google Fonts
- **Фрейм:** `ios-frame.jsx` (IOSDevice — iPhone 16 Pro Max bezel)
- **Без сборщика:** чистый HTML + `<script type="text/babel">`

---

*Версия 1.0 · Июнь 2026*
