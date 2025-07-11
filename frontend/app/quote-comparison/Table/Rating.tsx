import { useSupplierRating } from '@/query-hooks/ratings';
import StarIcon from '@mui/icons-material/Star';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

interface RatingProps {
  supplierId: string;
}

export default function Rating({ supplierId }: RatingProps) {
  const query = useSupplierRating(supplierId);

  if (query.isLoading || !query.data) {
    return null;
  }

  return (
    <Grid container>
      <Grid>
        <StarIcon color="warning" />
      </Grid>
      <Grid>
        <Typography sx={{ fontWeight: 'bold' }}>{query.data.rating}</Typography>
      </Grid>
    </Grid>
  );
}
