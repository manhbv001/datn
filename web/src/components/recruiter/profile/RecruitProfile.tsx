'use client';
import { AuthContext } from '@/contexts/auth/AuthProvider';
import { UpdateEnterisePayload } from '@/models/enterprise.model';
import { enterpriseService } from '@/services/enterprise.service';
import { uploadService } from '@/services/upload.service';
import { Button, Form, Input, message } from 'antd';
import { useContext, useState } from 'react';

const RecruitForm = () => {
  const { user, loading } = useContext(AuthContext);
  const [logoUrl, setLogoUrl] = useState(user?.enterprise?.logo || '');
  const [coverUrl, setCoverUrl] = useState(user?.enterprise?.cover || '');
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);

  const handleUploadLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoFile(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setLogoUrl(reader.result as string);
    };
  };

  const handleUploadCover = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCoverFile(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setCoverUrl(reader.result as string);
    };
  };

  const handleSubmit = async (values: any) => {
    const logoUrlPayload: string = logoFile
      ? (await uploadService.uploadFile(logoFile)).data.url
      : logoUrl;
    const coverUrlPayload: string = coverFile
      ? (await uploadService.uploadFile(coverFile)).data.url
      : coverUrl;
    const payload: UpdateEnterisePayload = {
      ...values,
      logo: logoUrlPayload,
      cover: coverUrlPayload,
    };

    enterpriseService
      .update(user?.enterprise?.id as number, payload)
      .then((response) => {
        if (response.success)
          message.success('Cập nhật thông tin doanh nghiệp thành công!');
      });
  };

  if (loading) return 'Loading';

  return (
    <div className="">
      <div className="w-[600px] mx-auto">
        <Form
          name="basic"
          initialValues={{
            name: user?.enterprise?.name || '',
            address: user?.enterprise?.address || '',
            description: user?.enterprise?.description || '',
            logo: user?.enterprise?.logo || '',
            cover: user?.enterprise?.cover || '',
          }}
          autoComplete="off"
          layout="vertical"
          onFinish={handleSubmit}
          onFinishFailed={(error) => console.log(error)}
        >
          <Form.Item
            label="Tên doanh nghiệp"
            style={{ marginBlock: 16 }}
            name="name"
            rules={[
              { required: true, message: 'Vui lòng nhập Tên doanh nghiệp!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Địa chỉ"
            style={{ marginBlock: 16 }}
            name="address"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập địa chỉ doanh nghiệp!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mô tả"
            name="description"
            style={{ marginBlock: 16 }}
          >
            <Input.TextArea />
          </Form.Item>
          <div>
            <label>Logo</label>
            <input
              accept="image/*"
              type="file"
              className="pt-1"
              placeholder="Chọn Logo"
              onChange={handleUploadLogo}
            />
            <div>
              <img
                src={logoUrl}
                alt="logo"
                className="w-20 h-20 rounded-full border object-cover my-2"
              />
            </div>
          </div>
          <div>
            <label>Ảnh bìa</label>
            <input
              accept="image/*"
              type="file"
              className="pt-1"
              placeholder="Chọn ảnh bìa"
              onChange={handleUploadCover}
            />
            <div>
              <img
                src={coverUrl}
                alt="cover"
                className="w-[100%] aspect-[2] border my-2 object-cover"
              />
            </div>
          </div>
          <Form.Item>
            <div className="flex justify-end">
              <Button
                type="primary"
                htmlType="submit"
                style={{ backgroundColor: 'blue' }}
              >
                Submit
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default RecruitForm;
