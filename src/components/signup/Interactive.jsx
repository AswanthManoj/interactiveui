import React, { useState } from 'react';

const InteractiveSignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    termsAccepted: false
  });
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [signedIn, setSignedIn] = useState(false);

  const showNotification = (message, type) => {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 max-w-sm p-4 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out ${
      type === 'error' 
        ? 'bg-red-900/50 border border-red-800' 
        : 'bg-green-900/50 border border-green-800'
    }`;
    
    notification.innerHTML = `
      <div class="flex items-center gap-3">
        <div class="flex-shrink-0">
          ${type === 'error' 
            ? `<svg class="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
               </svg>`
            : `<svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
               </svg>`
          }
        </div>
        <div>
          <p class="text-sm font-medium ${
            type === 'error' 
              ? 'text-red-200' 
              : 'text-green-200'
          }">${message}</p>
        </div>
      </div>
    `;

    document.body.appendChild(notification);
    requestAnimationFrame(() => {
      notification.style.transform = 'translateX(0)';
    });

    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.termsAccepted) {
      showNotification('Please fill in all fields and accept the terms', 'error');
      return;
    }

    if (!formData.email.includes('@')) {
      showNotification('Please enter a valid email address', 'error');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setShowSuccess(true);
      setSignedIn(true); // Set signed in state to true
      setLoading(false);
    }, 1500);
  };

  const handleReset = () => {
    setSignedIn(false);
    setShowSuccess(false);
    setFormData({
      name: '',
      email: '',
      termsAccepted: false
    });
    showNotification('Successfully signed out', 'success');
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-black">
      <div className="w-full max-w-md relative">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#facc15] rounded-full opacity-10 blur-xl"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#facc15] rounded-full opacity-10 blur-xl"></div>

        <div className="backdrop-blur-sm bg-[#27272a]/90 rounded-2xl shadow-2xl p-8 border border-gray-700 relative z-10">
          {!signedIn ? (
            <>
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-[#facc15] to-[#fbbf24] rounded-2xl mx-auto mb-4 flex items-center justify-center transform rotate-12">
                  <svg className="w-8 h-8 text-black transform -rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-[#ffffff] mb-2">Create Account</h2>
                <p className="text-[#d4d4d8] text-sm">Join Alpaca Markets today</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[#ffffff] flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#facc15] bg-[#27272a]/50 text-[#ffffff] placeholder-gray-400"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[#ffffff] flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#facc15] bg-[#27272a]/50 text-[#ffffff] placeholder-gray-400"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.termsAccepted}
                    onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
                    className="rounded border-gray-600 text-[#facc15] focus:ring-[#facc15] bg-[#27272a]"
                  />
                  <label className="text-sm text-[#d4d4d8]">
                    I agree to the <a href="#" className="text-[#facc15] hover:underline">Terms</a> and{' '}
                    <a href="#" className="text-[#facc15] hover:underline">Privacy Policy</a>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-[#facc15] to-[#fbbf24] text-black font-medium py-3 px-4 rounded-lg transition duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg"
                >
                  {loading ? (
                    <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                  ) : (
                    <>
                      <span>Create Account</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                      </svg>
                    </>
                  )}
                </button>

                <p className="text-center text-sm text-[#d4d4d8]">
                  Already have an account?{' '}
                  <a href="#" className="text-[#facc15] hover:underline font-medium">Sign in</a>
                </p>
              </form>
            </>
          ) : (
            <div className="animate-fade-in">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-[#facc15] to-[#fbbf24] rounded-2xl mx-auto mb-4 flex items-center justify-center transform rotate-12">
                  <svg className="w-8 h-8 text-black transform -rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-[#ffffff] mb-2">Welcome Back!</h2>
                <p className="text-[#d4d4d8] text-sm">You are signed in as {formData.email}</p>
              </div>

              <div className="space-y-4">
                {/* Account Status */}
                <div className="p-4 rounded-lg bg-green-900/50 border border-green-800">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-green-200">Active Session</p>
                      <p className="text-sm text-green-300">Account verified and active</p>
                    </div>
                  </div>
                </div>

                {/* Account Details */}
                <div className="space-y-3 p-4 rounded-lg bg-[#27272a]/50 border border-gray-700">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#d4d4d8]">Full Name</span>
                    <span className="text-sm font-medium text-[#ffffff]">{formData.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#d4d4d8]">Email</span>
                    <span className="text-sm font-medium text-[#ffffff]">{formData.email}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#d4d4d8]">Status</span>
                    <span className="text-sm font-medium text-green-400">Active</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    type="button"
                    className="w-full bg-[#27272a] hover:bg-[#323232] text-white font-medium py-3 px-4 rounded-lg transition duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 border border-gray-700"
                  >
                    <span>Go to Dashboard</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                    </svg>
                  </button>

                  <button
                    onClick={handleReset}
                    className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-500 font-medium py-3 px-4 rounded-lg transition duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 border border-red-500/20"
                  >
                    <span>Sign Out</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InteractiveSignup;