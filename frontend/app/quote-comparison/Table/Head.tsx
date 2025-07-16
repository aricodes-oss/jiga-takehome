import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';

import SupplierInfo from './SupplierInfo';
import { Items, Suppliers } from './types';

interface HeadProps {
  suppliers: Suppliers;
}

export default function Head({ suppliers }: HeadProps) {
  const topSupplier = Object.entries(suppliers).toSorted((a, b) => b[1].score - a[1].score)[0][0];

  return (
    <TableHead>
      <TableRow>
        <TableCell rowSpan={2}>Part name</TableCell>
        {Object.entries(suppliers).map(([supplierId, { name, country, rating }]) => (
          <SupplierInfo
            key={supplierId}
            name={name}
            country={country}
            rating={rating}
            top={supplierId === topSupplier}
          />
        ))}
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
