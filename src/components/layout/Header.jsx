import React from 'react'
import { 
  Menu, 
  Play, 
  Settings, 
  GitBranch, 
  FolderGit2,
  Sparkles,
  PanelLeftClose,
  PanelLeftOpen,
  Terminal as TerminalIcon
} from 'lucide-react'
import { useWorkspaceStore, useUIStore } from '../../lib/store'
import { cn } from '../../lib/utils'

export default function Header() {
  const { isSidebarOpen, isTerminalOpen, toggleSidebar, toggleTerminal } = useWorkspaceStore()
  const { setActiveModal } = useUIStore()
  
  return (
    <header className="h-12 bg-dark-900 border-b border-dark-800 flex items-center justify-between px-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-primary-500" />
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
            Symplify
          </h1>
        </div>
        
        <div className="flex items-center gap-1">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded hover:bg-dark-800 transition-colors"
            title={isSidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
          >
            {isSidebarOpen ? (
              <PanelLeftClose className="w-4 h-4" />
            ) : (
              <PanelLeftOpen className="w-4 h-4" />
            )}
          </button>
          
          <button
            onClick={toggleTerminal}
            className="p-2 rounded hover:bg-dark-800 transition-colors"
            title={isTerminalOpen ? "Hide Terminal" : "Show Terminal"}
          >
            <TerminalIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <button
          onClick={() => setActiveModal('new-project')}
          className="px-3 py-1.5 bg-primary-600 hover:bg-primary-700 rounded text-sm font-medium transition-colors"
        >
          + New Project
        </button>
        
        <button
          onClick={() => setActiveModal('import-git')}
          className="px-3 py-1.5 bg-dark-800 hover:bg-dark-700 rounded text-sm font-medium transition-colors flex items-center gap-2"
        >
          <GitBranch className="w-4 h-4" />
          Import from Git
        </button>
        
        <button
          onClick={() => setActiveModal('import-lovable')}
          className="px-3 py-1.5 bg-dark-800 hover:bg-dark-700 rounded text-sm font-medium transition-colors flex items-center gap-2"
        >
          <FolderGit2 className="w-4 h-4" />
          Import from Lovable
        </button>
        
        <div className="w-px h-6 bg-dark-700 mx-2" />
        
        <button
          className="p-2 rounded hover:bg-dark-800 transition-colors"
          title="Run Project"
        >
          <Play className="w-4 h-4 text-green-500" />
        </button>
        
        <button
          onClick={() => setActiveModal('settings')}
          className="p-2 rounded hover:bg-dark-800 transition-colors"
          title="Settings"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </header>
  )
}
