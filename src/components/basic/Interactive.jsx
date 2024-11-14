import React, { useState } from 'react';

const InteractiveBasicPlan = () => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isActivated, setIsActivated] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleActivate = async () => {
    setIsProcessing(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setShowConfirmationModal(false);
    setShowSuccessModal(true);
    setIsActivated(true);
    setIsProcessing(false);
  };

  const handleClose = () => {
    setShowSuccessModal(false);
    setTermsAccepted(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-black">
      {/* Main Card */}
      <div className="max-w-2xl w-full m-4 p-6 rounded-xl bg-black shadow-lg border border-zinc-800">
        {/* Header Section */}
        <div className="flex items-center gap-3 mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <h1 className="text-2xl font-bold text-white">Alpaca Markets Basic Plan</h1>
        </div>

        {/* Pricing Badge */}
        <div className="inline-block px-4 py-1 rounded-full bg-yellow-400 text-black font-medium mb-6">
          Free Plan
        </div>

        {/* Subtitle */}
        <div className="flex items-center gap-2 mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <p className="text-zinc-300 italic">Perfect for beginners and algorithm testing</p>
        </div>

        {/* Features List */}
        <div className="space-y-4">
          {[
            'Zero commission trading for stocks & ETFs',
            'REST API access with 200 requests/min',
            'Basic market data with 15-min delay',
            'Paper trading environment for testing',
            'Up to 3 concurrent connections'
          ].map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-zinc-200">{feature}</p>
            </div>
          ))}
        </div>

        {/* Get Started Button */}
        <button
          onClick={() => !isActivated && setShowConfirmationModal(true)}
          disabled={isActivated}
          className={`w-full mt-8 px-6 py-3 rounded-lg ${
            isActivated 
              ? 'bg-green-900 cursor-not-allowed opacity-75' 
              : 'bg-yellow-400 hover:bg-yellow-500'
          } transition-colors text-black font-semibold flex items-center justify-center gap-2`}
        >
          {isActivated ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Plan Activated
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
              Get Started Now
            </>
          )}
        </button>
      </div>

      {/* Confirmation Modal */}
      {showConfirmationModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={() => setShowConfirmationModal(false)}
        >
          <div 
            className="bg-zinc-900 p-6 rounded-xl max-w-md w-full m-4"
            onClick={e => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-white mb-4">Terms & Conditions</h2>
            <div className="h-48 overflow-y-auto mb-4 text-sm text-zinc-300 bg-zinc-800 p-4 rounded-lg">
              <p>By activating the Alpaca Markets Basic Plan, you agree to:</p>
              <ul className="list-disc pl-4 mt-2 space-y-2">
                <li>Follow all applicable trading regulations and guidelines</li>
                <li>Use the API responsibly within the specified rate limits</li>
                <li>Not attempt to circumvent any platform restrictions</li>
                <li>Maintain the security of your account credentials</li>
                <li>Accept the risks associated with trading activities</li>
              </ul>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                id="acceptTerms"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="w-4 h-4 accent-yellow-400"
              />
              <label htmlFor="acceptTerms" className="text-sm text-zinc-300">
                I accept the terms and conditions
              </label>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleActivate}
                disabled={!termsAccepted || isProcessing}
                className={`flex-1 px-4 py-2 rounded-lg ${
                  !termsAccepted || isProcessing
                    ? 'bg-zinc-600 cursor-not-allowed'
                    : 'bg-yellow-400 hover:bg-yellow-500'
                } transition-colors text-black font-semibold`}
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Activating...
                  </div>
                ) : (
                  'Activate Plan'
                )}
              </button>
              <button
                onClick={() => setShowConfirmationModal(false)}
                className="px-4 py-2 rounded-lg border border-zinc-700 text-zinc-300 hover:bg-zinc-800 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={() => setShowSuccessModal(false)}
        >
          <div 
            className="bg-zinc-900 p-6 rounded-xl max-w-md w-full m-4 text-center"
            onClick={e => e.stopPropagation()}
          >
            <div className="w-16 h-16 bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Plan Activated Successfully!</h2>
            <p className="text-zinc-400 mb-6">
              Your Basic Plan has been activated. You can now start using all the features.
            </p>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-400">API Access</span>
                <span className="text-green-500">Active</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-400">Market Data</span>
                <span className="text-green-500">Connected</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-400">Paper Trading</span>
                <span className="text-green-500">Ready</span>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="w-full mt-6 px-4 py-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 transition-colors text-black font-semibold"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveBasicPlan;