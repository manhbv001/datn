import { Inter } from 'next/font/google';
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Đồ án tốt nghiệp',
  description: 'Bùi Văn Mạnh - Đại học Công nghiệp Hà Nội',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="w-full h-full flex justify-center items-center">
          {children}
        </div>
      </body>
    </html>
  );
}
