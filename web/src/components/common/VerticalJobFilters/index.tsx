'use client';

import {
  JOB_ARRANGEMENTS,
  JOB_LEVELS,
  SALARY_RANGES,
} from '@/constants/job.constant';
import { OccupationModel } from '@/models/occupation.model';
import { ProvinceModel } from '@/models/province.model';
import { occupationService } from '@/services/occupation.service';
import { provinceService } from '@/services/province.service';
import { formatNumberWithUnit } from '@/utils/number.util';
import { toQueryParams } from '@/utils/queryParams';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';

export interface IVerticalJobFiltersProps {}

const VerticalJobFilters: FC<IVerticalJobFiltersProps> = () => {
  const router = useRouter();
  const [occupations, setOccupations] = useState<OccupationModel[]>([]);
  const [provinces, setProvinces] = useState<ProvinceModel[]>([]);

  const getOccupations = () => {
    occupationService
      .getAll()
      .then((response) => {
        setOccupations(response.data);
      })
      .catch(console.log);
  };

  const getProvinces = () => {
    provinceService
      .getAll()
      .then((response) => {
        setProvinces(response.data);
      })
      .catch(console.log);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = {
      occupation_id: formData.get('occupation_id'),
      province_id: formData.get('province_id'),
      level: formData.get('level'),
      salary_range: formData.get('salary_range'),
      arrangement: formData.get('arrangement'),
    };
    const queryString = toQueryParams(payload);
    router.replace(`/jobs${queryString}`);
  };

  useEffect(() => {
    getOccupations();
    getProvinces();
  }, []);

  return (
    <div>
      <div className="bg-white p-6 rounded shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="occupation"
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              Ngành nghề
            </label>
            <div className="relative">
              <select
                id="occupation"
                name="occupation_id"
                className="appearance-none w-full border rounded-md py-2 pl-3 pr-10 leading-5 bg-white border-gray-300 focus:outline-none focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              >
                <option disabled selected>
                  Chọn ngành nghề
                </option>
                {occupations.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  ></path>
                </svg>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="province"
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              Thành phố
            </label>
            <div className="relative">
              <select
                id="province"
                name="province_id"
                className="appearance-none w-full border rounded-md py-2 pl-3 pr-10 leading-5 bg-white border-gray-300 focus:outline-none focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              >
                <option disabled selected>
                  Chọn thành phố
                </option>
                {provinces.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  ></path>
                </svg>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="level"
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              Vị trí
            </label>
            <div className="relative">
              <select
                id="level"
                name="level"
                className="appearance-none w-full border rounded-md py-2 pl-3 pr-10 leading-5 bg-white border-gray-300 focus:outline-none focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              >
                <option disabled selected>
                  Chọn vị trí
                </option>
                {JOB_LEVELS.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  ></path>
                </svg>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="salary_range"
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              Mức lương
            </label>
            <div className="relative">
              <select
                id="salary_range"
                name="salary_range"
                className="appearance-none w-full border rounded-md py-2 pl-3 pr-10 leading-5 bg-white border-gray-300 focus:outline-none focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              >
                <option disabled selected>
                  Chọn mức lương
                </option>
                {SALARY_RANGES.map((item) => (
                  <option
                    key={`${item.from}${item.to}`}
                    value={`${item.from}-${item.to}`}
                  >
                    {formatNumberWithUnit(item.from)} -{' '}
                    {formatNumberWithUnit(item.to)}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  ></path>
                </svg>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="arrangement"
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              Loại hình công việc
            </label>
            <div className="relative">
              <select
                id="arrangement"
                name="arrangement"
                className="appearance-none w-full border rounded-md py-2 pl-3 pr-10 leading-5 bg-white border-gray-300 focus:outline-none focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              >
                <option disabled selected>
                  Chọn loại hình công việc
                </option>
                {JOB_ARRANGEMENTS.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  ></path>
                </svg>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[var(--primary-color)] hover:bg-primary-dark focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-50"
            >
              Tìm kiếm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerticalJobFilters;
