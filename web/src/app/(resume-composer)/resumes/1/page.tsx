/* eslint-disable @next/next/no-img-element */
'use client';
import ResumeSubmitForm from '@/components/resume/composer/ResumeSubmitForm';
import useQueryParams from '@/hooks/useQueryParams';
import { ResumeTemplateModel } from '@/models/resume.model';
import { resumeService } from '@/services/resume.service';
import { uploadService } from '@/services/upload.service';
import { notification } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import { CiCamera } from 'react-icons/ci';
import { MdOutlineDone } from 'react-icons/md';
import '../../../globals.css';

export interface ICreateResumePageProps {}

const CreateResumePage: FC<ICreateResumePageProps> = () => {
  const { queryParams } = useQueryParams<{ edit: string }>();
  const [submitFormVisible, setSubmitFormVisible] = useState<boolean>(false);
  const [personalInfo, setPersonalInfo] = useState<any>({});
  const [objective, setObjective] = useState<string>('');
  const [expierences, setExpierences] = useState<any[]>([{}]);
  const [education, setEducation] = useState<any>({});
  const [projects, setProjects] = useState<any[]>([{}]);
  const [certificates, setCertificates] = useState<any[]>([{}]);
  const [reference, setReference] = useState<string>('');
  const [skills, setSkills] = useState<string>('');
  const [isPreview, setIsPreview] = useState<boolean>(false);
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [file, setFile] = useState<File>();
  const [initTitle, setInitTitle] = useState<string>('');
  const [resumes, setResumes] = useState<ResumeTemplateModel[]>([]);

  const toggleSubmitForm = (flag: boolean) => {
    setSubmitFormVisible(flag);
  };

  const togglePreview = () => {
    setIsPreview(!isPreview);
    window.scrollTo(0, 0);
  };

  const handleObjectiveChange = (value: string) => {
    setObjective(value);
  };

  const addMoreExpierence = () => {
    setExpierences([...expierences, {}]);
  };

  const handlePersonalInfoChange = (e: any) => {
    setPersonalInfo({
      ...personalInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleExpierenceChange = (index: number) => {
    return (e: any) => {
      const newExpierences = expierences.map((item, i) => {
        if (i === index) {
          return {
            ...item,
            [e.target.name]: e.target.value,
          };
        }
        return item;
      });
      setExpierences(newExpierences);
    };
  };

  const handleDeleteExpierence = (index: number) => {
    const newExpierences = expierences.filter((item, i) => i !== index);
    setExpierences(newExpierences);
  };

  const handleEducationChange = (e: any) => {
    setEducation({
      ...education,
      [e.target.name]: e.target.value,
    });
  };

  const addMoreCertificate = () => {
    setCertificates([...certificates, {}]);
  };

  const addMoreProject = () => {
    setProjects([...projects, {}]);
  };

  const handleCertificateChange = (index: number) => {
    return (e: any) => {
      const newCertificates = certificates.map((item, i) => {
        if (i === index) {
          return {
            ...item,
            [e.target.name]: e.target.value,
          };
        }
        return item;
      });
      setCertificates(newCertificates);
    };
  };

  const handleDeleteCertificate = (index: number) => {
    const newCertificates = certificates.filter((item, i) => i !== index);
    setCertificates(newCertificates);
  };

  const handleProjectChange = (index: number) => {
    return (e: any) => {
      const newProjects = projects.map((item, i) => {
        if (i === index) {
          return {
            ...item,
            [e.target.name]: e.target.value,
          };
        }
        return item;
      });
      setProjects(newProjects);
    };
  };

  const handleDeleteProject = (index: number) => {
    const newProjects = projects.filter((item, i) => i !== index);
    setProjects(newProjects);
  };

  const handleSkillChange = (e: any) => {
    setSkills(e.target.value);
  };

  const handleReferenceChange = (e: any) => {
    setReference(e.target.value);
  };

  const handleSubmit = async (name: string) => {
    const data: any = {
      personalInfo,
      objective,
      expierences,
      education,
      projects,
      certificates,
      reference,
      skills,
    };

    if (file) {
      try {
        const response = await uploadService.uploadFile(file);
        if (response.success) {
          data.personalInfo = {
            ...data.personalInfo,
            avatar: response.data.url,
          };
        }
      } catch (error) {
        notification.error({
          message: 'Lỗi',
          description: 'Có lỗi xảy ra khi tải ảnh lên',
        });
      }
    }

    if (queryParams.edit) {
      resumeService
        .update(+queryParams.edit, {
          name: name,
          information: JSON.stringify(data),
        })
        .then((res) => {
          if (res.success) {
            toggleSubmitForm(false);
            notification.success({
              message: 'Lưu thành công',
              description: 'Mẫu CV của bạn đã được lưu thành công',
            });

            setTimeout(() => {
              window.location.replace(
                `${window.location.origin}/resumes/1/${queryParams.edit}`,
              );
            }, 1000);
          }
        });
    } else {
      resumeService
        .create({
          name: name,
          template_id: 1,
          information: JSON.stringify(data),
        })
        .then((res) => {
          if (res.success) {
            toggleSubmitForm(false);
            notification.success({
              message: 'Lưu thành công',
              description: 'Mẫu CV của bạn đã được lưu thành công',
            });

            setTimeout(() => {
              window.location.replace(
                `${window.location.origin}/resumes/1/${res.data.id}`,
              );
            }, 1000);
          }
        });
    }
  };

  const handleSubmitClick = () => {
    toggleSubmitForm(true);
  };

  const handlePreviewAvatar = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
    setFile(file);
  };

  const fetchEditData = async (id: number) => {
    try {
      const response = await resumeService.getOne(id);
      if (response.success) {
        const data = JSON.parse(response.data.information);
        setPersonalInfo(data.personalInfo);
        setObjective(data.objective);
        setExpierences(data.expierences);
        setEducation(data.education);
        setProjects(data.projects);
        setCertificates(data.certificates);
        setReference(data.reference);
        setSkills(data.skills);
        setInitTitle(response.data.name);
        setAvatarUrl(data.personalInfo.avatar);
      }
    } catch (error) {
      notification.error({
        message: 'Lỗi',
        description: 'Có lỗi xảy ra khi tải dữ liệu',
      });
    }
  };

  useEffect(() => {
    if (queryParams.edit) {
      document.title = 'Sửa CV';
      fetchEditData(Number(queryParams.edit));
    } else document.title = 'Tạo CV online';
  }, [queryParams.edit]);

  useEffect(() => {
    resumeService.getTemplatesClient().then((response) => {
      if (response.success) {
        setResumes(response.data);
      }
    });
  }, []);

  const resume = resumes?.find((item) => item.id === 1);

  return (
    <div>
      <div className="container mx-auto">
        <ResumeSubmitForm
          visible={submitFormVisible}
          onClose={() => toggleSubmitForm(false)}
          onSubmitted={handleSubmit}
          initTitle={initTitle}
        />
        <div className="relative flex gap-x-4 py-4 justify-center">
          <div className="w-2/3 relative">
            {(!isPreview && (
              <h1 className="py-2 text-center bg-gray-100 font-semibold">
                {initTitle || resume?.name}
              </h1>
            )) || (
              <div className="sticky top-0 w-full flex">
                <button
                  className="w-1/2 text-white py-2 bg-[var(--primary-color)]"
                  onClick={togglePreview}
                >
                  Tiếp tục chỉnh sửa
                </button>
                <button
                  className="w-1/2 text-white py-2 bg-blue-500"
                  onClick={handleSubmitClick}
                >
                  Sử dụng mẫu này
                </button>
              </div>
            )}
            <div>
              <div>
                <div className="w-full h-full flex justify-center items-center">
                  <div className="bg-gray-50 px-2 w-full pt-10 border rounded">
                    <div className="flex justify-between items-center px-3 pt-8 pb-4 mb-4 bg-slate-800">
                      <div>
                        <div className="text-white text-3xl font-bold">
                          <input
                            disabled={isPreview}
                            placeholder={'Họ và tên'}
                            onChange={handlePersonalInfoChange}
                            value={personalInfo?.name}
                            className="bg-transparent w-full block"
                            name="name"
                          />
                        </div>
                        <div className="text-white mt-2 flex">
                          Ngày sinh:
                          <div className="">
                            <input
                              disabled={isPreview}
                              className="bg-transparent ml-1 min-w-[120px]"
                              placeholder={'dd/mm/yyyy'}
                              max={10}
                              onChange={handlePersonalInfoChange}
                              name="dob"
                              value={personalInfo?.dob}
                            />
                          </div>
                        </div>
                        <p className="text-white mt-1">
                          Email:{' '}
                          <input
                            disabled={isPreview}
                            className="bg-transparent ml-1"
                            placeholder={'sample@email.com'}
                            onChange={handlePersonalInfoChange}
                            name="email"
                            value={personalInfo?.email}
                          />
                        </p>
                        <p className="text-white mt-1">
                          Địa chỉ:{' '}
                          <input
                            disabled={isPreview}
                            className="bg-transparent ml-1"
                            placeholder={'123A, Street, City'}
                            name="address"
                            onChange={handlePersonalInfoChange}
                            value={personalInfo?.address}
                          />
                        </p>
                      </div>
                      <div className="relative w-32 h-32 rounded-full overflow-hidden">
                        <img
                          src={
                            avatarUrl ||
                            `https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png`
                          }
                          alt="Avatar"
                          className="w-full h-full object-cover scale-[1.2]"
                        />
                        {!isPreview && (
                          <label
                            htmlFor="uploadfile"
                            className="absolute cursor-pointer m-2 bottom-0 translate-x-[-8px] translate-y-[8px] py-1 z-10 bg-gray-400 w-full flex justify-center opacity-70"
                          >
                            <CiCamera size={24} color="white" />
                          </label>
                        )}
                        <input
                          id="uploadfile"
                          type="file"
                          accept="image/*"
                          name="resume_avatar"
                          className="hidden"
                          onChange={handlePreviewAvatar}
                          disabled={isPreview}
                        />
                      </div>
                    </div>
                    <div className="px-3">
                      <h2 className="text-2xl font-bold mb-2 text-gray-800">
                        Mục tiêu nghề nghiệp
                      </h2>
                      <div className="text-lg text-gray-700">
                        <TextArea
                          size="large"
                          style={{
                            padding: 0,
                          }}
                          placeholder={
                            'VD: Xây dựng và phát triển sự nghiệp trong lĩnh vực [lĩnh vực của bạn], thông qua việc áp dụng kiến thức, kỹ năng và trải nghiệm của mình để đóng góp vào sự thành công của tổ chức. Tôi tập trung vào việc phát triển kỹ năng lãnh đạo, quản lý thời gian hiệu quả và xây dựng mối quan hệ đồng đội mạnh mẽ, từ đó đạt được mục tiêu cá nhân và tổ chức, và dẫn đầu trong việc sáng tạo và đổi mới'
                          }
                          bordered={false}
                          autoSize
                          value={objective}
                          onChange={(e) =>
                            handleObjectiveChange(e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <hr className="my-4" />
                    <div className="mt-6 px-3">
                      <h2 className="text-2xl font-bold mb-2 text-gray-800">
                        Học vấn
                      </h2>
                      <div className="flex justify-between items-center border-gray-300 pb-2">
                        <div>
                          <p className="text-gray-700 font-semibold flex gap-x-1">
                            Tên trường:{' '}
                            <input
                              disabled={isPreview}
                              className="bg-transparent ml-1 flex-grow inline-block"
                              placeholder="Tên trường đại học / cao đẳng"
                              name="school"
                              value={education?.school}
                              onChange={handleEducationChange}
                            />
                          </p>
                          <p className="text-gray-600">
                            <input
                              disabled={isPreview}
                              className="bg-transparent lex-grow min-w-[400px] inline-block"
                              placeholder="Tên chương trình / chứng chỉ / ngành nghề"
                              onChange={handleEducationChange}
                              name="program"
                              value={education?.program}
                            />
                          </p>
                        </div>
                        <p className="text-gray-600">
                          <input
                            disabled={isPreview}
                            className="bg-transparent flex-grow inline-block text-right"
                            placeholder="mm/yyyy - mm/yyyy"
                            onChange={handleEducationChange}
                            name="date"
                            value={education?.date}
                          />
                        </p>
                      </div>
                    </div>
                    <hr className="my-4" />
                    <div className="mt-6 px-3">
                      <h2 className="text-2xl font-bold mb-2 text-gray-800">
                        Kỹ năng
                      </h2>
                      <input
                        disabled={isPreview}
                        className="bg-transparent lex-grow min-w-[400px] inline-block"
                        placeholder="VD: Java, Amazon Web Service, System monitoring,..."
                        onChange={handleSkillChange}
                        value={skills}
                      />
                    </div>
                    <hr className="my-4" />
                    <div className="mt-6 px-3">
                      <h2 className="text-2xl font-bold mb-2 text-gray-800">
                        Kinh nghiệm làm việc
                      </h2>
                      {expierences.map((expierence, index) => {
                        return (
                          <div
                            key={index}
                            className="flex justify-between items-center pb-2 mb-4"
                          >
                            <div>
                              <div className="text-gray-700 font-semibold">
                                <input
                                  disabled={isPreview}
                                  className="bg-transparent lex-grow min-w-[400px] inline-block"
                                  placeholder="Tên công ty"
                                  name="company"
                                  onChange={handleExpierenceChange(index)}
                                  value={expierence?.company}
                                />
                              </div>
                              <input
                                disabled={isPreview}
                                className="mt-1 text-gray-600 bg-transparent lex-grow min-w-[400px] inline-block"
                                placeholder="Vị trí đảm nhiệm"
                                onChange={handleExpierenceChange(index)}
                                name="position"
                                value={expierence?.position}
                              />
                            </div>
                            <p className="text-gray-600 ml-auto">
                              <input
                                disabled={isPreview}
                                className="bg-transparent flex-grow inline-block text-right"
                                placeholder="mm/yyyy - mm/yyyy"
                                onChange={handleExpierenceChange(index)}
                                name="date"
                                value={expierence?.date}
                              />
                            </p>
                            <button
                              onClick={() => handleDeleteExpierence(index)}
                              className="text-red-400 text-4xl ml-4"
                              hidden={isPreview}
                            >
                              -
                            </button>
                          </div>
                        );
                      })}
                      <div>
                        <button
                          className="py-2 w-full bg-gray-300"
                          onClick={addMoreExpierence}
                          hidden={isPreview}
                        >
                          Thêm
                        </button>
                      </div>
                    </div>
                    <hr className="my-4" />
                    <div className="mt-6 px-3">
                      <h2 className="text-2xl font-bold mb-2 text-gray-800">
                        Dự án tham gia
                      </h2>
                      {projects.map((project, index) => {
                        return (
                          <div
                            key={index}
                            className="flex justify-between items-center pb-2"
                          >
                            <div>
                              <div className="text-gray-700 font-semibold">
                                <input
                                  disabled={isPreview}
                                  className="bg-transparent lex-grow min-w-[400px] inline-block"
                                  placeholder="Tên dự án"
                                  name="name"
                                  onChange={handleProjectChange(index)}
                                  value={project?.name}
                                />
                              </div>
                              <input
                                disabled={isPreview}
                                className="mt-1 text-gray-600 bg-transparent lex-grow min-w-[400px] inline-block"
                                placeholder="Mô tả dự án"
                                name="description"
                                onChange={handleProjectChange(index)}
                                value={project?.description}
                              />
                            </div>
                            <button
                              className="ml-auto text-red-400 text-4xl"
                              hidden={isPreview}
                              onClick={() => handleDeleteProject(index)}
                            >
                              -
                            </button>
                          </div>
                        );
                      })}
                      <div>
                        <button
                          className="py-2 w-full bg-gray-300"
                          hidden={isPreview}
                          onClick={addMoreProject}
                        >
                          Thêm
                        </button>
                      </div>
                    </div>
                    <hr className="my-4" />
                    <div className="mt-6 px-3">
                      <h2 className="text-2xl font-bold mb-2 text-gray-800">
                        Chứng chỉ
                      </h2>
                      {certificates.map((certificate, index) => {
                        return (
                          <div
                            key={index}
                            className="flex justify-between items-center pb-2"
                          >
                            <div>
                              <div className="text-gray-700 font-semibold">
                                <input
                                  disabled={isPreview}
                                  className="bg-transparent lex-grow min-w-[400px] inline-block"
                                  placeholder="Tên chứng chỉ"
                                  name="name"
                                  onChange={handleCertificateChange(index)}
                                  value={certificate?.name}
                                />
                              </div>
                              <input
                                disabled={isPreview}
                                className="mt-1 text-gray-600 bg-transparent lex-grow min-w-[400px] inline-block"
                                placeholder="Mô tả chứng chỉ"
                                name="description"
                                onChange={handleCertificateChange(index)}
                                value={certificate?.description}
                              />
                            </div>
                            <button
                              className="ml-auto text-red-400 text-4xl"
                              hidden={isPreview}
                              onClick={() => handleDeleteCertificate(index)}
                            >
                              -
                            </button>
                          </div>
                        );
                      })}
                      <div>
                        <button
                          className="py-2 w-full bg-gray-300"
                          hidden={isPreview}
                          onClick={addMoreCertificate}
                        >
                          Thêm
                        </button>
                      </div>
                    </div>
                    <hr className="my-4" />
                    <div className="mt-6 px-3">
                      <h2 className="text-2xl font-bold mb-2 text-gray-800">
                        Người giới thiệu
                      </h2>
                      <div className="flex justify-between items-center pb-2">
                        <div>
                          <input
                            disabled={isPreview}
                            className="mt-1 text-gray-600 bg-transparent lex-grow min-w-[400px] inline-block"
                            placeholder="Tên người giới thiệu"
                            onChange={handleReferenceChange}
                            value={reference}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="my-6 px-3 text-right">
                      Copyright by Techomies
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {!isPreview && (
            <div className="sticky top-0 w-1/3">
              <div className="flex w-full gap-x-1">
                <button
                  className="w-1/2 text-white py-2 rounded bg-blue-500"
                  onClick={togglePreview}
                >
                  Xem trước
                </button>
                <button
                  className="w-1/2 text-white py-2 rounded bg-[var(--primary-color)]"
                  onClick={handleSubmitClick}
                >
                  Lưu
                </button>
              </div>
              <div>
                <ul className="mt-4">
                  <li className="flex items-center gap-x-1">
                    <MdOutlineDone />
                    Phù hợp cho đối tượng Fresher, Junior
                  </li>
                  <li className="flex items-center gap-x-1 mt-1">
                    <MdOutlineDone />
                    Có thể sử dụng để ứng tuyển Developer, tester, BA,...
                  </li>
                  <li className="flex items-center gap-x-1 mt-1">
                    <MdOutlineDone />
                    Phong cách tối giản, chuyên nghiệp
                  </li>
                </ul>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold mb-2 text-gray-800">
                  Mẫu CV khác
                </h3>
                <div className="flex gap-x-2">
                  {resumes
                    .filter((item) => item.id !== 1)
                    .map((item) => {
                      return (
                        <Link href={`/resumes/${item.id}`} key={item.id}>
                          <div key={item.id} className="relative">
                            <img
                              src={item.thumbnail}
                              alt={item.name}
                              className="w-full h-40 object-cover rounded aspect-[3/4]"
                            />
                            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                              <span className="text-white text-center font-bold">
                                {item.name}
                              </span>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default CreateResumePage;
