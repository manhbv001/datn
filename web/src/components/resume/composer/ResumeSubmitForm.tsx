import { Button, Input, Modal } from 'antd';
import { FC, useEffect, useState } from 'react';

export interface IResumeSubmitFormProps {
  visible: boolean;
  onClose: () => void;
  onSubmitted: (name: string) => void;
  initTitle?: string;
}
const ResumeSubmitForm: FC<IResumeSubmitFormProps> = ({
  visible,
  onClose,
  onSubmitted,
  initTitle,
}) => {
  const [name, setName] = useState<string>('');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmitted = () => {
    if (!name) return alert('Tên không được để trống');
    onSubmitted(name);
    setName('');
  };

  useEffect(() => {
    setName(initTitle || '');
  }, [initTitle]);

  return (
    <div>
      <Modal
        title="Nhập tên mẫu CV của bạn"
        open={visible}
        onCancel={onClose}
        footer={[
          <Button key="back" onClick={onClose}>
            Trở lại
          </Button>,
          <Button
            style={{ backgroundColor: 'var(--primary-color)' }}
            key="submit"
            type="primary"
            onClick={handleSubmitted}
          >
            <span className="text-white">Submit</span>
          </Button>,
        ]}
      >
        <Input
          onChange={handleNameChange}
          value={name}
          placeholder="VD: Mẫu CV chính"
          required
        />
      </Modal>
    </div>
  );
};

export default ResumeSubmitForm;
