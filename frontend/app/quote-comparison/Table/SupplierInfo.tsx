import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

import Rating from './Rating';

interface SupplierInfoProps {
  name: string;
  country: string;
  rating: number;
  top?: boolean;
}

export default function SupplierInfo({ name, country, rating, top = false }: SupplierInfoProps) {
  return (
    <TableCell colSpan={2} sx={{ position: 'relative' }}>
      <Grid container spacing={2} sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Grid size={8}>
          <Typography sx={{ fontWeight: 'bold' }}>{name}</Typography>
          <Typography variant="button">{country}</Typography>
        </Grid>
        <Grid size={4}>
          <Rating value={rating} />
        </Grid>
      </Grid>
      {top && (
        <Chip
          label="Top Pick"
          sx={{ position: 'absolute', bottom: '-16px', right: '32px' }}
          color="secondary"
        />
      )}
    </TableCell>
  );
}
