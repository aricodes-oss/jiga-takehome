import { suppliers } from '@/api';
import { useQuery } from '@tanstack/react-query';

const queryKey = ['suppliers'];

export const useAllSuppliers = () =>
  useQuery({
    queryKey: queryKey,
    queryFn: suppliers.all,
  });

export const useSupplier = (id: string) =>
  useQuery({
    queryKey: queryKey.concat(id),
    queryFn: () => suppliers.get(id),
  });
