import React from 'react'
import { ChevronDown, Folder } from 'lucide-react'
import { useWorkspaceStore } from '../../lib/store'

export default function ProjectSelector() {
  const { currentProject } = useWorkspaceStore()
  
  return (
    <div className="p-3 border-b border-dark-800">
      <button className="w-full flex items-center justify-between px-3 py-2 rounded bg-dark-800 hover:bg-dark-700 transition-colors group">
        <div className="flex items-center gap-2 min-w-0">
          <Folder className="w-4 h-4 text-primary-500 flex-shrink-0" />
          <span className="text-sm font-medium truncate">
            {currentProject?.name || 'my-project'}
          </span>
        </div>
        <ChevronDown className="w-4 h-4 text-dark-400 group-hover:text-dark-200 flex-shrink-0" />
      </button>
    </div>
  )
}
