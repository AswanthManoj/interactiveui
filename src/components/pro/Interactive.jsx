import React, { useState, useEffect } from 'react';

const InteractiveProPlan = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    name: '',
    terms: false
  });
  const [nextBillingDate, setNextBillingDate] = useState('');

  const validateForm = () => {
    return formData.cardNumber && formData.expiry && formData.cvv && 
           formData.name && formData.terms;
  };

  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\D/g, '');
    let formatted = '';
    for (let i = 0; i < cleaned.length; i++) {
      if (i > 0 && i % 4 === 0) formatted += ' ';
      formatted += cleaned[i];
    }
    return formatted.slice(0, 19);
  };

  const formatExpiry = (value) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  const handleInputChange = (e) => {
    let { name, value, type, checked } = e.target;
    
    if (name === 'cardNumber') {
      value = formatCardNumber(value);
    } else if (name === 'expiry') {
      value = formatExpiry(value);
    } else if (name === 'cvv') {
      value = value.replace(/\D/g, '').slice(0, 3);
    }

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSimulatePayment = () => {
    setShowPaymentModal(false);
    
    const nextDate = new Date();
    nextDate.setMonth(nextDate.getMonth() + 1);
    setNextBillingDate(nextDate.toLocaleDateString());
    
    setTimeout(() => {
      setShowSuccessModal(true);
    }, 1000);
  };

  const handleCloseSuccess = () => {
    setShowSuccessModal(false);
    setIsSubscribed(true);
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-black">
      {/* Main Card */}
      <div className="max-w-2xl w-full m-4 p-6 rounded-xl bg-black shadow-lg border border-zinc-800">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <h1 className="text-2xl font-bold text-white">Alpaca Markets Unlimited Plan</h1>
          {isSubscribed && (
            <div className="ml-auto px-3 py-1 rounded-full bg-green-900 text-green-400 text-sm font-medium">
              Active Subscription
            </div>
          )}
        </div>

        {/* Pricing Section */}
        <div className="flex items-center gap-3 mb-6">
          <div className="text-3xl font-bold text-white">$30</div>
          <div className="text-zinc-400">/month</div>
          <div className="px-3 py-1 rounded-full bg-yellow-400 text-black text-sm font-medium">
            Popular Choice
          </div>
        </div>

        {/* Subtitle */}
        <div className="flex items-center gap-2 mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z" />
          </svg>
          <p className="text-zinc-300 italic">Ideal for active traders and developers</p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Real-time Data */}
          <div className="p-4 rounded-lg bg-zinc-900">
            <div className="flex items-center gap-3 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <h3 className="font-semibold text-white">Real-time Data</h3>
            </div>
            <p className="text-zinc-400 text-sm">Live market data streaming for immediate insights</p>
          </div>

          {/* API Access */}
          <div className="p-4 rounded-lg bg-zinc-900">
            <div className="flex items-center gap-3 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              <h3 className="font-semibold text-white">Enhanced API</h3>
            </div>
            <p className="text-zinc-400 text-sm">Websocket API with 500 requests/min</p>
          </div>

          {/* Extended Hours */}
          <div className="p-4 rounded-lg bg-zinc-900">
            <div className="flex items-center gap-3 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="font-semibold text-white">Extended Hours</h3>
            </div>
            <p className="text-zinc-400 text-sm">Trading from 4AM - 8PM ET</p>
          </div>

          {/* Advanced Orders */}
          <div className="p-4 rounded-lg bg-zinc-900">
            <div className="flex items-center gap-3 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="font-semibold text-white">Advanced Orders</h3>
            </div>
            <p className="text-zinc-400 text-sm">Bracket and OCO order types</p>
          </div>
        </div>

        {/* Additional Features List */}
        <div className="space-y-3 mb-8">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-zinc-300">Up to 10 concurrent connections</span>
          </div>
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-zinc-300">Historical data access included</span>
          </div>
        </div>

        {/* Subscribe Button */}
        <button
          onClick={() => !isSubscribed && setShowPaymentModal(true)}
          disabled={isSubscribed}
          className={`w-full px-6 py-3 rounded-lg flex items-center justify-center gap-2 font-semibold transition-colors ${
            isSubscribed 
              ? 'bg-green-900 text-green-400 cursor-not-allowed opacity-75'
              : 'bg-yellow-400 hover:bg-yellow-500 text-black'
          }`}
        >
          {isSubscribed ? (
            <>
              <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Subscription Active
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              Subscribe Now - $30/month
            </>
          )}
        </button>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-zinc-900 p-6 rounded-xl max-w-md w-full m-4">
            <h2 className="text-xl font-bold text-white mb-6">Complete Your Subscription</h2>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-4 py-2 rounded-lg border border-zinc-700 bg-zinc-800 text-white placeholder-zinc-400"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Expiry Date</label>
                  <input
                    type="text"
                    name="expiry"
                    value={formData.expiry}
                    onChange={handleInputChange}
                    placeholder="MM/YY"
                    className="w-full px-4 py-2 rounded-lg border border-zinc-700 bg-zinc-800 text-white placeholder-zinc-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    placeholder="123"
                    className="w-full px-4 py-2 rounded-lg border border-zinc-700 bg-zinc-800 text-white placeholder-zinc-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Name on Card</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-2 rounded-lg border border-zinc-700 bg-zinc-800 text-white placeholder-zinc-400"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleInputChange}
                  className="w-4 h-4 accent-yellow-400"
                />
                <label className="text-sm text-zinc-300">
                  I agree to the terms and conditions
                </label>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleSimulatePayment}
                  disabled={!validateForm()}
                  className={`flex-1 px-4 py-2 rounded-lg font-semibold ${
                    validateForm()
                      ? 'bg-yellow-400 hover:bg-yellow-500 text-black'
                      : 'bg-zinc-700 text-zinc-400 cursor-not-allowed'
                  }`}
                >
                  Pay $30
                </button>
                <button
                  type="button"
                  onClick={() => setShowPaymentModal(false)}
                  className="px-4 py-2 rounded-lg border border-zinc-700 text-zinc-300 hover:bg-zinc-800 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-zinc-900 p-6 rounded-xl max-w-md w-full m-4 text-center">
            <div className="w-16 h-16 bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Welcome to Unlimited Plan!</h2>
            <p className="text-zinc-400 mb-6">Your subscription has been activated successfully.</p>
            
            <div className="space-y-3 text-left">
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-400">Subscription Status</span>
                <span className="text-green-500">Active</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-400">Billing Cycle</span>
                <span className="text-green-500">Monthly</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-400">Next Billing Date</span>
                <span className="text-green-500">{nextBillingDate}</span>
              </div>
            </div>

            <button
              onClick={handleCloseSuccess}
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

export default InteractiveProPlan;