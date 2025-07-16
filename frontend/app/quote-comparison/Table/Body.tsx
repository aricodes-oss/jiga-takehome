import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';

import Price from './Price';
import { Items, Suppliers } from './types';

interface BodyProps {
  items: Items;
  suppliers: Suppliers;
}

interface Prices {
  [itemId: string]: {
    min: number;
    avg: number;
    max: number;
  };
}

export default function Body({ items, suppliers }: BodyProps) {
  const prices: Prices = {};
  for (const itemId of Object.keys(items)) {
    let avg = 0;
    prices[itemId] = {
      min: Infinity,
      avg,
      max: -Infinity,
    };

    for (const supplierId of Object.keys(suppliers)) {
      const quoted = suppliers[supplierId][itemId];
      console.log(quoted);
      prices[itemId].min = Math.min(quoted.unitPrice, prices[itemId].min);
      prices[itemId].max = Math.max(quoted.unitPrice, prices[itemId].max);
      avg += quoted.unitPrice;
    }

    avg /= Object.keys(suppliers).length;
    prices[itemId].avg = avg;
  }

  console.log(prices);

  return Object.entries(items).map(([itemId, item]) => (
    <TableRow key={itemId}>
      <TableCell>{item.name}</TableCell>

      {Object.keys(suppliers).map(supplierId => {
        const quote = suppliers[supplierId][itemId];
        const { min, max, avg } = prices[itemId];

        return (
          <React.Fragment key={supplierId}>
            <Price value={quote.unitPrice} {...prices[itemId]} />
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
