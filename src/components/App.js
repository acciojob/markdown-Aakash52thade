import React, { useState, useEffect } from 'react';
import MarkdownEditor from './MarkdownEditor';
import './styles.css';

const App = () => {
  const [markdown, setMarkdown] = useState('# Welcome to Markdown Editor\n\nStart typing...');
  const [isLoading, setIsLoading] = useState(true);

  // initial loading state (assignment requires loading indicator)
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="app">
      {isLoading ? (
        <div className="loading">Loading Markdown Editor...</div>
      ) : (
        <MarkdownEditor markdown={markdown} setMarkdown={setMarkdown} />
      )}
    </div>
  );
};

export default App;
