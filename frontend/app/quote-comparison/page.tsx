'use client';

import { quotes } from '@/query-hooks';
import XIcon from '@mui/icons-material/X';
import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useSearchParams } from 'next/navigation';

import Table from './Table';

export default function QuoteComparison() {
  const quoteId = useSearchParams().get('quoteId');
  const query = quotes.useSummary(quoteId as string);

  if (!quoteId || !query.data) {
    return (
      <Container maxWidth="xs">
        <Alert icon={<XIcon fontSize="inherit" />} severity="error">
          No quote found, or quoteId not provided
        </Alert>
      </Container>
    );
  }

  return (
    <>
      <Table quotes={query.data} quoteId={quoteId} />
      <Grid
        container
        spacing={1}
        sx={{
          marginTop: '16px',
          marginLeft: '64px',
          backgroundColor: '#F4F4F4',
          display: 'inline-flex',
          padding: '4px',
          borderRadius: '8px',
        }}
      >
        <Grid>Best Price</Grid>
        <Grid>
          <div
            style={{
              minWidth: '200px',
              width: '100%',
              height: '100%',
              background:
                'linear-gradient(90deg,rgba(118, 199, 114, 1) 0%, rgba(245, 103, 83, 1) 100%)',
              borderRadius: '16px',
            }}
          />
        </Grid>
        <Grid>Highest Price</Grid>
      </Grid>
    </>
  );
}
