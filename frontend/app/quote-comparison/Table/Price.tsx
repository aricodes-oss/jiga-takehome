import TableCell from '@mui/material/TableCell';

interface PriceProps {
  value: number;
  min: number;
  max: number;
  avg: number;
}

// In a production application we would want these to be theme constants
const colorFor = ({ value, min, avg, max }: PriceProps): string => {
  if (value === min) {
    return '#76C772';
  } else if (value >= min && value <= avg) {
    return '#CFF0CD';
  } else if (value < max && value >= avg) {
    return '#FFE894';
  } else {
    return '#F56753';
  }
};

export default function Price(props: PriceProps) {
  return <TableCell sx={{ backgroundColor: colorFor(props) }}>${props.value}</TableCell>;
}
