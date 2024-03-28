'use client';
import CommonButton from '@/components/common/CommonButton';
import useQueryParams from '@/hooks/useQueryParams';
import { UserTypes } from '@/models/user';
import authServices, {
  ILoginPayload,
  RegisterEnterprisePayload,
  RegisterPayload,
} from '@/services/auth.service';
import { Form, Input, message, notification } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import OAuthBtns from './OAuth2Btns';

export const SignInForm = () => {
  const { queryParams } = useQueryParams<{ redirect: string }>();
  const router = useRouter();

  const onFinish = (values: ILoginPayload) => {
    authServices
      .login(values)
      .then((response) => {
        if (response.success) {
          if (response.data.type === UserTypes.Recruiter)
            return router.replace(queryParams.redirect || '/recruiter');

          if (response.data.type === UserTypes.System)
            return router.replace(queryParams.redirect || '/admin');

          router.replace(queryParams.redirect || '/');
        } else
          notification.error({
            message: response.message,
          });
      })
      .catch((error) => {
        notification.error({
          message: error.message,
        });
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="w-[400px] max-w-[90%] mb-10">
      <h1 className="font-semibold text-xl mb-8 flex items-end justify-between">
        Đăng nhập{' '}
        <Link
          href="/sign-up"
          className="inline-block text-sm opacity-60 font-normal"
        >
          Bạn chưa có tài khoản?
        </Link>
      </h1>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Vui lòng nhập email!' },
            {
              pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
              message: 'Email không đúng định dạng!',
            },
          ]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
        >
          <Input.Password size="large" />
        </Form.Item>
        <Form.Item style={{ width: '100%' }}>
          <CommonButton
            style={{ color: 'white', padding: '6px', width: '100%' }}
            type="primary"
          >
            Đăng nhập
          </CommonButton>
        </Form.Item>
      </Form>
      <OAuthBtns />
    </div>
  );
};

export const SignUpForm = () => {
  const router = useRouter();
  const {
    queryParams: { type },
  } = useQueryParams<{ type: string }>();

  const onFinish = (values: RegisterPayload & { confirm_password: string }) => {
    if (values.password !== values.confirm_password)
      return message.error('Mật khẩu không khớp!');

    authServices
      .register(values)
      .then((response) => {
        if (response.success) {
          router.push('/');
        } else {
          message.error(response.message);
        }
      })
      .catch((error: Error) => {
        message.error(error.message);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  if (type === 'enterprise') return <EnterpriseSignUpForm />;
  return (
    <div className="w-[400px] max-w-[90%] mb-10">
      <h1 className="font-semibold text-xl mb-8 flex items-end justify-between">
        Đăng ký{' '}
        <Link
          href="/sign-in"
          className="inline-block text-sm opacity-60 font-normal"
        >
          Bạn đã có tài khoản?
        </Link>
      </h1>
      <Link
        href="/sign-up?type=enterprise"
        type="primary"
        style={{ color: 'green' }}
      >
        Đăng kí tài khoản doanh nghiệp?
      </Link>
      <Form
        name="basic"
        labelCol={{ span: 9 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label="Họ tên"
          name="fullname"
          style={{ marginBlock: 16 }}
          rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
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
        <Form.Item
          label="Nickname"
          style={{ marginBlock: 16 }}
          name="username"
          rules={[
            { required: true, message: 'Vui lòng nhập Nickname!' },
            { min: 3, message: 'Nickname phải lớn hơn 3 ký tự!' },
          ]}
        >
          <Input placeholder="Nickname sẽ hiển thị cho tài khoản của bạn" />
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
        <Form.Item style={{ width: '100%' }}>
          <CommonButton
            style={{ color: 'white', padding: '6px', width: '100%' }}
            type="primary"
          >
            Đăng ký
          </CommonButton>
        </Form.Item>
      </Form>
      <OAuthBtns />
    </div>
  );
};

export const EnterpriseSignUpForm = () => {
  const router = useRouter();

  const onFinish = (
    values: RegisterEnterprisePayload & { confirm_password: string },
  ) => {
    if (values.password !== values.confirm_password)
      return message.error('Mật khẩu không khớp!');

    authServices
      .registerEnterprise({ ...values, username: '' })
      .then((response) => {
        if (response.success) {
          router.replace('/recruiter');
        } else {
          message.error(response.message);
        }
      })
      .catch((error: Error) => {
        message.error(error.message);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="w-full">
      <div className="max-w-[90%] mb-10">
        <h1 className="font-semibold text-xl mb-8 flex items-end justify-between">
          Đăng ký tài khoản doanh nghiệp{' '}
          <Link
            href="/sign-in"
            className="inline-block text-sm opacity-60 font-normal"
          >
            Bạn đã có tài khoản?
          </Link>
        </h1>
        <Form
          name="basic"
          labelCol={{ span: 9 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
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
          <Form.Item style={{ width: '100%' }}>
            <CommonButton
              style={{ color: 'white', padding: '6px', width: '100%' }}
              type="primary"
            >
              Đăng ký
            </CommonButton>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export const ResetPasswordForm = () => {
  const router = useRouter();

  const onFinish = async (values: { email: string }) => {
    const result = await authServices.resetPassword(values.email);
    if (result.success) {
      message.success(
        `Mật khẩu mới được gửi vào email ${values.email.slice(0, 8)}******!`,
      );
    } else {
      message.error(result.message);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="w-[400px] max-w-[90%] mb-10">
      <h1 className="font-semibold text-xl mb-8 flex items-end justify-between">
        Quên mật khẩu{' '}
        <Link
          href="/sign-up"
          className="inline-block text-sm opacity-60 font-normal"
        >
          Bạn chưa có tài khoản?
        </Link>
      </h1>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Vui lòng nhập email!' },
            {
              pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
              message: 'Email không đúng định dạng!',
            },
          ]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item style={{ width: '100%' }}>
          <CommonButton
            style={{ color: 'white', padding: '6px', width: '100%' }}
            type="primary"
          >
            Lấy lại mật khẩu
          </CommonButton>
        </Form.Item>
      </Form>
      <OAuthBtns />
    </div>
  );
};
