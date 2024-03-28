'use client';
import { CreatePostParams, PostModel } from '@/models/post';
import { TopicModel } from '@/models/topic';
import postServices from '@/services/post.service';
import { Button, Form, Input, Select, message } from 'antd';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} không được bỏ trống!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} phải là chữ số!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
/* eslint-enable no-template-curly-in-string */

interface IPostFormProps {
  data?: PostModel;
  topics: TopicModel[];
}

const Editor = dynamic(() => import('@/components/recruiter/common/MyEditor'), {
  ssr: false,
});

const PostForm: FC<IPostFormProps> = ({ topics, data }) => {
  const router = useRouter();
  const [content, setContent] = useState(data?.content || '');
  const [thumbnailFile, setThumbnailFile] = useState<File>();
  const [title, setTitle] = useState(data?.title || '');

  const handleSubmit = (params: CreatePostParams) => {
    if (data) {
      postServices
        .editPost(data.id, {
          title: params.title,
          content: content,
          status: params.status,
          topic_ids: params.topic_ids,
          description: params.description,
          thumbnail: thumbnailFile,
        })
        .then((response) => {
          if (response.success) {
            message.success('Thành công');
            router.replace('/recruiter/posts');
          } else {
            message.error(response.message);
          }
        });
    } else {
      postServices
        .createPost({
          title: params.title,
          content: content,
          status: params.status,
          topic_ids: params.topic_ids,
          description: params.description,
          thumbnail: thumbnailFile,
        })
        .then((response) => {
          if (response.success) {
            message.success('Thành công');
            router.replace('/recruiter/posts');
          } else {
            message.error(response.message);
          }
        });
    }
  };

  const handleContentChange = (_: any, editor: any) => {
    const data = editor.getData();
    setContent(data);
  };

  return (
    <div className="h-full overflow-auto">
      <Form
        initialValues={{
          title: data?.title,
          topic_ids: data?.topics.map((topic) => topic.id),
          status: data?.status || 1,
          content: data?.content || '',
          description: data?.seo?.description,
        }}
        name="post"
        onFinish={handleSubmit}
        validateMessages={validateMessages}
      >
        <div className="flex justify-end gap-2">
          <Form.Item>
            <Button
              htmlType="submit"
              style={{ backgroundColor: 'blue' }}
              type="primary"
            >
              Submit
            </Button>
          </Form.Item>
        </div>
        <div className="w-full grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <Form.Item
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
              label="Bài viết"
              style={{ marginBottom: 16, fontWeight: 'bold' }}
            />
            <Form.Item
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
              name="title"
              label="Tiêu đề"
              rules={[{ required: true }]}
            >
              <Input onChange={(e) => setTitle(e.target.value)} />
            </Form.Item>
            <Form.Item
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
              name="topic_ids"
              label="Chủ đề"
              rules={[{ required: true }]}
            >
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                options={topics.map((topic) => ({
                  label: topic.name,
                  value: topic.id,
                }))}
              />
            </Form.Item>
            <Form.Item
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
              rules={[{ required: true }]}
              name="status"
              label="Trạng thái"
            >
              <Select
                style={{ width: 160 }}
                options={[
                  { value: 1, label: 'Công khai' },
                  { value: 2, label: 'Nháp' },
                  { value: 4, label: 'Không công khai' },
                  { value: 3, label: 'Chỉ mình tôi' },
                ]}
              />
            </Form.Item>
            <Form.Item
              label="Mô tả ngắn gọn"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
              rules={[{ required: true }]}
              name="description"
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              label="Nội dung"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
            >
              <Editor value={content} onChange={handleContentChange} />
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default PostForm;
