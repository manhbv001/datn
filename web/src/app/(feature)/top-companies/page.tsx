import SearchCompany from '@/components/company/Search';
import TopCompanyItem from '@/components/company/TopCompanyItem';
import { enterpriseService } from '@/services/enterprise.service';
import Link from 'next/link';
import { FC } from 'react';

export interface TopICompaniesPageProps {}
const TopCompaniesPage: FC<TopICompaniesPageProps> = async () => {
  const {
    data: { enterprises },
  } = await enterpriseService.getAll();

  return (
    <div>
      <div className="container mx-auto">
        <div className="py-4">
          <SearchCompany />
        </div>
        <div className="my-4">
          <div className="rounded p-3 text-white flex items-center justify-between bg-[var(--primary-color)]">
            <h3 className="text-xl">Top nhà tuyển dụng</h3>

            <Link
              href="companies"
              className="hover:underline text-white text-sm"
            >
              Tất cả
            </Link>
          </div>

          <div className="bg-white py-4">
            <div className="grid grid-cols-3 gap-4">
              {enterprises.map((enterprise) => (
                <TopCompanyItem data={enterprise} key={enterprise.id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopCompaniesPage;
