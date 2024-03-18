'use client';

import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';

export interface ISearchCompanyProps {}
const SearchCompany: FC<ISearchCompanyProps> = () => {
  const router = useRouter();
  const [value, setValue] = useState('');

  const handleSearchChange = (e: any) => {
    setValue(e.target.value);
  };

  const handleSubmit = () => {
    router.replace(`/companies?search=${value}`);
  };

  return (
    <div>
      <div className="flex">
        <input
          className="flex-grow p-2 border rounded"
          placeholder="Nhập tên công ty muốn tìm"
          onChange={handleSearchChange}
        />
        <button
          onClick={handleSubmit}
          className="ml-1 bg-[var(--primary-color)] text-white px-4 rounded"
        >
          Tìm kiếm
        </button>
      </div>
    </div>
  );
};

export default SearchCompany;
