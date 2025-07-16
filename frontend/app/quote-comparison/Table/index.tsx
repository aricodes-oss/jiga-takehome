import { Aggregate, SupplierQuotes } from '@/types';
import { Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';

import Body from './Body';
import Head from './Head';
import Price from './Price';

interface TableProps {
  aggregate: Aggregate;
}

interface Price {
  min: number;
  avg: number;
  max: number;
}

export default function ComparisonTable({ aggregate }: TableProps) {
  const { suppliers, items } = aggregate;
  const totalPrice: Price = {
    min: Infinity,
    avg: 0,
    max: -Infinity,
  };

  for (const supplierId of Object.keys(suppliers)) {
    let total = 0;

    for (const itemId of Object.keys(items)) {
      const quote = suppliers[supplierId][itemId];
      if (!quote) {
        continue;
      }
      total += quote.unitPrice * quote.quantity;
    }

    totalPrice.min = Math.min(totalPrice.min, total);
    totalPrice.max = Math.max(totalPrice.max, total);
    totalPrice.avg += total;
  }

  totalPrice.avg /= Object.keys(aggregate.suppliers).length;

  return (
    <>
      <Typography variant="h4" sx={{ marginBottom: '8px' }}>
        Detailed quotes comparison{' '}
        <Typography variant="caption">({Object.keys(suppliers).length} suppliers)</Typography>
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <Head suppliers={suppliers} />
          <TableBody>
            <Body suppliers={suppliers} items={items} />
            <TableRow>
              <TableCell>
                <strong>Total Price</strong>
              </TableCell>

              {Object.keys(suppliers).map(supplierId => (
                <React.Fragment key={supplierId}>
                  <TableCell />
                  <Price
                    value={Object.keys(items).reduce(
                      (acc, itemId) =>
                        acc +
                        suppliers[supplierId][itemId].unitPrice *
                          suppliers[supplierId][itemId].quantity,
                      0,
                    )}
                    {...totalPrice}
                  />
                </React.Fragment>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
