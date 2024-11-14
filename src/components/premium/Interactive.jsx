import React, { useState } from 'react';

const InteractivePremiumPlan = () => {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [selectedBilling, setSelectedBilling] = useState('monthly');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isActivated, setIsActivated] = useState(false);

  const getNextBillingDate = (billingOption) => {
    const date = new Date();
    if (billingOption === 'monthly') {
      date.setMonth(date.getMonth() + 1);
    } else {
      date.setFullYear(date.getFullYear() + 1);
    }
    return date.toLocaleDateString();
  };

  const handleUpgrade = () => {
    setIsProcessing(true);
    
    setTimeout(() => {
      setShowUpgradeModal(false);
      setIsActivated(true);
      showSuccessNotification();
    }, 2000);
  };

  const showSuccessNotification = () => {
    // This would be implemented using a Toast library in a real app
    // For this example, we'll create a DOM element
    const successNotification = document.createElement('div');
    successNotification.className = 'fixed bottom-4 right-4 max-w-md bg-zinc-900 rounded-lg shadow-lg border border-zinc-700 p-4 transform transition-all duration-500 translate-y-full';
    successNotification.innerHTML = `
      <div class="flex items-start gap-4">
        <div class="flex-shrink-0">
          <svg class="h-6 w-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <div>
          <h3 class="text-sm font-medium text-white">Premium Plan Activated</h3>
          <div class="mt-1 text-sm text-zinc-400">
            <p>Your premium features are now active. Billing cycle: ${selectedBilling}</p>
            <p class="mt-1">Next billing date: ${getNextBillingDate(selectedBilling)}</p>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(successNotification);
    
    setTimeout(() => {
      successNotification.classList.remove('translate-y-full');
    }, 100);
    
    setTimeout(() => {
      successNotification.classList.add('translate-y-full');
      setTimeout(() => {
        successNotification.remove();
      }, 500);
    }, 5000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-black">
      {/* Main Premium Plan Card */}
      <div id="mainCard" className="max-w-2xl w-full m-4 p-6 rounded-xl bg-black shadow-lg border border-zinc-800">
        {/* Header with Premium Badge */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              {isActivated && (
                <div className="absolute -top-2 -right-2 px-2 py-1 rounded-full bg-green-500 text-white text-xs font-medium">
                  Active
                </div>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Premium Plan</h1>
              <p className="text-zinc-400">Built for professional traders</p>
            </div>
          </div>
          <div className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full text-black font-bold">
            $99/month
          </div>
        </div>

        {/* Premium Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Level 2 Market Data */}
          <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-700">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-yellow-400/10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Level 2 Market Data</h3>
                <p className="text-sm text-zinc-400">Full order book depth visibility</p>
              </div>
            </div>
          </div>

          {/* Unlimited API */}
          <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-700">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-yellow-400/10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Unlimited API Access</h3>
                <p className="text-sm text-zinc-400">No request limits</p>
              </div>
            </div>
          </div>

          {/* Multi-asset Trading */}
          <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-700">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-yellow-400/10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Multi-asset Trading</h3>
                <p className="text-sm text-zinc-400">Trade across multiple asset classes</p>
              </div>
            </div>
          </div>

          {/* Priority Support */}
          <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-700">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-yellow-400/10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Priority Support</h3>
                <p className="text-sm text-zinc-400">Dedicated email & chat support</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Features Section */}
        <div className="bg-zinc-900 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-white mb-4">Additional Premium Benefits</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-zinc-300">Institutional tools access</span>
            </div>
            <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-zinc-300">Historical tick-by-tick data</span>
            </div>
            <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-zinc-300">Unlimited concurrent connections</span>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <button
            onClick={() => !isActivated && setShowUpgradeModal(true)}
            disabled={isActivated}
            className={`w-full px-6 py-3 rounded-lg ${
              isActivated
                ? 'bg-green-900 cursor-not-allowed opacity-75'
                : 'bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600'
            } transition-all text-black font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2`}
          >
            {isActivated ? (
              <>
                <svg className="h-5 w-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Premium Plan Activated
              </>
            ) : isProcessing ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Processing...
              </>
            ) : (
              'Upgrade to Premium'
            )}
          </button>
          <p className="mt-3 text-sm text-zinc-400">
            30-day money-back guarantee • Cancel anytime
          </p>
        </div>
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            onClick={() => setShowUpgradeModal(false)}
          >
            <div 
              className="bg-zinc-900 p-6 rounded-xl max-w-md w-full m-4"
              onClick={e => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-yellow-400/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-white">Upgrade to Premium</h2>
                <p className="text-zinc-400 mt-2">Get access to professional trading features</p>
              </div>

              {/* Billing Options */}
              <div className="space-y-3 mb-6">
                <label 
                  className={`flex items-center justify-between p-4 rounded-lg border border-zinc-700 cursor-pointer transition-all ${
                    selectedBilling === 'monthly' ? 'ring-2 ring-yellow-400' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="billing"
                      value="monthly"
                      checked={selectedBilling === 'monthly'}
                      onChange={(e) => setSelectedBilling(e.target.value)}
                      className="text-yellow-400 focus:ring-yellow-400"
                    />
                    <span className="text-white">Monthly Billing</span>
                  </div>
                  <span className="font-semibold text-white">$99/mo</span>
                </label>
                <label 
                  className={`flex items-center justify-between p-4 rounded-lg border border-zinc-700 cursor-pointer transition-all ${
                    selectedBilling === 'annual' ? 'ring-2 ring-yellow-400' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="billing"
                      value="annual"
                      checked={selectedBilling === 'annual'}
                      onChange={(e) => setSelectedBilling(e.target.value)}
                      className="text-yellow-400 focus:ring-yellow-400"
                    />
                    <div>
                      <span className="text-white">Annual Billing</span>
                      <span className="ml-2 px-2 py-0.5 rounded-full bg-green-900 text-green-400 text-xs">Save 20%</span>
                    </div>
                  </div>
                  <span className="font-semibold text-white">$79/mo</span>
                </label>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleUpgrade}
                  className="flex-1 px-4 py-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 transition-colors text-black font-semibold"
                >
                  Confirm Upgrade
                </button>
                <button
                  onClick={() => setShowUpgradeModal(false)}
                  className="px-4 py-2 rounded-lg border border-zinc-700 text-zinc-300 hover:bg-zinc-800 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default InteractivePremiumPlan;