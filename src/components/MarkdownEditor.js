import React, { useState, useEffect } from 'react';

const MarkdownEditor = ({ markdown, setMarkdown }) => {
  const [htmlOutput, setHTMLOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    
    // Simulate processing delay for loading indicator
    const timer = setTimeout(() => {
      const convertMarkdown = (text) => {
        if (!text) return '';
        
        return text
          // Headers (must be at start of line)
          .replace(/^### (.*$)/gim, '<h3>$1</h3>')
          .replace(/^## (.*$)/gim, '<h2>$1</h2>')
          .replace(/^# (.*$)/gim, '<h1>$1</h1>')
          // Bold - fixed regex
          .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
          // Italic - fixed regex
          .replace(/\*(.*?)\*/gim, '<em>$1</em>')
          // Links
          .replace(/\[([^\[]+)\]\(([^\)]+)\)/gim, '<a href="$2">$1</a>')
          // Line breaks - proper paragraph handling
          .split('\n\n')
          .map(paragraph => {
            if (paragraph.trim() === '') return '';
            // Check if it's already a header
            if (paragraph.startsWith('<h')) return paragraph;
            return `<p>${paragraph.replace(/\n/g, '<br>')}</p>`;
          })
          .join('');
      };

      setHTMLOutput(convertMarkdown(markdown));
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [markdown]);

  return (
    <div className='editor-container'>
      <div className='input-section'>
        <textarea 
          className='textarea'
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          placeholder='Enter Markdown here...'
          rows="20"
        />
      </div>

      <div className='preview-section'>
        <div className='preview'>
          {isLoading ? (
            <div className='loading'>Loading preview...</div>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: htmlOutput }} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MarkdownEditor;