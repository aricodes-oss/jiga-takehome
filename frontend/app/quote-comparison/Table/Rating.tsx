import StarIcon from '@mui/icons-material/Star';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

interface RatingProps {
  value: number;
}

export default function Rating({ value }: RatingProps) {
  return (
    <Grid container>
      <Grid>
        <StarIcon color="warning" />
      </Grid>
      <Grid>
        <Typography sx={{ fontWeight: 'bold' }}>{value}</Typography>
      </Grid>
    </Grid>
  );
}
