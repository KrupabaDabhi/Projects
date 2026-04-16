import { useState } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

const DEFAULT = `# Hello Markdown!

## Features
- **Bold**, *italic*, ~~strikethrough~~
- [Links](https://example.com)
- \`inline code\`

## Code Block
\`\`\`js
const greet = (name) => \`Hello, \${name}!\`;
\`\`\`

## Table
| Name | Age |
|------|-----|
| Alice | 25 |
| Bob   | 30 |

> Blockquote example
`;

function MarkdownPreviewer() {
  const [md, setMd] = useState(DEFAULT);

  const html = DOMPurify.sanitize(marked.parse(md));

  return (
    <div className="page">
      <h1>Markdown Previewer</h1>
      <div className="md-container">
        <div className="md-pane">
          <div className="md-pane-header">✏️ Editor</div>
          <textarea className="md-editor" value={md} onChange={(e) => setMd(e.target.value)} spellCheck={false} />
        </div>
        <div className="md-pane">
          <div className="md-pane-header">👁 Preview</div>
          <div className="md-preview" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>
    </div>
  );
}

export default MarkdownPreviewer;
