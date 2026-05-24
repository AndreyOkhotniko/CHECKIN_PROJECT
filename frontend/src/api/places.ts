import api from '@/lib/apiClient';

export const getPlaces = async (count: number) => {
  const response = await api.post('/places', { count });
  return response.data;
};
