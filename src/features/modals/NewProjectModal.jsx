import React, { useState } from 'react'
import { X, Folder, Sparkles } from 'lucide-react'
import { useUIStore, useWorkspaceStore, useProjectStore } from '../../lib/store'
import { cn } from '../../lib/utils'

export default function NewProjectModal() {
  const { activeModal, closeModal } = useUIStore()
  const { setCurrentProject } = useWorkspaceStore()
  const { addProject } = useProjectStore()
  const [projectName, setProjectName] = useState('')
  const [template, setTemplate] = useState('react')
  
  if (activeModal !== 'new-project') return null
  
  const templates = [
    { id: 'react', name: 'React', description: 'React with Vite' },
    { id: 'node', name: 'Node.js', description: 'Express server' },
    { id: 'python', name: 'Python', description: 'Flask app' },
    { id: 'html', name: 'HTML/CSS/JS', description: 'Static website' },
  ]
  
  const handleCreate = () => {
    if (!projectName.trim()) return
    
    const newProject = {
      id: Date.now().toString(),
      name: projectName,
      template,
      createdAt: new Date(),
    }
    
    addProject(newProject)
    setCurrentProject(newProject)
    setProjectName('')
    closeModal()
  }
  
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-dark-900 rounded-lg shadow-2xl max-w-2xl w-full border border-dark-700">
        <div className="flex items-center justify-between p-6 border-b border-dark-800">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-primary-500" />
            <h2 className="text-xl font-semibold">Create New Project</h2>
          </div>
          <button
            onClick={closeModal}
            className="p-2 hover:bg-dark-800 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Project Name</label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="my-awesome-project"
              className="w-full px-4 py-2 bg-dark-800 border border-dark-700 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
              autoFocus
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-3">Choose Template</label>
            <div className="grid grid-cols-2 gap-3">
              {templates.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTemplate(t.id)}
                  className={cn(
                    "p-4 rounded-lg border-2 text-left transition-all",
                    template === t.id
                      ? "border-primary-500 bg-primary-500/10"
                      : "border-dark-700 bg-dark-800 hover:border-dark-600"
                  )}
                >
                  <div className="font-medium mb-1">{t.name}</div>
                  <div className="text-sm text-dark-400">{t.description}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-end gap-3 p-6 border-t border-dark-800">
          <button
            onClick={closeModal}
            className="px-4 py-2 rounded hover:bg-dark-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={!projectName.trim()}
            className="px-4 py-2 bg-primary-600 hover:bg-primary-700 rounded font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create Project
          </button>
        </div>
      </div>
    </div>
  )
}
