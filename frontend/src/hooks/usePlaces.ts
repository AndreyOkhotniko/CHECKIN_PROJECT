import { getPlaces } from '@/api/places';
import { useQuery } from '@tanstack/react-query';

function UsePlaces() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['places'],
    queryFn: () => {
      getPlaces(10);
    },
  });
}

export default UsePlaces;
