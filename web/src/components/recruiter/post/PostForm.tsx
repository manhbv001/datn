'use client';
import { CreatePostParams, PostModel } from '@/models/post';
import { TopicModel } from '@/models/topic';
import postServices from '@/services/post.service';
import { toSlug } from '@/utils/to-slug';
import { Button, Form, Input, Select, message } from 'antd';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FC, useEffect, useState } from 'react';

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
  const [thumbnailPreview, setThumbnailPreview] = useState<string>(
    data?.seo?.thumbnail || '',
  );
  const [url, setUrl] = useState('');
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
            router.replace('/');
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
            router.replace('/');
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

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);
    setThumbnailFile(file);
    setThumbnailPreview(preview);
  };

  useEffect(() => {
    if (!title) return setUrl('');

    const slug = toSlug(title);
    setUrl(`www.techomies.com/posts/${slug}`);
  }, [title]);

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
          <Button>Preview</Button>
          <Form.Item>
            <Button htmlType="submit" type="primary">
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
              name="status"
              label="Trạng thái"
              rules={[{ required: true }]}
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
              label="Noi dung"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
            >
              <Editor value={content} onChange={handleContentChange} />
            </Form.Item>
          </div>
          <div className="col-span-1">
            <Form.Item
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              label="SEO"
              style={{ marginBottom: 16, fontWeight: 'bold' }}
            />
            <Form.Item
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              label="URL"
              rules={[{ required: true }]}
            >
              <Input disabled value={url} />
            </Form.Item>
            <Form.Item
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              name="description"
              label="Mô tả"
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              label="Thumbnail"
            >
              <input
                accept="image/*"
                onChange={handleFileChange}
                type="file"
                className="pt-1"
              />
              {thumbnailPreview && (
                <div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={thumbnailPreview}
                    alt="Preview thumbnail"
                    className="w-full mt-2"
                  />
                </div>
              )}
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default PostForm;
