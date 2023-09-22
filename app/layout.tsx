import MainProvider from '@/components/providers/MainProvider';
import './globals.css';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

const font = Poppins({ subsets: ['latin'], weight: ['300', '400', '600'] });

export const metadata: Metadata = {
  title: 'saturn 🪐',
  description: 'project management tool'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <MainProvider>{children}</MainProvider>
      </body>
    </html>
  );
}
