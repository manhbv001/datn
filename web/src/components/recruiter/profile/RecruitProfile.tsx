'use client';
import { AuthContext } from '@/contexts/auth/AuthProvider';
import { UpdateAccountPayload } from '@/models/user';
import userServices from '@/services/user.service';
import { Button, Form, Input, message } from 'antd';
import { ChangeEvent, useContext, useState } from 'react';

const RecruitForm = () => {
  const { user, loading } = useContext(AuthContext);
  const [avatarFile, setAvatarFile] = useState<File>();
  const [avatarPreview, setAvatarPreview] = useState<string>();

  const handleSubmit = (payload: UpdateAccountPayload) => {
    userServices
      .updateAccount({
        fullname: payload.fullname,
        username: payload.username,
        avatar: avatarFile,
      })
      .then((res) => {
        if (res.success) {
          message.success('Thành công');
        }
      });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);
    setAvatarFile(file);
    setAvatarPreview(preview);
  };

  const avatarUrl = avatarPreview || user?.avatar_url;

  if (loading) return 'Loading';

  return (
    <div className="">
      <div className="w-[600px] mx-auto">
        <Form
          name="basic"
          initialValues={{
            fullname: user?.fullname || '',
            username: user?.username || '',
          }}
          autoComplete="off"
          layout="vertical"
          onFinish={handleSubmit}
        >
          <div className="flex gap-x-2">
            <div className="w-1/2">
              <Form.Item
                label="Họ tên đại diện"
                name="fullname"
                style={{ marginBlock: 16 }}
                rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="w-1/2">
              <Form.Item
                label="Email đại diện"
                name="email"
                style={{ marginBlock: 16 }}
                rules={[
                  { required: true, message: 'Vui lòng nhập email!' },
                  {
                    pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                    message: 'Email không đúng định dạng!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
          </div>
          <Form.Item
            label="Tên doanh nghiệp"
            style={{ marginBlock: 16 }}
            name="enterprise_name"
            rules={[
              { required: true, message: 'Vui lòng nhập Tên doanh nghiệp!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Địa chỉ"
            style={{ marginBlock: 16 }}
            name="enterprise_address"
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
            label="Mật khẩu"
            name="password"
            style={{ marginBlock: 16 }}
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Xác nhận mật khẩu"
            name="confirm_password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <input
              accept="image/*"
              onChange={handleFileChange}
              type="file"
              className="pt-1"
            />
            {avatarUrl && (
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={avatarUrl}
                  alt="Preview avatar"
                  className="w-[120px] h-[120px] rounded mt-4"
                />
              </div>
            )}
          </Form.Item>
          <Form.Item>
            <div className="flex justify-end">
              <Button type="primary" htmlType="submit">
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
