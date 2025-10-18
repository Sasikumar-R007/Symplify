import { create } from 'zustand'

export const useWorkspaceStore = create((set) => ({
  currentProject: null,
  openFiles: [],
  activeFile: null,
  isSidebarOpen: true,
  isTerminalOpen: true,
  
  setCurrentProject: (project) => set({ currentProject: project }),
  
  openFile: (file) => set((state) => {
    const exists = state.openFiles.find(f => f.path === file.path)
    if (exists) {
      return { activeFile: file }
    }
    return { 
      openFiles: [...state.openFiles, file],
      activeFile: file
    }
  }),
  
  closeFile: (filePath) => set((state) => {
    const newOpenFiles = state.openFiles.filter(f => f.path !== filePath)
    const newActiveFile = state.activeFile?.path === filePath 
      ? newOpenFiles[0] || null 
      : state.activeFile
    return { 
      openFiles: newOpenFiles,
      activeFile: newActiveFile
    }
  }),
  
  setActiveFile: (file) => set({ activeFile: file }),
  
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  
  toggleTerminal: () => set((state) => ({ isTerminalOpen: !state.isTerminalOpen })),
  
  updateFileContent: (filePath, content) => set((state) => ({
    openFiles: state.openFiles.map(f => 
      f.path === filePath ? { ...f, content, isDirty: true } : f
    )
  })),
}))

export const useProjectStore = create((set) => ({
  projects: [],
  
  addProject: (project) => set((state) => ({
    projects: [...state.projects, project]
  })),
  
  updateProject: (id, updates) => set((state) => ({
    projects: state.projects.map(p => 
      p.id === id ? { ...p, ...updates } : p
    )
  })),
  
  deleteProject: (id) => set((state) => ({
    projects: state.projects.filter(p => p.id !== id)
  })),
}))

export const useUIStore = create((set) => ({
  isCommandPaletteOpen: false,
  isSettingsOpen: false,
  activeModal: null,
  
  setActiveModal: (modal) => set({ activeModal: modal }),
  closeModal: () => set({ activeModal: null }),
  toggleCommandPalette: () => set((state) => ({ 
    isCommandPaletteOpen: !state.isCommandPaletteOpen 
  })),
  toggleSettings: () => set((state) => ({ 
    isSettingsOpen: !state.isSettingsOpen 
  })),
}))
