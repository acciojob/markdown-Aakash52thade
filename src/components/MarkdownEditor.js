import React, { useState, useEffect } from 'react' 

const MarkdownEditor = ({ markdown, setMarkdown }) => {

  const [htmlOutput, setHTMLOutput] = useState("");

   useEffect(() => {
    // Simple markdown-to-HTML conversion without external library
    const convertMarkdown = (text) => {
      let html = text
        // Headers
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        // Bold
        .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
        // Italic
        .replace(/\*(.*?)\*/gim, '<em>$1</em>')
        // Links
        .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2">$1</a>')
        // Line breaks
        .replace(/\n/gim, '<br>');
      
      return html;
    };
    setHTMLOutput(convertMarkdown(markdown));
  },[markdown])

    
  return (
    
    <div className='editor-container'>
      <div className='input-section'>
        <textarea 
          className='textarea'
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          placeholder='Enter Markdown here...'
        />
      </div>

      <div className='preview-section'>
        <div 
        className='preview'
        dangerouslySetInnerHTML={{__html: htmlOutput}}
        >
          
        </div>
      </div>
    </div>
  )
}

export default MarkdownEditor