'use client';

import { AuthContext } from '@/contexts/auth/AuthProvider';
import { ApplyJobPayload } from '@/models/applicant.model';
import { JobModel } from '@/models/job.model';
import { ResumeModel } from '@/models/resume.model';
import { applicantService } from '@/services/applicant.service';
import { resumeService } from '@/services/resume.service';
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Radio,
  Row,
  Space,
  notification,
} from 'antd';
import { FC, useContext, useEffect, useState } from 'react';
import { IoWarningOutline } from 'react-icons/io5';

export interface IApplyFormProps {}

type FieldType = {
  phone: string;
  email: string;
};

const options = [
  { label: 'Mẫu CV', value: 'cv' },
  { label: 'Hồ sơ online', value: 'online' },
  { label: 'Hồ sơ đính kèm', value: 'attachment' },
];
export interface IApplyModalProps {
  job: JobModel;
  visible: boolean;
  onSubmit: () => void;
  onCancel: () => void;
}
const ApplyModal: FC<IApplyModalProps> = ({
  visible,
  onSubmit,
  onCancel,
  job,
}) => {
  const { user } = useContext(AuthContext);
  const [profileType, setProfileType] = useState('cv');
  const [resumes, setResumes] = useState<ResumeModel[]>([]);
  const [selectedResumeId, setSelectedResumeId] = useState<number | undefined>(
    undefined,
  );
  const [coverLetter, setCoverLetter] = useState<string | undefined>();

  const handleSubmit = () => {
    const payload: ApplyJobPayload = {
      resume_id: selectedResumeId,
      cover_letter: coverLetter,
      job_id: job.id,
    };

    applicantService
      .applyJob(payload)
      .then((response) => {
        if (response.success) {
          notification.success({ message: 'Ứng tuyển thành công' });
        }
      })
      .finally(() => {
        onSubmit && onSubmit();
      });
  };

  const handleCancel = () => {
    onCancel && onCancel();
  };

  useEffect(() => {
    resumeService.queryByUser().then((response) => {
      if (response.success) setResumes(response.data);
    });
  }, []);

  if (!user) return;
  return (
    <div>
      <Modal
        title={
          <span className="text-lg">
            Ứng tuyển công việc:{' '}
            <span className="ml-1 text-[var(--primary-color)]">
              {job.title}
            </span>
          </span>
        }
        destroyOnClose
        open={visible}
        onCancel={handleCancel}
        width={900}
        footer={[
          <Button onClick={handleCancel} size="large" key={'cancel btn'}>
            Hủy bỏ
          </Button>,
          <Button
            onClick={handleSubmit}
            key={'submit btn'}
            size="large"
            style={{ background: 'var(--primary-color)' }}
          >
            <span className="text-white">Ứng tuyển</span>
          </Button>,
        ]}
      >
        <div className="border-t mt-3 py-3">
          <div>
            <div className="flex">
              <div className="flex justify-center">
                <Radio.Group
                  options={options}
                  onChange={(event) => setProfileType(event.target.value)}
                  defaultValue={profileType}
                />
              </div>
            </div>
            {profileType === 'cv' && (
              <div className="border rounded-md mt-4 px-4 py-3">
                <span className="block font-semibold">
                  Chọn mẫu CV của bạn:
                </span>
                <div className="mt-2">
                  <Radio.Group
                    onChange={(event) =>
                      setSelectedResumeId(event.target.value)
                    }
                  >
                    <Space direction="vertical">
                      {resumes.map((item) => (
                        <Radio key={`item resum ${item.id}`} value={item.id}>
                          {item.name}
                        </Radio>
                      ))}
                    </Space>
                  </Radio.Group>
                </div>
              </div>
            )}
            <div className="border rounded-md mt-4 px-4 py-3">
              <span className="block font-semibold">
                Xác nhận thông tin liên hệ:
              </span>
              <p className="opacity-75">
                Vui lòng xác nhận các thông tin dưới đây để nhà tuyển dụng có
                thể tìm thấy bạn. Các thay đổi sẽ cập nhật vào hồ sơ
              </p>
              <div className="mt-4">
                <Form
                  name="basic"
                  initialValues={{
                    email: user.applicantProfile?.email,
                    phone: user.applicantProfile?.phone,
                  }}
                  onFinish={() => {}}
                  onFinishFailed={() => {}}
                  autoComplete="off"
                  layout="inline"
                >
                  <Row style={{ width: '100%' }}>
                    <Col span={12}>
                      <Form.Item<FieldType>
                        label="Số điện thoại"
                        name="phone"
                        rules={[
                          {
                            required: true,
                            message: 'Vui lòng nhập đủ thông tin liên hệ!',
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item<FieldType>
                        label="Email"
                        name="email"
                        rules={[
                          {
                            required: true,
                            message: 'Vui lòng nhập đủ thông tin liên hệ!',
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row justify={'end'} style={{ width: '100%', marginTop: 10 }}>
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        style={{ backgroundColor: 'var(--primary-color)' }}
                      >
                        <span className="text-white px-3">Cập nhật</span>
                      </Button>
                    </Form.Item>
                  </Row>
                </Form>
              </div>
              <div>
                <div className="mt-2">
                  <div className="inline-flex items-center translate-y-[1px]">
                    <IoWarningOutline color="orange" />
                    <span className="ml-1">{'Xin lưu ý: '}</span>
                  </div>
                  <p className="inline">
                    {
                      ' Hiện nay có một số người mạo danh nhà tuyển dụng đã bị báo cáo về\
              hành vi lừa đảo. Họ yêu cầu ứng viên phải trả phí thông qua việc\
              tải về một ứng dụng và hoàn thành các nhiệm vụ,…'
                    }
                  </p>
                  <p className="mt-1">
                    Khi ứng tuyển việc làm,{' '}
                    <strong>
                      các ứng viên không phải chi trả hoặc ứng bất cứ khoản phí
                      nào trên trang web.
                    </strong>{' '}
                    Xin cảm ơn!
                  </p>
                </div>
              </div>
            </div>
            <div className="border rounded-md mt-4 px-4 py-3">
              <span className="block font-semibold">Thư giới thiệu:</span>
              <div className="mt-4">
                <Input.TextArea
                  onChange={(e) => {
                    setCoverLetter(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ApplyModal;
