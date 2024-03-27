import { Switch } from 'antd';
import Link from 'next/link';
import { FC } from 'react';
import './style.css';

export interface ISidebarRightProps {
  status: boolean;
  onChangingStatus: (status: boolean) => void;
}

const SidebarRight: FC<ISidebarRightProps> = ({ status, onChangingStatus }) => {
  return (
    <div>
      <div>
        <div className="flex items-center">
          <Switch checked={status} onChange={onChangingStatus} />
          <span className="font-semibold ml-4">Cho phép NTD liên hệ bạn</span>
        </div>
        <p className="mt-4 opacity-50">
          Bật để cho phép các đơn vị tuyển dụng uy tin, Headhunter đã được
          Timviec xác thực xem CV Online của bạn.
        </p>
      </div>
      <div className="mt-6">
        <p className="font-semibold">CV của bạn đã đủ hấp dẫn?</p>
        <p className="mt-2 opacity-50">
          Khám phá các mẫu CV để ấn tượng nhà tuyển dụng ngay từ lần đầu tiên
        </p>
        <Link className="underline text-[var(--primary-color)]" href="/resumes">
          Khám phá ngay!
        </Link>
      </div>
    </div>
  );
};

export default SidebarRight;
