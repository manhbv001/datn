import AuthProvider from '@/contexts/auth/AuthProvider';
import Image from 'next/image';
import Link from 'next/link';
import { BiHomeAlt2 } from 'react-icons/bi';
import '../globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>
        <div className="flex fixed w-full h-full">
          <div className="hidden md:flex w-1/2 h-full items-center justify-center">
            <div className="w-[80%] h-full relative">
              <Image
                src="/auth-background.png"
                alt="Đăng nhập - Đăng ký"
                style={{ objectFit: 'contain' }}
                fill
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 h-full inline-flex items-center justify-center relative">
            <Link
              href="/"
              className="text-[var(--brown)] inline-flex items-center gap-x-1 absolute top-[12px] right-[24px]"
            >
              <BiHomeAlt2 /> Trang chủ
            </Link>
            <AuthProvider>{children}</AuthProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
