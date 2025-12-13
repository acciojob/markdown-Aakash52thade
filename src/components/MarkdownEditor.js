import React, { useEffect, useState } from 'react';

const MarkdownEditor = ({ markdown, setMarkdown }) => {
  const [htmlOutput, setHtmlOutput] = useState('');

  // Convert markdown -> basic HTML immediately when markdown changes
  useEffect(() => {
    const convert = (md) => {
      if (!md) return '<p>Start typing markdown...</p>';

      // Basic replacements (headings, bold, italic, links, paragraphs & line breaks)
      let html = md
        .replace(/^### (.+$)/gim, '<h3>$1</h3>')
        .replace(/^## (.+$)/gim, '<h2>$1</h2>')
        .replace(/^# (.+$)/gim, '<h1>$1</h1>')
        .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/gim, '<em>$1</em>')
        .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2">$1</a>');

      // Split into paragraphs on two-or-more newlines, preserve single line breaks inside paragraphs
      const paragraphs = html.split(/\n{2,}/).map(p => {
        const withLineBreaks = p.replace(/\n/g, '<br />');
        return `<p>${withLineBreaks}</p>`;
      });

      return paragraphs.join('');
    };

    setHtmlOutput(convert(markdown));
  }, [markdown]);

  const handleChange = (e) => setMarkdown(e.target.value);

  return (
    <div className="editor-container">
      <div className="input-section">
        <textarea
          className="textarea"
          value={markdown}
          onChange={handleChange}
          placeholder="Enter your markdown here..."
        />
      </div>

      <div className="preview-section">
        {/* Always render the preview element (tests expect .preview to exist) */}
        <div
          className="preview"
          dangerouslySetInnerHTML={{ __html: htmlOutput }}
        />
      </div>
    </div>
  );
};

export default MarkdownEditor;
