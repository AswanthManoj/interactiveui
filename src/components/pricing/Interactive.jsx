import React, { useState } from 'react';

const planDetails = {
  basic: {
    title: "Basic Plan Details",
    price: "Free",
    content: [
      "Zero commission trading for stocks & ETFs",
      "REST API access with 200 requests/min",
      "Basic market data with 15-min delay",
      "Paper trading environment for testing",
      "Up to 3 concurrent connections",
      "Perfect for beginners and algorithm testing"
    ]
  },
  unlimited: {
    title: "Unlimited Plan Details",
    price: "$30/month",
    content: [
      "Real-time market data streaming",
      "Websocket API with 500 requests/min",
      "Extended hours trading (4AM - 8PM ET)",
      "Advanced order types (bracket, OCO)",
      "Up to 10 concurrent connections",
      "Historical data access"
    ]
  },
  premium: {
    title: "Premium Plan Details",
    price: "$99/month",
    content: [
      "Level 2 market data (order book depth)",
      "Unlimited API requests",
      "Multi-asset trading capability",
      "Priority email & chat support",
      "Institutional tools access",
      "Historical tick-by-tick data",
      "Unlimited concurrent connections"
    ]
  }
};

const InteractivePricingPlan = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [modalView, setModalView] = useState('details'); // details, confirmation, loading, success
  const [showModal, setShowModal] = useState(false);

  const handleShowPlanDetails = (plan) => {
    setSelectedPlan(plan);
    setModalView('details');
    setShowModal(true);
  };

  const handleConfirmPlan = () => {
    setModalView('loading');
    setTimeout(() => {
      setModalView('success');
    }, 2000);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setTimeout(() => {
      setModalView('details');
    }, 300);
  };

  const ModalContent = () => {
    switch (modalView) {
      case 'details':
        return (
          <div id="planDetailsView">
            <h3 className="text-2xl font-bold text-white mb-4">
              {selectedPlan && planDetails[selectedPlan].title}
            </h3>
            <div className="text-zinc-300 mb-6">
              <ul className="space-y-4">
                {selectedPlan && planDetails[selectedPlan].content.map((item, index) => (
                  <li key={index}>✓ {item}</li>
                ))}
              </ul>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 rounded-lg bg-zinc-700 text-white hover:opacity-90"
              >
                Cancel
              </button>
              <button
                onClick={() => setModalView('confirmation')}
                className="px-4 py-2 rounded-lg bg-yellow-400 text-black hover:opacity-90"
              >
                Select Plan
              </button>
            </div>
          </div>
        );

      case 'confirmation':
        return (
          <div id="confirmationView">
            <h3 className="text-2xl font-bold text-white mb-4">
              Confirm Your Selection
            </h3>
            <p className="text-zinc-300 mb-6">
              You are about to select the {selectedPlan && selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)} Plan ({selectedPlan && planDetails[selectedPlan].price}). Would you like to proceed?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setModalView('details')}
                className="px-4 py-2 rounded-lg bg-zinc-700 text-white hover:opacity-90"
              >
                Back
              </button>
              <button
                onClick={handleConfirmPlan}
                className="px-4 py-2 rounded-lg bg-yellow-400 text-black hover:opacity-90"
              >
                Confirm
              </button>
            </div>
          </div>
        );

      case 'loading':
        return (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-yellow-400 border-t-transparent mb-4"></div>
            <p className="text-white text-lg">Processing your selection...</p>
          </div>
        );

      case 'success':
        return (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Success!</h3>
            <p className="text-zinc-300 text-center mb-6">
              Your plan has been successfully selected.
            </p>
            <button
              onClick={handleCloseModal}
              className="px-6 py-2 rounded-lg bg-yellow-400 text-black hover:opacity-90"
            >
              Done
            </button>
          </div>
        );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-black">
      <div className="max-w-4xl w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Alpaca Markets Pricing
          </h1>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Basic Plan */}
          <div className="rounded-lg bg-zinc-800 p-6 shadow-lg border border-zinc-700 hover:border-yellow-400 transition-all">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-xl text-yellow-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                </svg>
              </span>
              <h2 className="text-xl font-bold text-white">Basic</h2>
            </div>
            <p className="text-xl font-bold text-white mb-2">Free</p>
            <p className="text-zinc-300 mb-4">
              Perfect for beginners and algorithm testing
            </p>
            
            <ul className="space-y-3 mb-6">
              <li className="flex items-center text-zinc-300">
                <svg className="w-5 h-5 mr-2 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                </svg>
                Zero commission trading
              </li>
              <li className="flex items-center text-zinc-300">
                <svg className="w-5 h-5 mr-2 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                </svg>
                REST API (200 req/min)
              </li>
              <li className="flex items-center text-zinc-300">
                <svg className="w-5 h-5 mr-2 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                </svg>
                15-min delayed data
              </li>
            </ul>
            <button
              onClick={() => handleShowPlanDetails('basic')}
              className="w-full py-2 px-4 bg-yellow-400 text-black rounded-lg hover:opacity-90 transition-opacity"
            >
              Choose Basic
            </button>
          </div>

          {/* Unlimited Plan */}
          <div className="rounded-lg bg-zinc-800 p-6 shadow-lg border border-zinc-700 hover:border-yellow-400 transition-all">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-xl text-yellow-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                </svg>
              </span>
              <h2 className="text-xl font-bold text-white">Unlimited</h2>
            </div>
            <p className="text-xl font-bold text-white mb-2">$30/month</p>
            <p className="text-zinc-300 mb-4">
              Ideal for active traders and developers
            </p>
            
            <ul className="space-y-3 mb-6">
              <li className="flex items-center text-zinc-300">
                <svg className="w-5 h-5 mr-2 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                </svg>
                Real-time data streaming
              </li>
              <li className="flex items-center text-zinc-300">
                <svg className="w-5 h-5 mr-2 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                </svg>
                Websocket API (500 req/min)
              </li>
              <li className="flex items-center text-zinc-300">
                <svg className="w-5 h-5 mr-2 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                </svg>
                Extended hours trading
              </li>
            </ul>
            <button
              onClick={() => handleShowPlanDetails('unlimited')}
              className="w-full py-2 px-4 bg-yellow-400 text-black rounded-lg hover:opacity-90 transition-opacity"
            >
              Choose Unlimited
            </button>
          </div>

          {/* Premium Plan */}
          <div className="rounded-lg bg-zinc-800 p-6 shadow-lg border border-zinc-700 hover:border-yellow-400 transition-all">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-xl text-yellow-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                </svg>
              </span>
              <h2 className="text-xl font-bold text-white">Premium</h2>
            </div>
            <p className="text-xl font-bold text-white mb-2">$99/month</p>
            <p className="text-zinc-300 mb-4">
              Built for professional traders
            </p>
            
            <ul className="space-y-3 mb-6">
              <li className="flex items-center text-zinc-300">
                <svg className="w-5 h-5 mr-2 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                </svg>
                Level 2 market data
              </li>
              <li className="flex items-center text-zinc-300">
                <svg className="w-5 h-5 mr-2 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                </svg>
                Unlimited API requests
              </li>
              <li className="flex items-center text-zinc-300">
                <svg className="w-5 h-5 mr-2 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                </svg>
                Priority support
              </li>
            </ul>
            <button
              onClick={() => handleShowPlanDetails('premium')}
              className="w-full py-2 px-4 bg-yellow-400 text-black rounded-lg hover:opacity-90 transition-opacity"
            >
              Choose Premium
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <>
          {/* Modal Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={handleCloseModal}
          />

          {/* Plan Details Modal */}
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-zinc-800 rounded-lg p-6 shadow-xl z-50 w-full max-w-md">
            <ModalContent />
          </div>
        </>
      )}
    </div>
  );
};

export default InteractivePricingPlan;