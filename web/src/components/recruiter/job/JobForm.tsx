'use client';
import {
  CreateJobPayload,
  JobArrangements,
  JobLevels,
  JobModel,
  JobStatus,
} from '@/models/job.model';
import { OccupationModel } from '@/models/occupation.model';
import { ProvinceModel } from '@/models/province.model';
import { jobServices } from '@/services/job.service';
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  message,
} from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} không được bỏ trống!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} phải là chữ số!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
/* eslint-enable no-template-curly-in-string */

interface IJobFormProps {
  data?: JobModel;
  occupations: OccupationModel[];
  provinces: ProvinceModel[];
}

const Editor = dynamic(() => import('@/components/recruiter/common/MyEditor'), {
  ssr: false,
});

// eslint-disable-next-line arrow-body-style
const disabledDate: RangePickerProps['disabledDate'] = (current) => {
  // Can not select days before today and today
  return current && current < dayjs().endOf('day');
};

const JobForm: FC<IJobFormProps> = ({ occupations, data, provinces }) => {
  const router = useRouter();
  const [description, setDescription] = useState(data?.description || '');
  const [benefit, setBenefit] = useState(data?.benefit || '');
  const [requirement, setRequirement] = useState(data?.requirement || '');

  const handleSubmit = (payload: CreateJobPayload) => {
    if (data) {
      jobServices
        .updateJob(data.id, { ...payload, benefit, requirement, description })
        .then((response) => {
          if (response.success) {
            message.success('Thành công');
            router.replace('/recruiter/jobs');
          } else {
            message.error(response.message);
          }
        });
    } else {
      jobServices
        .createJob({ ...payload, benefit, requirement, description })
        .then((response) => {
          if (response.success) {
            message.success('Thành công');
            router.replace('/recruiter/jobs');
          } else {
            message.error(response.message);
          }
        });
    }
  };

  const handleDescriptionChange = (_: any, editor: any) => {
    const data = editor.getData();
    setDescription(data);
  };

  const handleBenefitChange = (_: any, editor: any) => {
    const data = editor.getData();
    setBenefit(data);
  };

  const handleRequirementChange = (_: any, editor: any) => {
    const data = editor.getData();
    setRequirement(data);
  };

  return (
    <div className="h-full overflow-auto">
      <Form
        initialValues={{
          ...data,
          status: data?.status || 'default',
          level: data?.level || 'default',
          occupation_id: data?.occupation_id || 'default',
          province_id: data?.province_id || 'default',
          arrangement: data?.arrangement || JobArrangements.Fulltime,
          headcount: data?.headcount || 1,
          expired_date: data?.expired_date
            ? dayjs(data.expired_date)
            : undefined,
        }}
        name="job"
        onFinish={handleSubmit}
        validateMessages={validateMessages}
      >
        <div className="w-full grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <Form.Item
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
              label="Tạo việc làm mới"
              style={{ marginBottom: 16, fontWeight: 'bold' }}
            />
            <Form.Item
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
              name="title"
              label="Tiêu đề"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 10 }}
              name="occupation_id"
              label="Ngành nghề"
              rules={[{ required: true }]}
            >
              <Select
                style={{ width: '100%' }}
                options={[
                  {
                    value: 'default',
                    disabled: true,
                    label: 'Chọn ngành nghề',
                  },
                  ...occupations.map((occupation) => ({
                    label: occupation.name,
                    value: occupation.id,
                  })),
                ]}
              />
            </Form.Item>
            <Form.Item
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 4 }}
              name="status"
              label="Trạng thái"
              rules={[{ required: true }]}
            >
              <Select
                options={[
                  {
                    value: 'default',
                    label: 'Chọn trạng thái',
                    disabled: true,
                  },
                  ...Object.values(JobStatus).map((item) => ({
                    value: item,
                    label: item,
                  })),
                ]}
              />
            </Form.Item>
            <Form.Item
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 6 }}
              name="expired_date"
              label="Hạn ứng tuyển"
            >
              <DatePicker
                format="YYYY-MM-DD HH:mm:ss"
                disabledDate={disabledDate}
                style={{ width: '100%' }}
                showTime
              />
            </Form.Item>
            <Form.Item
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 4 }}
              name="headcount"
              label="Số lượng"
            >
              <InputNumber min={1} />
            </Form.Item>
            <Form.Item
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 4 }}
              name="level"
              label="Trình độ"
            >
              <Select
                options={[
                  { value: 'default', disabled: true, label: 'Chọn trình độ' },
                  ...Object.values(JobLevels).map((level) => ({
                    label: level,
                    value: level,
                  })),
                ]}
              />
            </Form.Item>
            <Form.Item
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 4 }}
              name="arrangement"
              label="Hình thức"
            >
              <Select
                options={[
                  ...Object.values(JobArrangements).map((arr) => ({
                    label: arr,
                    value: arr,
                  })),
                ]}
              />
            </Form.Item>
            <Form.Item
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 24 }}
              name="work_place"
              label="Địa điểm làm việc"
            >
              <Input placeholder="123A, Cầu Giấy, Hà Nội" />
            </Form.Item>
            <Form.Item
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 24 }}
              name="province_id"
              label="Thành phố"
            >
              <Select
                options={[
                  { value: 'default', disabled: true, label: 'Chọn thành phố' },
                  ...provinces.map((province) => ({
                    label: province.name,
                    value: province.id,
                  })),
                ]}
              />
            </Form.Item>
            <Form.Item
              label="Mô tả công việc"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
              required
            >
              <Editor value={description} onChange={handleDescriptionChange} />
            </Form.Item>
            <Form.Item
              label="Phúc lợi"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
            >
              <Editor value={benefit} onChange={handleBenefitChange} />
            </Form.Item>{' '}
            <Form.Item
              label="Yêu cầu ứng viên"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
            >
              <Editor value={requirement} onChange={handleRequirementChange} />
            </Form.Item>
            <div className="flex justify-end gap-2">
              <Form.Item>
                <Button
                  htmlType="submit"
                  style={{ backgroundColor: '#1677ff' }}
                  type="primary"
                >
                  {data ? 'Cập nhật' : 'Đăng tuyển'}
                </Button>
              </Form.Item>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default JobForm;
