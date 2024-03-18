import JobForm from '@/components/recruiter/job/JobForm';
import { jobServices } from '@/services/job.service';
import { occupationService } from '@/services/occupation.service';
import { provinceService } from '@/services/province.service';
import { Metadata } from 'next';

interface IEditJobProps {
  params: {
    id: number;
  };
}

export const generateMetadata = async (
  props: IEditJobProps,
): Promise<Metadata> => {
  const jobId = +props.params.id;
  const { data } = await jobServices.findById(jobId);

  return {
    title: `Chỉnh sửa - ${data.title}`,
  };
};

async function EditJob(props: IEditJobProps) {
  const jobId = +props.params.id;
  const { data } = await jobServices.findById(jobId);
  const { data: occupations } = await occupationService.getAll();
  const { data: provinces } = await provinceService.getAll();

  return (
    <div className="h-full">
      <JobForm occupations={occupations} provinces={provinces} data={data} />
    </div>
  );
}
export default EditJob;
