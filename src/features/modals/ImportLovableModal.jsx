import React, { useState } from 'react'
import { X, FolderGit2, Download } from 'lucide-react'
import { useUIStore, useWorkspaceStore, useProjectStore } from '../../lib/store'

export default function ImportLovableModal() {
  const { activeModal, closeModal } = useUIStore()
  const { setCurrentProject } = useWorkspaceStore()
  const { addProject } = useProjectStore()
  const [projectId, setProjectId] = useState('')
  const [isImporting, setIsImporting] = useState(false)
  
  if (activeModal !== 'import-lovable') return null
  
  const handleImport = async () => {
    if (!projectId.trim()) return
    
    setIsImporting(true)
    
    setTimeout(() => {
      const newProject = {
        id: Date.now().toString(),
        name: `lovable-${projectId}`,
        source: 'lovable',
        lovableId: projectId,
        createdAt: new Date(),
      }
      
      addProject(newProject)
      setCurrentProject(newProject)
      setProjectId('')
      setIsImporting(false)
      closeModal()
    }, 1500)
  }
  
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-dark-900 rounded-lg shadow-2xl max-w-2xl w-full border border-dark-700">
        <div className="flex items-center justify-between p-6 border-b border-dark-800">
          <div className="flex items-center gap-3">
            <FolderGit2 className="w-6 h-6 text-primary-500" />
            <h2 className="text-xl font-semibold">Import from Lovable</h2>
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
            <label className="block text-sm font-medium mb-2">Lovable Project ID or URL</label>
            <input
              type="text"
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              placeholder="project-id or https://lovable.dev/projects/..."
              className="w-full px-4 py-2 bg-dark-800 border border-dark-700 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
              autoFocus
            />
          </div>
          
          <div className="bg-dark-800 border border-dark-700 rounded p-4 space-y-3">
            <p className="text-sm text-dark-300">
              <strong>How to import from Lovable:</strong>
            </p>
            <ol className="text-sm text-dark-300 space-y-2 list-decimal list-inside">
              <li>Go to your Lovable project</li>
              <li>Copy the project ID or full URL</li>
              <li>Paste it here and click Import</li>
            </ol>
            <p className="text-sm text-dark-400 mt-3">
              Your Lovable project will be synced and ready to edit in Symplify.
            </p>
          </div>
        </div>
        
        <div className="flex items-center justify-end gap-3 p-6 border-t border-dark-800">
          <button
            onClick={closeModal}
            className="px-4 py-2 rounded hover:bg-dark-800 transition-colors"
            disabled={isImporting}
          >
            Cancel
          </button>
          <button
            onClick={handleImport}
            disabled={!projectId.trim() || isImporting}
            className="px-4 py-2 bg-primary-600 hover:bg-primary-700 rounded font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isImporting ? (
              <>
                <Download className="w-4 h-4 animate-pulse" />
                Importing...
              </>
            ) : (
              <>
                <FolderGit2 className="w-4 h-4" />
                Import Project
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
