'use client';

import { Modal, message } from 'antd';
import Image from 'next/image';
import { FC } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { MdContentCopy } from 'react-icons/md';
import { FacebookShareButton, TwitterShareButton } from 'react-share';

interface ISharePopupProps {
  url: string;
  open?: boolean;
  onClose: () => void;
}

const SharePopup: FC<ISharePopupProps> = ({ url, open, onClose }) => {
  const handleCopied = () => {
    message.success('Copied to clipboard');
  };

  return (
    <div>
      <Modal
        zIndex={2000}
        title="Chia sẻ"
        footer={null}
        onCancel={onClose}
        open={open}
      >
        <ul className="mt-8 flex justify-around">
          <li>
            <FacebookShareButton url={url} quote="" hashtag="">
              <div className="flex flex-col items-center gap-2">
                <Image
                  alt=""
                  width={40}
                  height={40}
                  src="/icons/facebook.png"
                />
                <span>Facebook</span>
              </div>
            </FacebookShareButton>
          </li>
          <li>
            <TwitterShareButton url={url}>
              <div className="flex flex-col items-center gap-2">
                <Image alt="" width={40} height={40} src="/icons/twitter.png" />
                <span>Twitter</span>
              </div>
            </TwitterShareButton>
          </li>
          <li>
            <CopyToClipboard text={url} onCopy={handleCopied}>
              <div className="cursor-pointer flex flex-col items-center gap-2">
                <MdContentCopy size={40} style={{ opacity: 0.7 }} />
                <span>Sao chép</span>
              </div>
            </CopyToClipboard>
          </li>
        </ul>
        <p className="text-center mt-4 italic text-[var(--primary-color)]">
          {url}
        </p>
      </Modal>
    </div>
  );
};

export default SharePopup;
