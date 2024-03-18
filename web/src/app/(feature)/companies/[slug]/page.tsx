import JobItem from '@/components/common/JobItem';
import { enterpriseService } from '@/services/enterprise.service';
import { jobServices } from '@/services/job.service';
import Image from 'next/image';
import { FC } from 'react';
export interface ICompanyDetailPageProps {
  params: {
    slug: string;
  };
}
const CompanyDetailPage: FC<ICompanyDetailPageProps> = async ({
  params: { slug },
}) => {
  const { data: company } = await enterpriseService.getBySlug(slug);
  const {
    data: { jobs },
  } = await jobServices.query({ enterprise_id: company.id });

  return (
    <div>
      <div className="container mx-auto">
        <div
          className="mt-4 p-2 border rounded overflow-hidden flex items-end h-[300px]"
          style={{
            backgroundImage: `url("${company.cover}")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        >
          <div className="border inline-block">
            <Image
              width={240}
              height={240}
              src={company.logo || '/default-image.jpg'}
              alt={company.name}
            />
          </div>
          <div className="pl-6 py-4 bg-[var(--brown)] w-full">
            <h1 className="text-3xl font-bold text-white">{company.name}</h1>
          </div>
        </div>
        <div className="mt-4 px-5 py-6 bg-gray-50 rounded overflow-hidden grid grid-cols-3 gap-x-8">
          <div className="col-span-2">
            <div>
              <h4 className="uppercase text-lg font-semibold text-[var(--brown)]">
                Giới thiệu công ty
              </h4>
              <div className="mt-4">
                <div
                  dangerouslySetInnerHTML={{ __html: company.description }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 px-5 py-6 bg-gray-50 rounded overflow-hidden">
          <div>
            <h4 className="uppercase text-lg font-semibold text-[var(--brown)]">
              Việc làm
            </h4>
            <ul className="grid grid-cols-2 gap-4 mt-6">
              {jobs.map((item) => (
                <li key={`rleatedjob_${item.id}`} className="col-span-1">
                  <JobItem data={item} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetailPage;
