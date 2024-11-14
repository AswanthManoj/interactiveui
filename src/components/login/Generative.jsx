import React, { useState, useEffect, useRef } from 'react';
import InteractiveLogin from './Interactive';

const GenerativeLogin = () => {
  const [isGenerating, setIsGenerating] = useState(true);
  const [generatedHtml, setGeneratedHtml] = useState('');
  const containerRef = useRef(null);

  const rawHtml = `
    <div class="w-full max-w-md relative">
      <div class="absolute -top-10 -left-10 w-20 h-20 bg-[#facc15] rounded-full opacity-20 blur-xl"></div>
      <div class="absolute -bottom-10 -right-10 w-20 h-20 bg-[#facc15] rounded-full opacity-20 blur-xl"></div>
    
      <div class="backdrop-blur-sm bg-[#27272a]/90 rounded-2xl shadow-2xl p-8 border border-gray-700">
        <div class="text-center mb-8">
          <div class="w-16 h-16 bg-[#facc15] rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg class="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-[#ffffff] mb-2">Welcome Back</h2>
          <p class="text-[#d4d4d8] text-sm">Access your Alpaca Markets account</p>
        </div>

        <form class="space-y-6">
          <div class="space-y-2">
            <label class="block text-sm font-medium text-[#ffffff] flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              Email Address
            </label>
            <input type="email" class="w-full px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#facc15] bg-[#27272a]/50 text-[#ffffff] placeholder-gray-400" placeholder="Enter your email">
          </div>

          <div class="space-y-2">
            <label class="block text-sm font-medium text-[#ffffff] flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
              Password
            </label>
            <div class="relative">
              <input type="password" class="w-full px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#facc15] bg-[#27272a]/50 text-[#ffffff] placeholder-gray-400" placeholder="Enter your password">
              <button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
              </button>
            </div>
          </div>

          <div class="space-y-2">
            <label class="block text-sm font-medium text-[#ffffff] flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
              </svg>
              Account Type
            </label>
            <div class="grid grid-cols-2 gap-4">
              <label class="cursor-pointer">
                <input type="radio" name="accountType" value="live" class="peer hidden">
                <div class="p-3 text-center rounded-lg border border-gray-600 peer-checked:border-[#facc15] peer-checked:bg-[#facc15]/10 transition-all">
                  <span class="text-sm font-medium text-[#ffffff]">Live Trading</span>
                </div>
              </label>
              <label class="cursor-pointer">
                <input type="radio" name="accountType" value="paper" class="peer hidden" checked>
                <div class="p-3 text-center rounded-lg border border-gray-600 peer-checked:border-[#facc15] peer-checked:bg-[#facc15]/10 transition-all">
                  <span class="text-sm font-medium text-[#ffffff]">Paper Trading</span>
                </div>
              </label>
            </div>
          </div>

          <div class="flex items-center justify-between text-sm">
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" class="rounded border-gray-600 text-[#facc15] focus:ring-[#facc15]">
              <span class="text-[#d4d4d8]">Remember me</span>
            </label>
            <button type="button" class="text-[#facc15] hover:text-[#fbbf24] transition-colors">
              Forgot Password?
            </button>
          </div>

          <button type="submit" class="w-full bg-[#facc15] hover:bg-[#fbbf24] text-black font-medium py-3 px-4 rounded-lg transition transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2">
            <span>Sign In</span>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
            </svg>
          </button>
        </form>
      </div>
    </div>
  `;

  useEffect(() => {
    const lines = rawHtml
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    let currentHtml = '';
    let lineIndex = 0;

    const generateLine = () => {
      if (lineIndex < lines.length) {
        currentHtml += lines[lineIndex] + '\n';
        setGeneratedHtml(currentHtml);
        lineIndex++;
        setTimeout(generateLine, 50);
      } else {
        setTimeout(() => {
          setIsGenerating(false);
        }, 1000);
      }
    };

    generateLine();

    return () => {
      clearTimeout(generateLine);
    };
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-[#000000]">
      {isGenerating ? (
        <div 
          ref={containerRef}
          dangerouslySetInnerHTML={{ __html: generatedHtml }}
          className="flex items-center justify-center min-h-screen w-full bg-black"
        />
      ) : (
        <InteractiveLogin />
      )}
    </div>
  );
};

export default GenerativeLogin;