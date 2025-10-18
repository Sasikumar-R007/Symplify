import React, { useState } from 'react'
import Editor from '@monaco-editor/react'
import { useWorkspaceStore } from '../../lib/store'
import { X, FileCode } from 'lucide-react'
import { cn } from '../../lib/utils'

export default function EditorPane() {
  const { openFiles, activeFile, closeFile, setActiveFile, updateFileContent } = useWorkspaceStore()
  
  const handleEditorChange = (value) => {
    if (activeFile) {
      updateFileContent(activeFile.path, value)
    }
  }
  
  if (openFiles.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center bg-dark-950">
        <div className="text-center text-dark-500">
          <FileCode className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p className="text-lg">No files open</p>
          <p className="text-sm mt-2">Select a file from the sidebar to start editing</p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="flex-1 flex flex-col bg-dark-950">
      <div className="flex items-center bg-dark-900 border-b border-dark-800 overflow-x-auto scrollbar-thin">
        {openFiles.map((file) => (
          <div
            key={file.path}
            className={cn(
              "flex items-center gap-2 px-4 py-2 border-r border-dark-800 cursor-pointer group min-w-0",
              activeFile?.path === file.path
                ? "bg-dark-950 text-white"
                : "bg-dark-900 text-dark-400 hover:text-white"
            )}
            onClick={() => setActiveFile(file)}
          >
            <span className="text-sm truncate">{file.name}</span>
            {file.isDirty && <span className="w-2 h-2 rounded-full bg-primary-500" />}
            <button
              onClick={(e) => {
                e.stopPropagation()
                closeFile(file.path)
              }}
              className="opacity-0 group-hover:opacity-100 hover:bg-dark-700 rounded p-0.5 transition-opacity"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
      
      <div className="flex-1">
        {activeFile && (
          <Editor
            height="100%"
            defaultLanguage={getLanguageFromPath(activeFile.path)}
            value={activeFile.content || ''}
            onChange={handleEditorChange}
            theme="vs-dark"
            options={{
              fontSize: 14,
              fontFamily: 'Fira Code, monospace',
              minimap: { enabled: true },
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 2,
              wordWrap: 'on',
            }}
          />
        )}
      </div>
    </div>
  )
}

function getLanguageFromPath(path) {
  const ext = path.split('.').pop()
  const languageMap = {
    js: 'javascript',
    jsx: 'javascript',
    ts: 'typescript',
    tsx: 'typescript',
    py: 'python',
    html: 'html',
    css: 'css',
    json: 'json',
    md: 'markdown',
    yml: 'yaml',
    yaml: 'yaml',
    sh: 'shell',
    bash: 'shell',
  }
  return languageMap[ext] || 'plaintext'
}
