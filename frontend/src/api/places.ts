//import api from '@/lib/apiClient';
import { PLACES_MOCK } from '@/mocks/places.mock';

export const getPlaces = async () => {
  //const response = await api.get('/places');
  const response = await Promise.resolve({
    data: PLACES_MOCK,
  });

  return response.data;
};

export const getPlaceById = async (id: number | undefined) => {
  const response = await Promise.resolve({
    data: PLACES_MOCK.find((place) => place.id === id),
  });

  return response.data;
};
