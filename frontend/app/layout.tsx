import CssBaseline from '@mui/material/CssBaseline';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

import Providers from './providers';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'Jiga Takehome Task',
  description: 'Developed by Aria Taylor',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.variable}>
      <head>
        <CssBaseline />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
