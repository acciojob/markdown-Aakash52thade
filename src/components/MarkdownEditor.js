import React, { useState, useEffect } from 'react';

const MarkdownEditor = ({ markdown, setMarkdown }) => {
  const [htmlOutput, setHTMLOutput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    setIsProcessing(true);
    
    const processMarkdown = () => {
      let html = markdown
        // Headers
        .replace(/^### (.+$)/gim, '<h3>$1</h3>')
        .replace(/^## (.+$)/gim, '<h2>$1</h2>')
        .replace(/^# (.+$)/gim, '<h1>$1</h1>')
        // Bold and Italic
        .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/gim, '<em>$1</em>')
        // Links
        .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2">$1</a>')
        // Line breaks
        .replace(/\n/g, '<br />');
      
      return html || '<p>Start typing markdown...</p>';
    };

    const timer = setTimeout(() => {
      setHTMLOutput(processMarkdown());
      setIsProcessing(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [markdown]);

  const handleInputChange = (e) => {
    setMarkdown(e.target.value);
  };

  return (
    <div className="markdown-editor">
      <div className="input-panel">
        <textarea 
          className="textarea"
          value={markdown}
          onChange={handleInputChange}
          placeholder="Enter your markdown here..."
        />
      </div>
      
      <div className="preview-panel">
        {isProcessing ? (
          <div className="loading">Rendering preview...</div>
        ) : (
          <div 
            className="preview"
            dangerouslySetInnerHTML={{ __html: htmlOutput }}
          />
        )}
      </div>
    </div>
  );
};

export default MarkdownEditor;