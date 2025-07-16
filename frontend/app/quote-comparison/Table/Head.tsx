import { FilledSupplier } from '@/types';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';

import SupplierInfo from './SupplierInfo';
import { Suppliers } from './types';

interface HeadProps {
  suppliers: Suppliers;
}

export default function Head({ suppliers }: HeadProps) {
  const topSupplier = Object.entries(suppliers).toSorted(
    (a, b) => (a[1] as FilledSupplier).score + (b[1] as FilledSupplier).score,
  )[0][0];

  return (
    <TableHead>
      <TableRow>
        <TableCell rowSpan={2}>Part name</TableCell>
        {Object.entries(suppliers).map(([supplierId, supplier]) => {
          const { name, country, rating } = supplier as FilledSupplier;

          return (
            <SupplierInfo
              key={supplierId}
              name={name}
              country={country}
              rating={rating}
              top={supplierId === topSupplier}
            />
          );
        })}
      </TableRow>
      <TableRow>
        {Object.keys(suppliers).map(supplierId => (
          <React.Fragment key={supplierId}>
            <TableCell>Unit Price</TableCell>
            <TableCell>Price</TableCell>
          </React.Fragment>
        ))}
      </TableRow>
    </TableHead>
  );
}
