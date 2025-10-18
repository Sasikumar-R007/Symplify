import React, { useState } from 'react'
import { 
  ChevronRight, 
  ChevronDown, 
  File, 
  Folder, 
  FolderOpen,
  FileCode,
  FileJson,
  Image as ImageIcon
} from 'lucide-react'
import { useWorkspaceStore } from '../../lib/store'
import { cn } from '../../lib/utils'

const mockFileTree = {
  name: 'my-project',
  type: 'folder',
  children: [
    {
      name: 'src',
      type: 'folder',
      children: [
        { name: 'App.jsx', type: 'file', content: '// App component\nimport React from "react"\n\nfunction App() {\n  return <div>Hello Symplify!</div>\n}\n\nexport default App' },
        { name: 'index.js', type: 'file', content: 'import React from "react"\nimport ReactDOM from "react-dom"\nimport App from "./App"\n\nReactDOM.render(<App />, document.getElementById("root"))' },
        { name: 'styles.css', type: 'file', content: 'body {\n  margin: 0;\n  font-family: system-ui;\n}' },
      ],
    },
    {
      name: 'public',
      type: 'folder',
      children: [
        { name: 'index.html', type: 'file', content: '<!DOCTYPE html>\n<html>\n<head>\n  <title>My App</title>\n</head>\n<body>\n  <div id="root"></div>\n</body>\n</html>' },
      ],
    },
    { name: 'package.json', type: 'file', content: '{\n  "name": "my-project",\n  "version": "1.0.0"\n}' },
    { name: 'README.md', type: 'file', content: '# My Project\n\nWelcome to my project!' },
  ],
}

function FileTreeItem({ item, depth = 0 }) {
  const [isOpen, setIsOpen] = useState(depth === 0)
  const { openFile } = useWorkspaceStore()
  
  const handleClick = () => {
    if (item.type === 'folder') {
      setIsOpen(!isOpen)
    } else {
      openFile({
        name: item.name,
        path: item.name,
        content: item.content || '',
        isDirty: false,
      })
    }
  }
  
  const getFileIcon = (name) => {
    const ext = name.split('.').pop()
    if (ext === 'json') return <FileJson className="w-4 h-4 text-yellow-500" />
    if (['js', 'jsx', 'ts', 'tsx'].includes(ext)) return <FileCode className="w-4 h-4 text-blue-400" />
    if (['png', 'jpg', 'svg', 'gif'].includes(ext)) return <ImageIcon className="w-4 h-4 text-purple-400" />
    return <File className="w-4 h-4 text-dark-400" />
  }
  
  return (
    <div>
      <div
        className={cn(
          "flex items-center gap-2 px-2 py-1 cursor-pointer hover:bg-dark-800 text-sm",
          "text-dark-200"
        )}
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
        onClick={handleClick}
      >
        {item.type === 'folder' && (
          <>
            {isOpen ? (
              <ChevronDown className="w-4 h-4 flex-shrink-0" />
            ) : (
              <ChevronRight className="w-4 h-4 flex-shrink-0" />
            )}
            {isOpen ? (
              <FolderOpen className="w-4 h-4 text-primary-500 flex-shrink-0" />
            ) : (
              <Folder className="w-4 h-4 text-primary-500 flex-shrink-0" />
            )}
          </>
        )}
        {item.type === 'file' && (
          <>
            <span className="w-4" />
            {getFileIcon(item.name)}
          </>
        )}
        <span className="truncate">{item.name}</span>
      </div>
      
      {item.type === 'folder' && isOpen && item.children && (
        <div>
          {item.children.map((child, index) => (
            <FileTreeItem key={index} item={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function FileTree() {
  return (
    <div className="py-2">
      <FileTreeItem item={mockFileTree} />
    </div>
  )
}
