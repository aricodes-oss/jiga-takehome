import { useTop } from '@/query-hooks/quotes';
import { SupplierQuotes } from '@/types';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';

import SupplierInfo from './SupplierInfo';

interface HeadProps {
  quotes: SupplierQuotes;
  quoteId: string;
}

export default function Head({ quotes, quoteId }: HeadProps) {
  const topQuery = useTop(quoteId);
  console.log(topQuery.data);

  return (
    <TableHead>
      <TableRow>
        <TableCell rowSpan={2}>Part name</TableCell>
        {Object.keys(quotes).map(supplierId => (
          <SupplierInfo
            id={supplierId}
            top={supplierId === topQuery.data?.supplierId}
            key={supplierId}
          />
        ))}
      </TableRow>
      <TableRow>
        {Object.keys(quotes).map(itemId => (
          <React.Fragment key={itemId}>
            <TableCell>Unit Price</TableCell>
            <TableCell>Price</TableCell>
          </React.Fragment>
        ))}
      </TableRow>
    </TableHead>
  );
}
