import { useItem } from '@/query-hooks/items';

interface ItemNameProps {
  id: string;
}

export default function ItemName({ id }: ItemNameProps) {
  const query = useItem(id);

  if (query.isLoading || !query.data) {
    return 'Loading...';
  }

  return query.data.name;
}
