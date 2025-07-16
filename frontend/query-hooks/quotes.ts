import { quotes } from '@/api';
import { useQuery } from '@tanstack/react-query';

const queryKey = ['quotes'];

export const useAllQuotes = () =>
  useQuery({
    queryKey: queryKey,
    queryFn: quotes.all,
  });

export const useQuote = (id: string) =>
  useQuery({
    queryKey: queryKey.concat(id),
    queryFn: () => quotes.get(id),
  });

export const useSummary = (id: string) =>
  useQuery({
    queryKey: queryKey.concat('summary', id),
    queryFn: () => quotes.summarize(id),
  });

export const useTop = (id: string) =>
  useQuery({
    queryKey: queryKey.concat('top', id),
    queryFn: () => quotes.top(id),
  });

export const useAggregation = (id: string) =>
  useQuery({
    queryKey: queryKey.concat('aggregate', id),
    queryFn: () => quotes.aggregate(id),
  });
