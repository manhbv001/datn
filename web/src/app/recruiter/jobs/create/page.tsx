import JobForm from '@/components/recruiter/job/JobForm';
import { occupationService } from '@/services/occupation.service';
import { provinceService } from '@/services/province.service';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tạo việc làm',
};

async function CreateJob() {
  const { data: occupations } = await occupationService.getAll();
  const { data: provinces } = await provinceService.getAll();

  return (
    <div className="h-full">
      <JobForm occupations={occupations} provinces={provinces} />
    </div>
  );
}

export default CreateJob;
