import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import EditorPane from '../../features/editor/EditorPane'
import TerminalPane from '../../features/terminal/TerminalPane'
import { useWorkspaceStore } from '../../lib/store'
import NewProjectModal from '../../features/modals/NewProjectModal'
import ImportGitModal from '../../features/modals/ImportGitModal'
import ImportLovableModal from '../../features/modals/ImportLovableModal'

export default function MainLayout() {
  const { isSidebarOpen, isTerminalOpen } = useWorkspaceStore()
  
  return (
    <div className="flex flex-col h-full">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        {isSidebarOpen && <Sidebar />}
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <EditorPane />
          
          {isTerminalOpen && (
            <div className="h-64 border-t border-dark-800">
              <TerminalPane />
            </div>
          )}
        </div>
      </div>
      
      <NewProjectModal />
      <ImportGitModal />
      <ImportLovableModal />
    </div>
  )
}
