import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import '../assets/reset.less';

const Markdown: React.FC<{
  value?: string;
  onChange?: any;
  disable?: boolean;
}> = ({ value, onChange, disable }) => {
  disable = disable == undefined ? false : disable;
  return (
    <div className="div-mk">
      {disable ? (
        <ReactMarkdown
          children={value ? value : ''}
          remarkPlugins={[remarkGfm]}
        />
      ) : (
        <SimpleMDE value={value} onChange={onChange} />
      )}
    </div>
  );
};

export default Markdown;
