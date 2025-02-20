// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Pokemon App',
  description: 'Pokemon information app using Next.js',
};

export const RootLayout = ({children}: {children:React.ReactNode;}) => {
  return (
    <html lang="ja">
      <body className={`${inter.className} bg-gray-100 min-h-screen`}>
        {children}
      </body>
    </html>
  );
}

export default RootLayout;