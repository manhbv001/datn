/* eslint-disable @next/next/no-img-element */
'use client';
import { ResumeModel } from '@/models/resume.model';
import { resumeService } from '@/services/resume.service';
import TextArea from 'antd/es/input/TextArea';
import * as htmlToImage from 'html-to-image';
import jsPDF from 'jspdf';
import { FC, useEffect, useState } from 'react';
import { IoIosPrint, IoMdDownload } from 'react-icons/io';
import '../../../../globals.css';

export interface IViewResumePageProps {
  params: {
    id: string;
  };
}

const ViewResumePage: FC<IViewResumePageProps> = ({ params }) => {
  const [data, setData] = useState<ResumeModel | undefined>();
  const { id } = params;
  const [avatar, setAvatar] = useState<string | undefined>();

  useEffect(() => {
    if (!id) return;

    resumeService.getOne(+id).then((res) => {
      if (res.success) setData(res.data);
    });
  }, [id]);

  const blobToBase64 = (blob: Blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise((rs, rj) => {
      reader.onloadend = () => {
        rs(reader.result);
      };
      reader.onerror = rj;
    });
  };

  const {
    personalInfo,
    objective,
    expierences,
    education,
    projects,
    certificates,
    reference,
    skills,
  } = (data && JSON.parse(data.information)) || {};

  useEffect(() => {
    const imageToBase64 = async (url: string) => {
      const r = await fetch(url);
      const blob = await r.blob();
      const base64 = await blobToBase64(blob);
      setAvatar(base64 as string);
    };

    document.title = 'Xem CV';
    if (personalInfo?.avatar) imageToBase64(personalInfo?.avatar);
  }, [personalInfo, setAvatar]);

  if (!data) return null;

  const handleDownloadPDFCv = () => {
    const element = document.getElementById('cv');
    if (!element) return;

    htmlToImage
      .toPng(element, {
        fetchRequestInit: {
          mode: 'no-cors',
        },
      })
      .then(function (dataUrl) {
        console.log(dataUrl);
        const pdf = new jsPDF();
        pdf.addImage({
          imageData: dataUrl,
          format: 'PNG',
          x: 0,
          y: 0,
          width: 210,
          height: 297,
        });
        pdf.save('download.pdf');
      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error);
      });
  };

  return (
    <div>
      <div className="container mx-auto">
        <div className="relative flex gap-x-4 py-4 justify-center">
          <div className="w-2/3 relative">
            <div className="sticky top-0 w-full flex">
              <button
                onClick={handleDownloadPDFCv}
                className="w-1/2 text-white py-2 bg-[var(--primary-color)] flex justify-center items-center gap-x-1"
              >
                Tải xuống <IoMdDownload />
              </button>
              <button className="w-1/2 text-white py-2 bg-blue-500 flex justify-center items-center gap-x-1">
                In CV
                <IoIosPrint />
              </button>
            </div>
            <div>
              <div id="cv">
                <div className="w-full h-full flex justify-center items-center">
                  <div className="bg-gray-50 px-2 w-full pt-10 border rounded">
                    <div className="flex justify-between items-center px-3 pt-8 pb-4 mb-4 bg-slate-800">
                      <div>
                        <div className="text-white text-3xl font-bold">
                          <input
                            disabled={true}
                            className="bg-transparent w-full"
                            name="name"
                            value={personalInfo?.name}
                          />
                        </div>
                        <div className="text-white mt-2 flex">
                          Ngày sinh:
                          <div className="">
                            <input
                              disabled={true}
                              className="bg-transparent ml-1 min-w-[120px]"
                              value={personalInfo?.dob}
                            />
                          </div>
                        </div>
                        <p className="text-white mt-1">
                          Email:{' '}
                          <input
                            disabled={true}
                            className="bg-transparent ml-1"
                            value={personalInfo?.email}
                          />
                        </p>
                        <p className="text-white mt-1">
                          Địa chỉ:{' '}
                          <input
                            disabled={true}
                            value={personalInfo?.address}
                            className="bg-transparent ml-1"
                          />
                        </p>
                      </div>
                      <img
                        src={
                          avatar ||
                          'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
                        }
                        alt="Avatar"
                        className="w-32 h-32 rounded-full object-cover"
                      />
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
                          bordered={false}
                          autoSize
                          value={objective}
                          disabled={true}
                          styles={{ textarea: { color: 'black' } }}
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
                              disabled={true}
                              className="bg-transparent ml-1 flex-grow inline-block"
                              value={education?.school}
                            />
                          </p>
                          <p className="text-gray-600">
                            <input
                              disabled={true}
                              className="bg-transparent lex-grow min-w-[400px] inline-block"
                              value={education?.program}
                            />
                          </p>
                        </div>
                        <p className="text-gray-600">
                          <input
                            disabled={true}
                            className="bg-transparent flex-grow inline-block text-right"
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
                        disabled={true}
                        className="bg-transparent lex-grow min-w-[400px] inline-block"
                        value={skills}
                      />
                    </div>
                    <hr className="my-4" />
                    <div className="mt-6 px-3">
                      <h2 className="text-2xl font-bold mb-2 text-gray-800">
                        Kinh nghiệm làm việc
                      </h2>
                      {expierences.map((expierence: any, index: number) => {
                        return (
                          <div
                            key={index}
                            className="flex justify-between items-center pb-2 mb-4"
                          >
                            <div>
                              <div className="text-gray-700 font-semibold">
                                <input
                                  disabled={true}
                                  className="bg-transparent lex-grow min-w-[400px] inline-block"
                                  value={expierence?.company}
                                />
                              </div>
                              <input
                                disabled={true}
                                className="mt-1 text-gray-600 bg-transparent lex-grow min-w-[400px] inline-block"
                                value={expierence?.position}
                              />
                            </div>
                            <p className="text-gray-600 ml-auto">
                              <input
                                disabled={true}
                                value={expierence?.date}
                                className="bg-transparent flex-grow inline-block text-right"
                              />
                            </p>
                          </div>
                        );
                      })}
                    </div>
                    <hr className="my-4" />
                    <div className="mt-6 px-3">
                      <h2 className="text-2xl font-bold mb-2 text-gray-800">
                        Dự án tham gia
                      </h2>
                      {projects.map((project: any, index: number) => {
                        return (
                          <div
                            key={index}
                            className="flex justify-between items-center pb-2"
                          >
                            <div>
                              <div className="text-gray-700 font-semibold">
                                <input
                                  disabled={true}
                                  className="bg-transparent lex-grow min-w-[400px] inline-block"
                                  value={project?.name}
                                />
                              </div>
                              <input
                                disabled={true}
                                className="mt-1 text-gray-600 bg-transparent lex-grow min-w-[400px] inline-block"
                                value={project?.description}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <hr className="my-4" />
                    <div className="mt-6 px-3">
                      <h2 className="text-2xl font-bold mb-2 text-gray-800">
                        Chứng chỉ
                      </h2>
                      {certificates.map((certificate: any, index: number) => {
                        return (
                          <div
                            key={index}
                            className="flex justify-between items-center pb-2"
                          >
                            <div>
                              <div className="text-gray-700 font-semibold">
                                <input
                                  disabled={true}
                                  className="bg-transparent lex-grow min-w-[400px] inline-block"
                                  value={certificate?.name}
                                />
                              </div>
                              <input
                                disabled={true}
                                className="mt-1 text-gray-600 bg-transparent lex-grow min-w-[400px] inline-block"
                                value={certificate?.description}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <hr className="my-4" />
                    <div className="mt-6 px-3">
                      <h2 className="text-2xl font-bold mb-2 text-gray-800">
                        Người giới thiệu
                      </h2>
                      <div className="flex justify-between items-center pb-2">
                        <div>
                          <input
                            disabled={true}
                            className="mt-1 text-gray-600 bg-transparent lex-grow min-w-[400px] inline-block"
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
        </div>
      </div>
    </div>
  );
};
export default ViewResumePage;
