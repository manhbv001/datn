'use client';
import { FC, useEffect, useState } from 'react';

import SidebarRight from '@/components/applicant-profile/SidebarRight';
import Loading from '@/components/common/Loading';
import { CreateOrUpdateApplicantProfilePayload } from '@/models/applicant-profile.model';
import {
  ApplicantLevel,
  Education,
  Gender,
  WorkArrangement,
} from '@/models/common';
import { OccupationModel } from '@/models/occupation.model';
import { ProvinceModel } from '@/models/province.model';
import { applicantProfileService } from '@/services/applicant-profile.service';
import { occupationService } from '@/services/occupation.service';
import { provinceService } from '@/services/province.service';
import { Button, DatePicker, Form, Input, Select, notification } from 'antd';
import dayjs from 'dayjs';

type FieldType = {
  display_name: string;
  email: string;
  phone: string;
  level: ApplicantLevel;
  education: Education;
  date_of_birth: string;
  province_id: number;
  gender: Gender;
  work_arrangement: WorkArrangement;
  salary: string;
  expect_level: ApplicantLevel;
  occupation_ids: number[];
  work_province_ids: number[];
};

export interface IApplicantProfileProps {}
const ApplicantProfile: FC<IApplicantProfileProps> = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<FieldType>({
    display_name: '',
    email: '',
    phone: '',
    level: '' as ApplicantLevel,
    education: '' as Education,
    date_of_birth: '',
    province_id: null as any,
    gender: '' as Gender,
    work_arrangement: '' as WorkArrangement,
    salary: '',
    expect_level: '' as ApplicantLevel,
    occupation_ids: [],
    work_province_ids: [],
  });
  const [occupations, setOccupations] = useState<OccupationModel[]>([]);
  const [provinces, setProvinces] = useState<ProvinceModel[]>([]);

  const onFinish = (values: FieldType) => {
    const [salaryFrom, salaryTo] = values.salary.split('-');
    const payload: CreateOrUpdateApplicantProfilePayload = {
      display_name: values.display_name,
      email: values.email,
      phone: values.phone,
      level: values.level,
      education: values.education,
      date_of_birth: values.date_of_birth,
      province_id: values.province_id,
      gender: values.gender,
      work_arrangement: values.work_arrangement,
      salary_from: Number(salaryFrom),
      salary_to: Number(salaryTo),
      expect_level: values.expect_level,
      occupation_ids: values.occupation_ids,
      work_province_ids: values.work_province_ids,
    };

    applicantProfileService.createOrUpdate(payload).then((response) => {
      if (response.success) notification.success({ message: 'Thành công' });
    });
  };

  useEffect(() => {
    document.title = 'Hồ sơ cá nhân';

    applicantProfileService
      .getProfile()
      .then((response) => {
        const data = response.data;
        if (response.success && response.data)
          setProfile({
            display_name: data.display_name,
            email: data.email,
            phone: data.phone,
            level: data.level,
            education: data.education,
            date_of_birth: dayjs(data.date_of_birth) as unknown as string,
            province_id: data.province_id,
            gender: data.gender,
            work_arrangement: data.work_arrangement,
            salary: `${data.salary_from}-${data.salary_to}`,
            expect_level: data.expect_level,
            occupation_ids: data.occupations.map((item) => item.id),
            work_province_ids: data.workProvinces.map((item) => item.id),
          });
      })
      .finally(() => {
        setLoading(false);
      });

    occupationService.getAll().then((response) => {
      if (response.success) setOccupations(response.data);
    });

    provinceService.getAll().then((response) => {
      if (response.success) setProvinces(response.data);
    });
  }, []);

  return (
    <div className="p-3">
      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-3 gap-x-2">
          <div className="col-span-2">
            <h3 className="font-semibold text-lg pl-4 pt-3">
              Bạn vui lòng hoàn thiện các thông tin dưới đây
            </h3>
            <div className="mt-6 mx-auto max-w-[600px]">
              <Form
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={profile}
                onFinish={onFinish}
                autoComplete="off"
              >
                <div>
                  <h4 className="text-xl text-[var(--primary-color)] mt-12">
                    Thông tin cá nhân
                  </h4>
                  <div className="mt-3">
                    <Form.Item<FieldType>
                      label="Họ và tên"
                      name="display_name"
                      rules={[
                        { required: true, message: 'Vui lòng nhập họ và tên!' },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                      label="Email"
                      name="email"
                      rules={[
                        { required: true, message: 'Vui lòng nhập email!' },
                      ]}
                    >
                      <Input type="email" />
                    </Form.Item>

                    <Form.Item<FieldType>
                      label="Số điện thoại"
                      name="phone"
                      rules={[
                        { required: true, message: 'Vui lòng nhập SĐT!' },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                      label="Ngày sinh"
                      name="date_of_birth"
                      rules={[
                        { required: true, message: 'Vui lòng nhập ngày sinh!' },
                      ]}
                    >
                      <DatePicker />
                    </Form.Item>

                    <Form.Item<FieldType>
                      label="Giới tính"
                      name="gender"
                      rules={[
                        { required: true, message: 'Vui lòng chọn giới tính!' },
                      ]}
                    >
                      <Select>
                        <Select.Option value="Male">Nam</Select.Option>
                        <Select.Option value="Female">Nữ</Select.Option>
                        <Select.Option value="Other">Khác</Select.Option>
                      </Select>
                    </Form.Item>

                    <Form.Item<FieldType>
                      label="Thành phố đang sống"
                      name="province_id"
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng chọn thành phố!',
                        },
                      ]}
                    >
                      <Select>
                        {provinces.map((item) => (
                          <Select.Option
                            key={`province_${item.id}`}
                            value={item.id}
                          >
                            {item.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl text-[var(--primary-color)] mt-12">
                    Kinh nghiệp thực tế
                  </h4>
                  <div className="mt-3">
                    <Form.Item<FieldType>
                      label="Kinh nghiệm"
                      name="level"
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng nhập kinh nghiệp!',
                        },
                      ]}
                    >
                      <Select>
                        <Select.Option value="Internship">
                          Internship
                        </Select.Option>
                        <Select.Option value="Fresher">Fresher</Select.Option>
                        <Select.Option value="Junior">Junior</Select.Option>
                        <Select.Option value="Middle">Middle</Select.Option>
                        <Select.Option value="Senior">Senior</Select.Option>
                        <Select.Option value="Expert">Expert</Select.Option>
                        <Select.Option value="Manager">Manager</Select.Option>
                        <Select.Option value="Chief">Chief</Select.Option>
                      </Select>
                    </Form.Item>

                    <Form.Item<FieldType>
                      label="Học vấn"
                      name="education"
                      rules={[
                        { required: true, message: 'Vui lòng nhập học vấn!' },
                      ]}
                    >
                      <Select>
                        <Select.Option value="Unskill">Unskill</Select.Option>
                        <Select.Option value="Junior">Junior</Select.Option>
                        <Select.Option value="Intermediate">
                          Intermediate
                        </Select.Option>
                        <Select.Option value="College">College</Select.Option>
                        <Select.Option value="Bachelor">Bachelor</Select.Option>
                        <Select.Option value="Engineer">Engineer</Select.Option>
                        <Select.Option value="Master">Master</Select.Option>
                        <Select.Option value="PhD">PhD</Select.Option>
                      </Select>
                    </Form.Item>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl text-[var(--primary-color)] mt-12">
                    Mong muốn của bạn
                  </h4>
                  <div className="mt-3">
                    <Form.Item<FieldType>
                      label="Ngành nghề"
                      name="occupation_ids"
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng chọn ngành nghề!',
                        },
                      ]}
                    >
                      <Select mode="multiple">
                        {occupations.map((item) => (
                          <Select.Option
                            key={`occupation_${item.id}`}
                            value={item.id}
                          >
                            {item.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>

                    <Form.Item<FieldType>
                      label="Địa điểm làm việc"
                      name="work_province_ids"
                      rules={[
                        { required: true, message: 'Vui lòng chọn thành phố!' },
                      ]}
                    >
                      <Select mode="multiple">
                        {provinces.map((item) => (
                          <Select.Option
                            key={`province_${item.id}`}
                            value={item.id}
                          >
                            {item.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>

                    <Form.Item<FieldType>
                      label="Loại hình công việc"
                      name="work_arrangement"
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng chọn loại hình công việc!',
                        },
                      ]}
                    >
                      <Select>
                        <Select.Option value="Fulltime">Fulltime</Select.Option>
                        <Select.Option value="Parttime">Parttime</Select.Option>
                        <Select.Option value="Hybrid">Hybrid</Select.Option>
                        <Select.Option value="Remote">Remote</Select.Option>
                        <Select.Option value="Flex">Flex</Select.Option>
                        <Select.Option value="Shift">Shift</Select.Option>
                        <Select.Option value="Freelance">
                          Freelance
                        </Select.Option>
                      </Select>
                    </Form.Item>

                    <Form.Item<FieldType>
                      label="Mức lương"
                      name="salary"
                      rules={[
                        { required: true, message: 'Vui lòng chọn mức lương!' },
                      ]}
                    >
                      <Select>
                        <Select.Option value={null}>Thương lượng</Select.Option>
                        <Select.Option value="1000000-3000000">
                          1-3 triệu
                        </Select.Option>
                        <Select.Option value="3000000-5000000">
                          3-5 triệu
                        </Select.Option>
                        <Select.Option value="5000000-7000000">
                          5-7 triệu
                        </Select.Option>
                        <Select.Option value="7000000-10000000">
                          7-10 triệu
                        </Select.Option>
                        <Select.Option value="10000000-15000000">
                          10-15 triệu
                        </Select.Option>
                      </Select>
                    </Form.Item>

                    <Form.Item<FieldType>
                      label="Cấp bậc mong muốn"
                      name="expect_level"
                      rules={[
                        { required: true, message: 'Vui lòng chọn cấp bậc!' },
                      ]}
                    >
                      <Select>
                        <Select.Option value="Internship">
                          Internship
                        </Select.Option>
                        <Select.Option value="Fresher">Fresher</Select.Option>
                        <Select.Option value="Junior">Junior</Select.Option>
                        <Select.Option value="Middle">Middle</Select.Option>
                        <Select.Option value="Senior">Senior</Select.Option>
                        <Select.Option value="Expert">Expert</Select.Option>
                        <Select.Option value="Manager">Manager</Select.Option>
                        <Select.Option value="Chief">Chief</Select.Option>
                      </Select>
                    </Form.Item>
                  </div>
                </div>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button
                    size="large"
                    style={{
                      backgroundColor: 'var(--primary-color)',
                      padding: '6px 36px 8px 36px',
                      marginTop: 16,
                    }}
                    type="primary"
                    htmlType="submit"
                  >
                    <span className="text-white">Submit</span>
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
          <div className="col-span-1">
            <div className="pt-3">
              <SidebarRight />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicantProfile;
