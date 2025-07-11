import { ratings } from '@/api';
import { useQuery } from '@tanstack/react-query';

const queryKey = ['ratings'];

export const useAllRatings = () =>
  useQuery({
    queryKey: queryKey,
    queryFn: ratings.all,
  });

export const useRating = (id: string) =>
  useQuery({
    queryKey: queryKey.concat(id),
    queryFn: () => ratings.get(id),
  });

export const useSupplierRating = (supplierId: string) =>
  useQuery({
    queryKey: queryKey.concat(['supplier', supplierId]),
    queryFn: () => ratings.forSupplier(supplierId),
  });
