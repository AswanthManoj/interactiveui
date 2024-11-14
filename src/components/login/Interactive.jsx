import React, { useState, useEffect } from 'react';

const InteractiveLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [accountType, setAccountType] = useState('paper');
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedInStatus);
    if (loggedInStatus) {
      setEmail(localStorage.getItem('userEmail') || '');
    }
  }, []);

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

    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      notification.style.opacity = '0';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      showNotification('Please fill in all fields', 'error');
      return;
    }

    if (!email.includes('@')) {
      showNotification('Please enter a valid email address', 'error');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', email);
      setIsLoggedIn(true);
      setLoading(false);
      showNotification('Logged in successfully', 'success');
    }, 1500);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
    showNotification('Logged out successfully', 'success');
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-black">
      <div className="w-full max-w-md relative">
        <div className="absolute -top-10 -left-10 w-20 h-20 bg-[#facc15] rounded-full opacity-20 blur-xl"></div>
        <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-[#facc15] rounded-full opacity-20 blur-xl"></div>

        <div className="backdrop-blur-sm bg-[#27272a]/90 rounded-2xl shadow-2xl p-8 border border-gray-700">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#facc15] rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-[#ffffff] mb-2">Welcome Back</h2>
            <p className="text-[#d4d4d8] text-sm">Access your Alpaca Markets account</p>
          </div>

          {!isLoggedIn ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input Group */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#ffffff] flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#facc15] bg-[#27272a]/50 text-[#ffffff] placeholder-gray-400"
                  placeholder="Enter your email"
                  required
                />
              </div>

              {/* Password Input Group */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#ffffff] flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                  </svg>
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#facc15] bg-[#27272a]/50 text-[#ffffff] placeholder-gray-400"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {showPassword ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                      )}
                    </svg>
                  </button>
                </div>
              </div>

              {/* Account Type Selection */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#ffffff] flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                  </svg>
                  Account Type
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      name="accountType"
                      value="live"
                      checked={accountType === 'live'}
                      onChange={(e) => setAccountType(e.target.value)}
                      className="peer hidden"
                    />
                    <div className="p-3 text-center rounded-lg border border-gray-600 peer-checked:border-[#facc15] peer-checked:bg-[#facc15]/10 transition-all">
                      <span className="text-sm font-medium text-[#ffffff]">Live Trading</span>
                    </div>
                  </label>
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      name="accountType"
                      value="paper"
                      checked={accountType === 'paper'}
                      onChange={(e) => setAccountType(e.target.value)}
                      className="peer hidden"
                    />
                    <div className="p-3 text-center rounded-lg border border-gray-600 peer-checked:border-[#facc15] peer-checked:bg-[#facc15]/10 transition-all">
                      <span className="text-sm font-medium text-[#ffffff]">Paper Trading</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-gray-600 text-[#facc15] focus:ring-[#facc15] bg-[#27272a]"
                  />
                  <span className="text-[#d4d4d8]">Remember me</span>
                </label>
                <button
                  type="button"
                  className="text-[#facc15] hover:text-[#fbbf24] transition-colors"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#facc15] hover:bg-[#fbbf24] text-black font-medium py-3 px-4 rounded-lg transition transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
              >
                {loading ? (
                  <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                ) : (
                  <>
                    <span>Sign In</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                    </svg>
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="animate-fade-in">
              <div className="mt-6 p-4 rounded-lg bg-green-900/50 border border-green-800">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-green-200">Login successful!</p>
                    <p className="text-sm text-green-300">Logged in as {email}</p>
                  </div>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="mt-4 w-full px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition-colors transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InteractiveLogin;