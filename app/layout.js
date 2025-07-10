import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';

export const metadata = {
  title: 'CineCore',
  icons: {
    icon: '/clapper.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <Navbar />
        <main className="mt-20 min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
