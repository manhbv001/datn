import { ProvinceModel } from '@/models/province.model';
import { FC } from 'react';
import VerticalJobFilters from '../common/VerticalJobFilters';

export interface JobByCitiesProps {
  data: ProvinceModel[];
}
const JobByCities: FC<JobByCitiesProps> = ({ data }) => {
  return (
    <section className="py-4 bg-gray-100 text-gray-800">
      <div className="container mx-auto">
        <div className="grid grid-cols-4 gap-4 items-stretch">
          <div className="col-span-3 h-full bg-white">
            <div className="rounded p-3 mb-1 text-white flex items-center justify-between bg-[var(--primary-color)]">
              <h3 className="text-xl">Công việc theo tỉnh thành</h3>
              <a href="#" className="hover:underline text-white text-sm">
                Xem thêm
              </a>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {data.map((province) => (
                  <div key={province.id}>
                    <p className="text-sm font-semibold">
                      {`Việc làm tại ${province.name}`}{' '}
                      <span className="text-[red]">({province.totalJobs})</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div className="p-3 text-white flex items-center justify-between bg-[var(--primary-color)]">
              <h3 className="text-xl">Tìm kiếm nâng cao</h3>
              <a href="#" className="hover:underline text-white text-sm">
                Xem thêm
              </a>
            </div>
            <div>
              <VerticalJobFilters />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobByCities;
