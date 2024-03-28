'use client';
import postServices from '@/services/post.service';
import { Modal, Tooltip, message } from 'antd';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { FiEdit3 } from 'react-icons/fi';

interface IPostActionProps {
  postId: number;
}
const PostAction: FC<IPostActionProps> = ({ postId }) => {
  const router = useRouter();

  const handleEditClick = () => {
    router.replace(`/recruiter/posts/edit/${postId}`);
  };

  const hanldeDeleteClick = () => {
    Modal.confirm({
      title: 'Are u sure?',
      okText: 'Delete',
      okType: 'default',
      cancelText: 'Cancel',
      type: 'warning',
      okButtonProps: {
        style: {
          color: 'red',
          borderColor: 'red',
        },
      },
      onOk() {
        postServices.deletePost(postId).then((response) => {
          if (response.success) message.success('Successfully!');
        });
      },
    });
  };

  return (
    <div className="flex gap-4">
      <Tooltip title="Edit">
        <button
          className="border-none cursor-pointer bg-transparent outline-none"
          onClick={handleEditClick}
        >
          <FiEdit3 size={16} style={{ color: 'blue' }} />
        </button>
      </Tooltip>
      <Tooltip title="Delete">
        <button
          className="border-none cursor-pointer bg-transparent outline-none"
          onClick={hanldeDeleteClick}
        >
          <AiOutlineDelete size={18} style={{ color: 'red' }} />
        </button>
      </Tooltip>
    </div>
  );
};

export default PostAction;
