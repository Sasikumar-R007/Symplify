import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import MainLayout from '../components/layout/MainLayout'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="h-screen w-screen overflow-hidden bg-dark-950">
          <MainLayout />
        </div>
      </Router>
    </QueryClientProvider>
  )
}

export default App
