import { useState } from 'react'
import GenerativeLogin from './login/Generative.jsx'
import GenerativeProPlan from './pro/Generative.jsx'
import GenerativeSignup from './signup/Generative.jsx'
import GenerativeBasicPlan from './basic/Generative.jsx'
import GenerativePricingPlan from './pricing/Generative.jsx'
import GenerativePremiumPlan from './premium/Generative.jsx'


function SignupUI() {
    const [showGenerativeUI, setShowGenerativeUI] = useState(false);
  
    return (
      <div className='min-h-screen bg-[#000000] p-4'>
        {!showGenerativeUI ? (
          <button
            onClick={() => setShowGenerativeUI(true)}
            className='px-6 py-3 bg-[#facc15] hover:bg-[#fbbf24] text-black font-medium rounded-lg transition transform hover:scale-[1.02] active:scale-[0.98]'
          >
            Generate Signup UI
          </button>
        ) : (
          <GenerativeSignup />
        )}
      </div>
    );
}
  
function LoginUI() {
    const [showGenerativeUI, setShowGenerativeUI] = useState(false);
  
    return (
      <div className='min-h-screen bg-[#000000] p-4'>
        {!showGenerativeUI ? (
          <button
            onClick={() => setShowGenerativeUI(true)}
            className='px-6 py-3 bg-[#facc15] hover:bg-[#fbbf24] text-black font-medium rounded-lg transition transform hover:scale-[1.02] active:scale-[0.98]'
          >
            Generate Login UI
          </button>
        ) : (
          <GenerativeLogin />
        )}
      </div>
    );
}
  
function ProPricingUI() {
      const [showGenerativeUI, setShowGenerativeUI] = useState(false);
    
      return (
        <div className='min-h-screen bg-[#000000] p-4'>
          {!showGenerativeUI ? (
            <button
              onClick={() => setShowGenerativeUI(true)}
              className='px-6 py-3 bg-[#facc15] hover:bg-[#fbbf24] text-black font-medium rounded-lg transition transform hover:scale-[1.02] active:scale-[0.98]'
            >
              Generate Pro pricing plan UI
            </button>
          ) : (
            <GenerativeProPlan />
          )}
        </div>
      );
  }
  
function PremiumPricingUI() {
    const [showGenerativeUI, setShowGenerativeUI] = useState(false);
  
    return (
      <div className='min-h-screen bg-[#000000] p-4'>
        {!showGenerativeUI ? (
          <button
            onClick={() => setShowGenerativeUI(true)}
            className='px-6 py-3 bg-[#facc15] hover:bg-[#fbbf24] text-black font-medium rounded-lg transition transform hover:scale-[1.02] active:scale-[0.98]'
          >
            Generate Premium pricing plan UI
          </button>
        ) : (
          <GenerativePremiumPlan />
        )}
      </div>
    );
}
  
function PricingUI() {
      const [showGenerativeUI, setShowGenerativeUI] = useState(false);
    
      return (
        <div className='min-h-screen bg-[#000000] p-4'>
          {!showGenerativeUI ? (
            <button
              onClick={() => setShowGenerativeUI(true)}
              className='px-6 py-3 bg-[#facc15] hover:bg-[#fbbf24] text-black font-medium rounded-lg transition transform hover:scale-[1.02] active:scale-[0.98]'
            >
              Generate Pricing plans UI
            </button>
          ) : (
            <GenerativePricingPlan />
          )}
        </div>
      );
}
  
function BasicPricingUI() {
    const [showGenerativeUI, setShowGenerativeUI] = useState(false);
  
    return (
      <div className='min-h-screen bg-[#000000] p-4'>
        {!showGenerativeUI ? (
          <button
            onClick={() => setShowGenerativeUI(true)}
            className='px-6 py-3 bg-[#facc15] hover:bg-[#fbbf24] text-black font-medium rounded-lg transition transform hover:scale-[1.02] active:scale-[0.98]'
          >
            Generate Basic Pricing plans UI
          </button>
        ) : (
          <GenerativeBasicPlan />
        )}
      </div>
    );
}
  
function DisplayUI() {
    const [selectedUI, setSelectedUI] = useState('signup')
    const [showGenerativeUI, setShowGenerativeUI] = useState(false)
  
    const handleUISelect = (event) => {
      setSelectedUI(event.target.value)
      setShowGenerativeUI(false)
    }
  
    const renderSelectedUI = () => {
      switch (selectedUI) {
        case 'signup':
          return <GenerativeSignup />
        case 'login':
          return <GenerativeLogin />
        case 'pro':
          return <GenerativeProPlan />
        case 'premium':
          return <GenerativePremiumPlan />
        case 'basic':
          return <GenerativeBasicPlan />
        case 'pricing':
          return <GenerativePricingPlan />
        default:
          return null
      }
    }
  
    return (
      <div className='min-h-screen bg-[#000000] p-4'>
        <div className='sticky top-4 z-50 bg-black p-4 flex gap-4 items-center'>
          <select
            value={selectedUI}
            onChange={handleUISelect}
            className='px-4 py-2 bg-[#facc15] text-black font-medium rounded-lg cursor-pointer'
          >
            <option value="signup">Signup UI</option>
            <option value="login">Login UI</option>
            <option value="pro">Pro Pricing UI</option>
            <option value="premium">Premium Pricing UI</option>
            <option value="basic">Basic Pricing UI</option>
            <option value="pricing">Pricing Plans UI</option>
          </select>
  
          {!showGenerativeUI && (
            <button
              onClick={() => setShowGenerativeUI(true)}
              className='px-6 py-2 bg-[#facc15] hover:bg-[#fbbf24] text-black font-medium rounded-lg transition transform hover:scale-[1.02] active:scale-[0.98]'
            >
              Generate {selectedUI.charAt(0).toUpperCase() + selectedUI.slice(1)} UI
            </button>
          )}
        </div>
  
        <div className='mt-4'>
          {showGenerativeUI && renderSelectedUI()}
        </div>
      </div>
    )
}

export default DisplayUI;