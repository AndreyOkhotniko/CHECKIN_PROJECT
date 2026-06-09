import type { Place } from '@/types/PlaceType';
import type { CategoryType } from '@/types/CategoryType';

export const CATEGORIES_MOCK: CategoryType[] = [
  { id: 1, name: 'Кафе / Ресторан', description: 'Кофейни, рестораны, бары и рестобары' },
  { id: 2, name: 'Магазин', description: 'Розничные магазины, рынки, маркеты' },
  { id: 3, name: 'Спортзал', description: 'Фитнес-клубы, скалодромы, бассейны' },
  { id: 4, name: 'Музей / Галерея', description: 'Музеи, галереи, выставочные пространства' },
  { id: 5, name: 'Парк', description: 'Парки, скверы, природные зоны' },
  { id: 6, name: 'Ивент', description: 'Концерты, клубы, разовые мероприятия' },
];

export const PLACES_MOCK: Place[] = [
  {
    id: 1,
    ownerId: 10,
    name: 'Кофейня «Брю»',
    description:
      'Уютная кофейня в центре города. Авторские напитки, свежая выпечка и тихая атмосфера для работы и встреч.',
    address: 'ул. Пушкина, 12, Москва',
    category_id: 1,
    is_active: true,
  },
  {
    id: 2,
    ownerId: 11,
    name: 'Парк Горького',
    description: 'Главный парк культуры и отдыха. Летом — аттракционы и веранды, зимой — каток.',
    address: 'Крымский Вал, 9, Москва',
    category_id: 5,
    is_active: true,
  },
  {
    id: 3,
    ownerId: 12,
    name: 'Галерея «Треугольник»',
    description: 'Независимая галерея современного искусства. Сменные выставки каждые три недели.',
    address: 'ул. Солянка, 1/2, Москва',
    category_id: 4,
    is_active: true,
  },
  {
    id: 4,
    ownerId: 13,
    name: 'Фитнес-клуб Atomic',
    description:
      'Просторный зал с кардио и силовым оборудованием, бассейн, сауна и групповые тренировки.',
    address: 'Ленинский пр-т, 38, Москва',
    category_id: 3,
    is_active: true,
  },
  {
    id: 5,
    ownerId: 14,
    name: 'Книжный «Берег»',
    description: 'Независимый книжный магазин с авторской подборкой и уголком для чтения.',
    address: 'ул. Маросейка, 7, Москва',
    category_id: 2,
    is_active: true,
  },
  {
    id: 6,
    ownerId: 15,
    name: 'Джазовый клуб Blue Note',
    description:
      'Живая музыка каждую пятницу и субботу. Коктейли, джаз, атмосфера старого Нью-Йорка.',
    address: 'Малая Дмитровка, 23, Москва',
    category_id: 6,
    is_active: true,
  },
  {
    id: 7,
    ownerId: 16,
    name: 'Рестобар «Квартира»',
    description:
      'Домашняя кухня и широкий выбор крафтового пива. Идеально для посиделок с друзьями.',
    address: 'ул. Бауманская, 11, Москва',
    category_id: 1,
    is_active: true,
  },
  {
    id: 8,
    ownerId: 17,
    name: 'Музей занимательных наук',
    description:
      'Интерактивные экспозиции по физике, химии и биологии. Подходит для детей и взрослых.',
    address: 'Проспект Мира, 119, Москва',
    category_id: 4,
    is_active: true,
  },
  {
    id: 9,
    ownerId: 18,
    name: 'Маркет «Местное»',
    description:
      'Фермерский рынок выходного дня. Сыры, мёд, овощи и домашняя выпечка от производителей.',
    address: 'Красная Пресня, 4, Москва',
    category_id: 2,
    is_active: true,
  },
  {
    id: 10,
    ownerId: 19,
    name: 'Скалодром Vertigo',
    description:
      'Боулдеринг и трассы для топ-ропа. Есть прокат снаряжения и инструкторы для новичков.',
    address: 'ул. Нагорная, 17, Москва',
    category_id: 3,
    is_active: true,
  },
];
