'use client';
import { Pagination as AntPagination } from 'antd';

import { FC } from 'react';

export interface IPaginationProps {
  currentItem: number;
  totalPage: number;
  onPageChange?: () => void;
}
const Pagination: FC<IPaginationProps> = ({
  currentItem = 1,
  totalPage,
  onPageChange,
}) => {
  return (
    <div>
      <AntPagination
        size="small"
        onChange={onPageChange}
        defaultCurrent={currentItem}
        total={totalPage}
      />
    </div>
  );
};

export default Pagination;
