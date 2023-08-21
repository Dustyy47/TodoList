import { AuthContainer } from '@/components/providers/AuthContainer';
import { ReduxProvider } from '@/store/ReduxProvider';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Список добрых дел',
  description: 'Created by dusteex'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ReduxProvider>
          {<AuthContainer>{children}</AuthContainer>}
        </ReduxProvider>
      </body>
    </html>
  );
}
