import AttractiveJobs from '@/components/home/ActractiveJobs';
import HomeBanner from '@/components/home/Banner';
import HotJobs from '@/components/home/HotJobs';
import JobByCities from '@/components/home/JobByCities';
import JobByIndustries from '@/components/home/JobByIndustries';
import SubBanner from '@/components/home/SubBanner';
import TopEmployers from '@/components/home/TopEmployers';
import { enterpriseService } from '@/services/enterprise.service';
import { jobServices } from '@/services/job.service';
import { occupationService } from '@/services/occupation.service';
import { provinceService } from '@/services/province.service';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Trang chủ - DATN',
    description:
      'Chào mừng bạn đến với trang chủ của Blog công nghệ! Tại đây, chúng tôi cung cấp thông tin, tin tức và những bài viết đa dạng về công nghệ, đáp ứng nhu cầu của cộng đồng yêu công nghệ. Với những bài viết chất lượng và thông tin thú vị, chúng tôi mong muốn mang đến cho bạn những kiến thức mới nhất và hữu ích về các xu hướng công nghệ, sản phẩm mới và các sự kiện trong lĩnh vực này.',
  };
}

export default async function Home() {
  const companies = await enterpriseService.getAll({ page: 1, size: 5 });
  const {
    data: { jobs: hotJobs },
  } = await jobServices.query({
    page: 1,
    size: 10,
    order_by: 'DESC',
    order_key: 'salary_to',
  });
  const {
    data: { jobs: newJobs },
  } = await jobServices.query({
    page: 1,
    size: 10,
  });
  const { data: occupationsByJob } = await occupationService.getByJobs();
  const { data: provincesByJob } = await provinceService.getByJobs();

  return (
    <div className="bg-gray-100">
      <div>
        <HomeBanner />
      </div>
      <div>
        <SubBanner src="https://c8.alamy.com/comp/M7YT3E/digital-marketing-strategy-business-concept-horizontal-banner-with-M7YT3E.jpg" />
      </div>
      <div>
        <HotJobs data={newJobs} />
      </div>
      <div>
        <AttractiveJobs data={hotJobs} />
      </div>
      <div>
        <SubBanner src="https://as2.ftcdn.net/v2/jpg/02/49/82/75/1000_F_249827537_X20LNXXQAoDySHv7JWK1kraS15ISFZDc.jpg" />
      </div>
      {/* <div>
        <HighSalaryJobs data={jobs} />
      </div> */}
      <div>
        <TopEmployers data={companies.data.enterprises} />
      </div>
      <div>
        <SubBanner src="https://mytat.co/uploads/events/Policybazaar_Insurance_event_banner1.png" />
      </div>
      <div>
        <JobByIndustries data={occupationsByJob} />
      </div>
      <div>
        <JobByCities data={provincesByJob} />
      </div>
      {/* <div>
        <Stats />
      </div> */}
    </div>
  );
}
