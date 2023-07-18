import { Nunito } from 'next/font/google';
import Modal from './components/modals/modal';
import Navbar from './components/Navbar/Navbar';

import './globals.css';

const nunito = Nunito({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <Modal isOpen actionLabel={'hi'} title={'working on'} />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
