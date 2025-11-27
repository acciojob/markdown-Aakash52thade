import React, { useState } from 'react';
import MarkdownEditor from './MarkdownEditor';
import '../styles/App.css';

const App = () => {
  const [markdown, setMarkdown] = useState('# Welcome to Markdown Editor\n\nStart typing...');

  return (
    <div className="app">
      <MarkdownEditor markdown={markdown} setMarkdown={setMarkdown} />
    </div>
  );
};

export default App;