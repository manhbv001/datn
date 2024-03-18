import { EnterpriseModel } from '@/models/enterprise.model';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

export interface TopEmployersProps {
  data: EnterpriseModel[];
}

const TopEmployers: FC<TopEmployersProps> = ({ data }) => {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto">
        <div className="rounded p-3 mb-1 text-white flex items-center justify-between bg-[var(--primary-color)]">
          <h3 className="text-xl">Nhà tuyển dụng hàng đầu</h3>
          <a href="#" className="hover:underline text-white text-sm">
            Xem thêm
          </a>
        </div>

        <div className="bg-white p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {data.map((employer) => (
              <div
                key={employer.id}
                className="bg-white p-4 rounded shadow-md text-center"
              >
                <Image
                  width={120}
                  height={120}
                  src={employer.logo || '/default-image.jpg'}
                  alt={employer.name}
                  className="w-24 h-24 object-cover mx-auto mb-4 rounded-full"
                />
                <Link
                  href={`/companies/${employer.slug}`}
                  className="text-lg font-semibold text-[var(--primary-color)] line-clamp-1"
                >
                  {employer.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopEmployers;
