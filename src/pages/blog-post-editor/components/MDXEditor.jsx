import React, { useState, useRef, useEffect } from 'react';
import EditorToolbar from './EditorToolbar';
import Icon from '../../../components/AppIcon';

const MDXEditor = ({ content, onChange, onSave, saveStatus }) => {
  const textareaRef = useRef(null);
  const [lineNumbers, setLineNumbers] = useState([]);

  useEffect(() => {
    updateLineNumbers();
  }, [content]);

  const updateLineNumbers = () => {
    const lines = content?.split('\n')?.length;
    setLineNumbers(Array.from({ length: lines }, (_, i) => i + 1));
  };

  const handleTextareaChange = (e) => {
    onChange(e?.target?.value);
    updateLineNumbers();
  };

  const insertText = (text) => {
    const textarea = textareaRef?.current;
    if (!textarea) return;

    const start = textarea?.selectionStart;
    const end = textarea?.selectionEnd;
    const newContent = content?.substring(0, start) + text + content?.substring(end);
    
    onChange(newContent);
    
    // Set cursor position after inserted text
    setTimeout(() => {
      textarea?.focus();
      textarea?.setSelectionRange(start + text?.length, start + text?.length);
    }, 0);
  };

  const formatText = (prefix, suffix = '') => {
    const textarea = textareaRef?.current;
    if (!textarea) return;

    const start = textarea?.selectionStart;
    const end = textarea?.selectionEnd;
    const selectedText = content?.substring(start, end);
    
    const formattedText = prefix + selectedText + suffix;
    const newContent = content?.substring(0, start) + formattedText + content?.substring(end);
    
    onChange(newContent);
    
    // Set cursor position
    setTimeout(() => {
      textarea?.focus();
      if (selectedText) {
        textarea?.setSelectionRange(start + prefix?.length, start + prefix?.length + selectedText?.length);
      } else {
        textarea?.setSelectionRange(start + prefix?.length, start + prefix?.length);
      }
    }, 0);
  };

  const handleKeyDown = (e) => {
    // Tab key for indentation
    if (e?.key === 'Tab') {
      e?.preventDefault();
      insertText('  ');
    }
    
    // Ctrl+S for save
    if (e?.ctrlKey && e?.key === 's') {
      e?.preventDefault();
      onSave();
    }
  };

  const getSaveStatusColor = () => {
    switch (saveStatus) {
      case 'saving': return 'text-warning';
      case 'saved': return 'text-success';
      case 'error': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getSaveStatusText = () => {
    switch (saveStatus) {
      case 'saving': return 'Saving...';
      case 'saved': return 'Saved';
      case 'error': return 'Save failed';
      default: return 'Unsaved changes';
    }
  };

  return (
    <div className="flex flex-col h-full bg-card border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
        <div className="flex items-center space-x-2">
          <Icon name="FileText" size={18} />
          <span className="font-medium text-card-foreground">MDX Editor</span>
        </div>
        <div className={`flex items-center space-x-2 text-sm ${getSaveStatusColor()}`}>
          <Icon 
            name={saveStatus === 'saving' ? 'Loader2' : saveStatus === 'saved' ? 'Check' : 'AlertCircle'} 
            size={14}
            className={saveStatus === 'saving' ? 'animate-spin' : ''}
          />
          <span>{getSaveStatusText()}</span>
        </div>
      </div>
      {/* Toolbar */}
      <EditorToolbar onInsert={insertText} onFormat={formatText} />
      {/* Editor */}
      <div className="flex-1 flex min-h-0">
        {/* Line Numbers */}
        <div className="w-12 bg-muted/50 border-r border-border p-2 text-right font-mono text-sm text-muted-foreground select-none overflow-hidden">
          {lineNumbers?.map((num) => (
            <div key={num} className="leading-6">
              {num}
            </div>
          ))}
        </div>

        {/* Text Area */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={content}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            className="w-full h-full p-4 bg-transparent text-card-foreground font-mono text-sm leading-6 resize-none outline-none border-none"
            placeholder={`---
title: "Your Post Title" description:"Brief description of your post"
tags: ["forex", "trading"]
author: "admin" date:"${new Date()?.toISOString()}"
draft: false
---

# Your Post Title

Start writing your content here...

## Subheading

You can use **bold**, *italic*, and \`inline code\`.

\`\`\`javascript
// Code blocks are supported
const example = "Hello World";
\`\`\`

> Blockquotes for important notes

- Bullet points
- Are supported
- Too

1. Numbered lists
2. Work as well

[Links](https://example.com) and images are supported.
`}
            spellCheck={false}
          />
        </div>
      </div>
      {/* Footer */}
      <div className="flex items-center justify-between p-2 border-t border-border bg-muted/30 text-xs text-muted-foreground">
        <div className="flex items-center space-x-4">
          <span>Lines: {lineNumbers?.length}</span>
          <span>Characters: {content?.length}</span>
          <span>Words: {content?.split(/\s+/)?.filter(word => word?.length > 0)?.length}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span>Ctrl+S to save</span>
          <span>•</span>
          <span>Tab for indent</span>
        </div>
      </div>
    </div>
  );
};

export default MDXEditor;