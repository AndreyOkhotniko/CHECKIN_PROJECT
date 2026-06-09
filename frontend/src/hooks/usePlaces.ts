import { getPlaceById, getPlaces } from '@/api/places';
import { useQuery } from '@tanstack/react-query';

export const usePlaces = () =>
  useQuery({
    queryKey: ['places'],
    queryFn: getPlaces,
  });

export const usePlaceById = (id: number | undefined) =>
  useQuery({
    queryKey: ['place', id],
    queryFn: () => getPlaceById(id),
    enabled: id !== undefined && !isNaN(id),
  });
