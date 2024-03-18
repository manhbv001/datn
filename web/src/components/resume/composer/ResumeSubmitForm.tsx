import { Button, Input, Modal } from 'antd';
import { FC, useState } from 'react';

export interface IResumeSubmitFormProps {
  visible: boolean;
  onClose: () => void;
  onSubmitted: (name: string) => void;
}
const ResumeSubmitForm: FC<IResumeSubmitFormProps> = ({
  visible,
  onClose,
  onSubmitted,
}) => {
  const [name, setName] = useState<string>('');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmitted = () => {
    onSubmitted(name);
    setName('');
  };

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
        <Input onChange={handleNameChange} placeholder="VD: Mẫu CV chính" />
      </Modal>
    </div>
  );
};

export default ResumeSubmitForm;
