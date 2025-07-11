import { SupplierQuotes } from '@/types';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';

import ItemName from './ItemName';
import Price from './Price';

interface BodyProps {
  quotes: SupplierQuotes;
  quoteId: string;
}

interface Prices {
  [itemId: string]: {
    min: number;
    avg: number;
    max: number;
  };
}

export default function Body({ quotes }: BodyProps) {
  const items = Array.from(
    new Set(
      Object.values(quotes)
        .map(quote => Object.keys(quote))
        .flat(Infinity),
    ),
  ) as string[];

  const prices: Prices = {};
  for (const itemId of items) {
    let avg = 0;
    prices[itemId] = {
      min: Infinity,
      avg,
      max: -Infinity,
    };

    for (const supplierId of Object.keys(quotes)) {
      const quoted = quotes[supplierId][itemId];
      prices[itemId].min = Math.min(quoted.unitPrice, prices[itemId].min);
      prices[itemId].max = Math.max(quoted.unitPrice, prices[itemId].max);
      avg += quoted.unitPrice;
    }

    avg /= Object.keys(quotes).length;
    prices[itemId].avg = avg;
  }

  return items.map(item => (
    <TableRow key={item}>
      <TableCell>
        <ItemName id={item} />
      </TableCell>

      {Object.keys(quotes).map(supplierId => {
        const quote = quotes[supplierId][item];
        const { min, max, avg } = prices[item];

        return (
          <React.Fragment key={supplierId}>
            <Price value={quote.unitPrice} {...prices[item]} />
            <Price
              value={quote.unitPrice * quote.quantity}
              min={min * quote.quantity}
              avg={avg * quote.quantity}
              max={max * quote.quantity}
            />
          </React.Fragment>
        );
      })}
    </TableRow>
  ));
}
