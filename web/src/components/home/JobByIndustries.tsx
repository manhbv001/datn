import { OccupationModel } from '@/models/occupation.model';
import { FC } from 'react';

export interface JobByIndustriesProps {
  data: OccupationModel[];
}
const JobByIndustries: FC<JobByIndustriesProps> = ({ data }) => {
  return (
    <section className="py-4 bg-gray-100 text-gray-800">
      <div className="container mx-auto">
        <div className="rounded p-3 mb-1 text-white flex items-center justify-between bg-[var(--primary-color)]">
          <h3 className="text-xl">Công việc theo ngành nghề</h3>
          <a href="#" className="hover:underline text-white text-sm">
            Xem thêm
          </a>
        </div>

        <div className="bg-white p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {data.map((occupation) => (
              <div
                key={occupation.id}
                className="bg-gray-100 p-4 rounded shadow-md text-center"
              >
                <p className="text-md font-semibold">{occupation.name}</p>
                <p className="text-gray-600">{occupation.totalJobs} việc làm</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobByIndustries;
