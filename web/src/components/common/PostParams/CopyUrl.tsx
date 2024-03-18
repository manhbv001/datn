'use client';

import { message } from 'antd';
import { FC } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FiLink } from 'react-icons/fi';

export interface ICopyUrlProps {
  url: string;
}
const CopyUrl: FC<ICopyUrlProps> = ({ url }) => {
  const handleCopied = () => {
    message.success('Đã copied vào clipboard');
  };

  return (
    <div className="inline-block cursor-pointer">
      <CopyToClipboard text={url} onCopy={handleCopied}>
        <span className="inline-flex gap-1 items-center text-gray-400">
          <FiLink
            style={{
              opacity: 0.5,
              color: 'var(--text-gray-color)',
              display: 'inline-block',
              fontSize: 15,
            }}
          />
          Sao chép
        </span>
      </CopyToClipboard>
    </div>
  );
};

export default CopyUrl;
