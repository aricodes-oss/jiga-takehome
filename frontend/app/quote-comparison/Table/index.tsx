import { SupplierQuotes } from '@/types';
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
  quotes: SupplierQuotes;
  quoteId: string;
}

interface Price {
  min: number;
  avg: number;
  max: number;
}

export default function ComparisonTable({ quotes, quoteId }: TableProps) {
  const totalPrice: Price = {
    min: Infinity,
    avg: 0,
    max: -Infinity,
  };

  for (const supplierId of Object.keys(quotes)) {
    const total = Object.values(quotes[supplierId]).reduce(
      (acc, val) => acc + val.unitPrice * val.quantity,
      0,
    );
    totalPrice.min = Math.min(totalPrice.min, total);
    totalPrice.max = Math.max(totalPrice.max, total);
    totalPrice.avg += total;
  }

  totalPrice.avg /= Object.keys(quotes).length;
  console.log(totalPrice);

  return (
    <>
      <Typography variant="h4" sx={{ marginBottom: '8px' }}>
        Detailed quotes comparison{' '}
        <Typography variant="caption">({Object.keys(quotes).length} suppliers)</Typography>
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <Head quotes={quotes} quoteId={quoteId} />
          <TableBody>
            <Body quotes={quotes} quoteId={quoteId} />
            <TableRow>
              <TableCell>
                <strong>Total Price</strong>
              </TableCell>

              {Object.entries(quotes).map(([supplierId, items]) => (
                <React.Fragment key={supplierId}>
                  <TableCell />
                  <Price
                    value={Object.values(items).reduce(
                      (acc, val) => acc + val.unitPrice * val.quantity,
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
