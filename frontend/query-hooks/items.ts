import { items } from '@/api';
import { useQuery } from '@tanstack/react-query';

const queryKey = ['items'];

export const useAllItems = () =>
  useQuery({
    queryKey: queryKey,
    queryFn: items.all,
  });

export const useItem = (id: string) =>
  useQuery({
    queryKey: queryKey.concat(id),
    queryFn: () => items.get(id),
  });
