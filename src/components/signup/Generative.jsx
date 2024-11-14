import React, { useState, useEffect, useRef } from 'react';
import InteractiveSignup from './Interactive';

const GenerativeSignup = () => {
  const [isGenerating, setIsGenerating] = useState(true);
  const [generatedHtml, setGeneratedHtml] = useState('');
  const containerRef = useRef(null);

  const rawHtml = `
        <div class="w-full max-w-md relative">
            <!-- Decorative Elements -->
            <div class="absolute -top-10 -right-10 w-32 h-32 bg-[#facc15] rounded-full opacity-10 blur-xl"></div>
            <div class="absolute -bottom-10 -left-10 w-32 h-32 bg-[#facc15] rounded-full opacity-10 blur-xl"></div>
     
            <!-- Main Card -->
            <div class="backdrop-blur-sm bg-[#27272a]/90 rounded-2xl shadow-2xl p-8 border border-gray-700 relative z-10">
                <!-- Header -->
                <div class="text-center mb-8">
                    <div class="w-16 h-16 bg-gradient-to-br from-[#facc15] to-[#fbbf24] rounded-2xl mx-auto mb-4 flex items-center justify-center transform rotate-12">
                        <svg class="w-8 h-8 text-black transform -rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
                        </svg>
                    </div>
                    <h2 class="text-2xl font-bold text-[#ffffff] mb-2">Create Account</h2>
                    <p class="text-[#d4d4d8] text-sm">Join Alpaca Markets today</p>
                </div>
     
                <!-- Signup Form -->
                <form id="signupForm" class="space-y-6">
                    <!-- Name Input -->
                    <div class="space-y-2">
                        <label for="name" class="block text-sm font-medium text-[#ffffff] flex items-center gap-2">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                            </svg>
                            Full Name
                        </label>
                        <input type="text" id="name" required
                            class="w-full px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#facc15] bg-[#27272a]/50 text-[#ffffff] placeholder-gray-400"
                            placeholder="Enter your full name">
                    </div>
     
                    <!-- Email Input -->
                    <div class="space-y-2">
                        <label for="email" class="block text-sm font-medium text-[#ffffff] flex items-center gap-2">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                            </svg>
                            Email Address
                        </label>
                        <input type="email" id="email" required
                            class="w-full px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#facc15] bg-[#27272a]/50 text-[#ffffff] placeholder-gray-400"
                            placeholder="Enter your email">
                    </div>
     
                    <!-- Terms Checkbox -->
                    <div class="flex items-center gap-2">
                        <input type="checkbox" id="terms" required
                            class="rounded border-gray-300 text-[#facc15] focus:ring-[#facc15]">
                        <label for="terms" class="text-sm text-[#d4d4d8]">
                            I agree to the <a href="#" class="text-[#facc15] hover:underline">Terms</a> and <a href="#" class="text-[#facc15] hover:underline">Privacy Policy</a>
                        </label>
                    </div>
     
                    <!-- Submit Button -->
                    <button type="submit"
                        class="w-full bg-gradient-to-r from-[#facc15] to-[#fbbf24] text-black font-medium py-3 px-4 rounded-lg transition duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg">
                        <span>Create Account</span>
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                        </svg>
                    </button>
     
                    <!-- Login Link -->
                    <p class="text-center text-sm text-[#d4d4d8]">
                        Already have an account? 
                        <a href="#" class="text-[#facc15] hover:underline font-medium">Sign in</a>
                    </p>
                </form>
     
                <!-- Success Message (Hidden by default) -->
                <div id="successMessage" class="hidden">
                    <div class="mt-6 p-6 rounded-lg bg-green-900/50 border border-green-800 text-center">
                        <div class="w-16 h-16 bg-green-800 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <svg class="w-8 h-8 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                            </svg>
                        </div>
                        <h3 class="text-xl font-semibold text-green-200 mb-2">Account Created!</h3>
                        <p class="text-green-300">Redirecting to your dashboard...</p>
                    </div>
                </div>
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
        <InteractiveSignup />
      )}
    </div>
  );
};

export default GenerativeSignup;