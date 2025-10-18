import React, { useEffect, useRef } from 'react'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import 'xterm/css/xterm.css'
import { Play, Trash2, Plus } from 'lucide-react'

export default function TerminalPane() {
  const terminalRef = useRef(null)
  const xtermRef = useRef(null)
  const fitAddonRef = useRef(null)
  
  useEffect(() => {
    if (!terminalRef.current || xtermRef.current) return
    
    const terminal = new Terminal({
      cursorBlink: true,
      fontSize: 14,
      fontFamily: 'Fira Code, monospace',
      theme: {
        background: '#020617',
        foreground: '#f1f5f9',
        cursor: '#0ea5e9',
        black: '#1e293b',
        red: '#ef4444',
        green: '#10b981',
        yellow: '#f59e0b',
        blue: '#3b82f6',
        magenta: '#a855f7',
        cyan: '#06b6d4',
        white: '#f1f5f9',
        brightBlack: '#475569',
        brightRed: '#f87171',
        brightGreen: '#34d399',
        brightYellow: '#fbbf24',
        brightBlue: '#60a5fa',
        brightMagenta: '#c084fc',
        brightCyan: '#22d3ee',
        brightWhite: '#ffffff',
      },
    })
    
    const fitAddon = new FitAddon()
    terminal.loadAddon(fitAddon)
    
    terminal.open(terminalRef.current)
    fitAddon.fit()
    
    terminal.writeln('Welcome to Symplify Terminal!')
    terminal.writeln('Connected to virtual environment.')
    terminal.write('\r\n$ ')
    
    let currentLine = ''
    terminal.onData((data) => {
      if (data === '\r') {
        terminal.write('\r\n')
        if (currentLine.trim()) {
          handleCommand(currentLine.trim(), terminal)
        }
        currentLine = ''
        terminal.write('$ ')
      } else if (data === '\x7F') {
        if (currentLine.length > 0) {
          currentLine = currentLine.slice(0, -1)
          terminal.write('\b \b')
        }
      } else {
        currentLine += data
        terminal.write(data)
      }
    })
    
    xtermRef.current = terminal
    fitAddonRef.current = fitAddon
    
    const handleResize = () => {
      fitAddon.fit()
    }
    
    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('resize', handleResize)
      terminal.dispose()
    }
  }, [])
  
  const handleCommand = (cmd, terminal) => {
    const commands = {
      help: () => {
        terminal.writeln('Available commands:')
        terminal.writeln('  help    - Show this help message')
        terminal.writeln('  clear   - Clear the terminal')
        terminal.writeln('  echo    - Echo a message')
        terminal.writeln('  node    - Run Node.js (simulated)')
        terminal.writeln('  npm     - Run npm (simulated)')
      },
      clear: () => {
        terminal.clear()
      },
      echo: (args) => {
        terminal.writeln(args.join(' '))
      },
    }
    
    const parts = cmd.split(' ')
    const command = parts[0]
    const args = parts.slice(1)
    
    if (commands[command]) {
      commands[command](args)
    } else {
      terminal.writeln(`Command not found: ${command}`)
      terminal.writeln('Type "help" for available commands')
    }
  }
  
  return (
    <div className="h-full bg-dark-950 flex flex-col">
      <div className="h-10 bg-dark-900 border-b border-dark-800 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-dark-300">Terminal</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            className="p-1.5 rounded hover:bg-dark-800 transition-colors"
            title="Run"
          >
            <Play className="w-4 h-4 text-green-500" />
          </button>
          <button
            className="p-1.5 rounded hover:bg-dark-800 transition-colors"
            title="Clear"
            onClick={() => xtermRef.current?.clear()}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div ref={terminalRef} className="flex-1 p-2" />
    </div>
  )
}
