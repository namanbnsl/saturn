import MainProvider from '@/components/providers/MainProvider';
import './globals.css';
import type { Metadata } from 'next';
import { Bricolage_Grotesque } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/ThemeProvider';

const font = Bricolage_Grotesque({
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: '🪐',
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
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="saturn-theme"
        >
          <MainProvider>{children}</MainProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
