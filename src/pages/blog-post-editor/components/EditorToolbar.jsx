import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const EditorToolbar = ({ onInsert, onFormat }) => {
  const toolbarGroups = [
    {
      name: 'formatting',
      items: [
        { icon: 'Bold', label: 'Bold', action: () => onFormat('**', '**') },
        { icon: 'Italic', label: 'Italic', action: () => onFormat('*', '*') },
        { icon: 'Underline', label: 'Underline', action: () => onFormat('<u>', '</u>') },
        { icon: 'Strikethrough', label: 'Strikethrough', action: () => onFormat('~~', '~~') }
      ]
    },
    {
      name: 'headings',
      items: [
        { icon: 'Heading1', label: 'H1', action: () => onInsert('# ') },
        { icon: 'Heading2', label: 'H2', action: () => onInsert('## ') },
        { icon: 'Heading3', label: 'H3', action: () => onInsert('### ') }
      ]
    },
    {
      name: 'lists',
      items: [
        { icon: 'List', label: 'Bullet List', action: () => onInsert('- ') },
        { icon: 'ListOrdered', label: 'Numbered List', action: () => onInsert('1. ') }
      ]
    },
    {
      name: 'elements',
      items: [
        { icon: 'Link', label: 'Link', action: () => onFormat('[', '](url)') },
        { icon: 'Image', label: 'Image', action: () => onInsert('![alt text](image-url)') },
        { icon: 'Code', label: 'Inline Code', action: () => onFormat('`', '`') },
        { icon: 'FileCode', label: 'Code Block', action: () => onInsert('```javascript\n\n```') }
      ]
    },
    {
      name: 'special',
      items: [
        { icon: 'Quote', label: 'Quote', action: () => onInsert('> ') },
        { icon: 'Separator', label: 'Divider', action: () => onInsert('\n---\n') },
        { icon: 'Table', label: 'Table', action: () => onInsert('| Column 1 | Column 2 |\n|----------|----------|\n| Cell 1   | Cell 2   |') }
      ]
    }
  ];

  return (
    <div className="border-b border-border bg-card p-2">
      <div className="flex flex-wrap items-center gap-1">
        {toolbarGroups?.map((group, groupIndex) => (
          <React.Fragment key={group?.name}>
            {groupIndex > 0 && (
              <div className="w-px h-6 bg-border mx-1" />
            )}
            {group?.items?.map((item) => (
              <Button
                key={item?.label}
                variant="ghost"
                size="sm"
                onClick={item?.action}
                className="h-8 w-8 p-0"
                title={item?.label}
              >
                <Icon name={item?.icon} size={16} />
              </Button>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default EditorToolbar;