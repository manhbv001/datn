import { FOOTER_DATA } from '@/app/(feature)/data';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

export interface IFooterProps {}
const Footer: FC<IFooterProps> = () => {
  return (
    <div className="py-8 border-t bg-gray-50">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between gap-y-8">
        <div className="w-1/2 mx-auto order-4 lg:-order-none lg:mx-[unset] mt-4 lg:mt-0 lg:w-1/6">
          <div className="w-full aspect-square relative">
            <Image src="/techomies-full.png" alt="Techomies" fill />
          </div>
          <p className="text-center">
            <strong>Technology</strong> & <strong>Homies</strong>
            <br />
            Chia sẻ, kiến thức và giải trí
            <strong className="block border-t opacity-40 text-xs pt-3 mt-3">
              © Copyright 2021 - 2023
            </strong>
          </p>
        </div>
        <div>
          <span className="font-semibold text-[18px]">Tài nguyên</span>
          <ul className="mt-4">
            {FOOTER_DATA.menu.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.url}
                  className="my-2 block hover:text-[var(--active-color)] transition-all"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <span className="font-semibold text-[18px]">Liên hệ</span>
          <div className="my-2 mt-4">
            <span>Email:</span>{' '}
            <a
              className="text-[var(--active-color)]"
              href={`mail:${FOOTER_DATA.contact.email}`}
            >
              {FOOTER_DATA.contact.email}
            </a>
          </div>
          <div className="my-2">
            <span>Điện thoại:</span>{' '}
            <a
              className="text-[var(--active-color)]"
              href={`tel:${FOOTER_DATA.contact.phone}`}
            >
              {FOOTER_DATA.contact.phone}
            </a>
          </div>
        </div>
        <div>
          <span className="font-semibold text-[18px]">Social networks</span>
          <ul className="flex gap-6 mt-4">
            {FOOTER_DATA.socialNetworks.map((item) => (
              <li key={item.key}>
                <Link title={item.alt} href={item.url} target="_blank">
                  <Image
                    src={item.imgSrc}
                    width={48}
                    height={48}
                    alt={item.alt}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
