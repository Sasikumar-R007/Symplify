import React from 'react'
import FileTree from '../../features/sidebar/FileTree'
import ProjectSelector from '../../features/sidebar/ProjectSelector'

export default function Sidebar() {
  return (
    <aside className="w-64 bg-dark-900 border-r border-dark-800 flex flex-col">
      <ProjectSelector />
      <div className="flex-1 overflow-auto scrollbar-thin">
        <FileTree />
      </div>
    </aside>
  )
}
