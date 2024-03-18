import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { FC } from 'react';

const MyEditor: FC<{
  value?: string;
  onChange: (e: any, editor: any) => void;
}> = ({ value, onChange }) => {
  return (
    <CKEditor data={value} config={{}} editor={Editor} onChange={onChange} />
  );
};

export default MyEditor;
