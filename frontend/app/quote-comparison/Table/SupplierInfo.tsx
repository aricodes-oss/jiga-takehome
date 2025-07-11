import { suppliers } from '@/query-hooks';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

import Rating from './Rating';

interface SupplierInfoProps {
  id: string;
  top?: boolean;
}

export default function SupplierInfo({ id, top = false }: SupplierInfoProps) {
  const supplierQuery = suppliers.useSupplier(id);

  if (supplierQuery.isLoading || !supplierQuery.data) {
    return <TableCell>Loading...</TableCell>;
  }

  return (
    <TableCell colSpan={2} sx={{ position: 'relative' }}>
      <Grid container spacing={2} sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Grid size={8}>
          <Typography sx={{ fontWeight: 'bold' }}>{supplierQuery.data.name}</Typography>
          <Typography variant="button">{supplierQuery.data.country}</Typography>
        </Grid>
        <Grid size={4}>
          <Rating supplierId={id} />
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
