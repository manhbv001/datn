import { formatNumberWithUnit } from '@/utils/number.util';
import { FC } from 'react';
import { GrView } from 'react-icons/gr';

export interface IViewCountProps {
  count: number;
}
const ViewCount: FC<IViewCountProps> = ({ count }) => {
  return (
    <div className="inline-block">
      <span className="inline-flex gap-1 items-center text-gray-400">
        <GrView
          style={{
            opacity: 0.4,
            color: 'var(--text-gray-color)',
            display: 'inline-block',
          }}
        />

        {formatNumberWithUnit(count)}
      </span>
    </div>
  );
};

export default ViewCount;
