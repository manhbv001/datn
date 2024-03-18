import CompanyItem from '@/components/company/CompanyItem';
import TopCompanyItem from '@/components/company/TopCompanyItem';
import { enterpriseService } from '@/services/enterprise.service';
import Link from 'next/link';
import { FC } from 'react';

export interface ICompaniesPageProps {}
const CompaniesPage: FC<ICompaniesPageProps> = async () => {
  const {
    data: { enterprises },
  } = await enterpriseService.getAll();

  return (
    <div>
      <div className="container mx-auto">
        {/* <div className="py-4">
          <SearchCompany />
        </div> */}
        <div className="my-4">
          <div className="rounded p-3 text-white flex items-center justify-between bg-[var(--primary-color)]">
            <h3 className="text-xl">Top nhà tuyển dụng</h3>

            <Link
              href="top-companies"
              className="hover:underline text-white text-sm"
            >
              Xem thêm
            </Link>
          </div>

          <div className="bg-white py-4">
            <div className="grid grid-cols-3 gap-4 items-stretch">
              {enterprises.slice(0, 3).map((enterprise) => (
                <TopCompanyItem data={enterprise} key={enterprise.id} />
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8">
          <div className="rounded p-3 text-white flex items-center justify-between bg-[var(--primary-color)]">
            <h3 className="text-xl">Nhà tuyển dụng khác</h3>
          </div>

          <div className="bg-white py-4">
            <div className="grid grid-cols-2 gap-x-4">
              {enterprises.map((enterprise) => (
                <CompanyItem data={enterprise} key={enterprise.id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompaniesPage;
