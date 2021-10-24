import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import '../assets/reset.less';

const Markdown: React.FC<{ value?: any; onChange?: any }> = ({
  value,
  onChange,
}) => {
  return (
    <div className="div-mk">
      <SimpleMDE value={value} onChange={onChange} />
    </div>
  );
};

export default Markdown;
