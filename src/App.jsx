import './App.css'
import { useState } from 'react'
import DisplayUI from './components/InteractiveUI'


function App() {
  return (
    <div className='App min-h-screen bg-[#000000] p-4 flex flex-col gap-4 items-center'>
      <DisplayUI />
    </div>
  )
}

export default App

