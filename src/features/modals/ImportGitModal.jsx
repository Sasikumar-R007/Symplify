import React, { useState } from 'react'
import { X, GitBranch, Download } from 'lucide-react'
import { useUIStore, useWorkspaceStore, useProjectStore } from '../../lib/store'

export default function ImportGitModal() {
  const { activeModal, closeModal } = useUIStore()
  const { setCurrentProject } = useWorkspaceStore()
  const { addProject } = useProjectStore()
  const [repoUrl, setRepoUrl] = useState('')
  const [branch, setBranch] = useState('main')
  const [isImporting, setIsImporting] = useState(false)
  
  if (activeModal !== 'import-git') return null
  
  const handleImport = async () => {
    if (!repoUrl.trim()) return
    
    setIsImporting(true)
    
    setTimeout(() => {
      const projectName = repoUrl.split('/').pop()?.replace('.git', '') || 'imported-project'
      
      const newProject = {
        id: Date.now().toString(),
        name: projectName,
        source: 'git',
        repoUrl,
        branch,
        createdAt: new Date(),
      }
      
      addProject(newProject)
      setCurrentProject(newProject)
      setRepoUrl('')
      setBranch('main')
      setIsImporting(false)
      closeModal()
    }, 1500)
  }
  
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-dark-900 rounded-lg shadow-2xl max-w-2xl w-full border border-dark-700">
        <div className="flex items-center justify-between p-6 border-b border-dark-800">
          <div className="flex items-center gap-3">
            <GitBranch className="w-6 h-6 text-primary-500" />
            <h2 className="text-xl font-semibold">Import from Git</h2>
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
            <label className="block text-sm font-medium mb-2">Repository URL</label>
            <input
              type="text"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              placeholder="https://github.com/username/repository.git"
              className="w-full px-4 py-2 bg-dark-800 border border-dark-700 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
              autoFocus
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Branch</label>
            <input
              type="text"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              placeholder="main"
              className="w-full px-4 py-2 bg-dark-800 border border-dark-700 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          
          <div className="bg-dark-800 border border-dark-700 rounded p-4">
            <p className="text-sm text-dark-300">
              <strong>Tip:</strong> You can import any public Git repository. For private repositories, you'll need to set up authentication.
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
            disabled={!repoUrl.trim() || isImporting}
            className="px-4 py-2 bg-primary-600 hover:bg-primary-700 rounded font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isImporting ? (
              <>
                <Download className="w-4 h-4 animate-pulse" />
                Importing...
              </>
            ) : (
              <>
                <GitBranch className="w-4 h-4" />
                Import Repository
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
