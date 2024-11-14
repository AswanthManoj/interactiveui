import React, { useState, useEffect, useRef } from 'react';
import InteractiveProPlan from './Interactive';

const GenerativeProPlan = () => {
  const [isGenerating, setIsGenerating] = useState(true);
  const [generatedHtml, setGeneratedHtml] = useState('');
  const containerRef = useRef(null);

  const rawHtml = `
    <!-- Main Content Card -->
        <div id="mainCard" class="max-w-2xl w-full m-4 p-6 rounded-xl bg-black shadow-lg border border-zinc-800">
            <!-- Header Section -->
            <div class="flex items-center gap-3 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <h1 class="text-2xl font-bold text-white">Alpaca Markets Unlimited Plan</h1>
            </div>
     
            <!-- Pricing Section -->
            <div class="flex items-center gap-3 mb-6">
                <div class="text-3xl font-bold text-white">$30</div>
                <div class="text-zinc-400">/month</div>
                <div class="px-3 py-1 rounded-full bg-yellow-400 text-black text-sm font-medium">
                    Popular Choice
                </div>
            </div>
     
            <!-- Subtitle -->
            <div class="flex items-center gap-2 mb-8">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z" />
                </svg>
                <p class="text-zinc-300 italic">Ideal for active traders and developers</p>
            </div>
     
            <!-- Features Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <!-- Real-time Data -->
                <div class="p-4 rounded-lg bg-zinc-900">
                    <div class="flex items-center gap-3 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <h3 class="font-semibold text-white">Real-time Data</h3>
                    </div>
                    <p class="text-zinc-400 text-sm">Live market data streaming for immediate insights</p>
                </div>
     
                <!-- API Access -->
                <div class="p-4 rounded-lg bg-zinc-900">
                    <div class="flex items-center gap-3 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                        <h3 class="font-semibold text-white">Enhanced API</h3>
                    </div>
                    <p class="text-zinc-400 text-sm">Websocket API with 500 requests/min</p>
                </div>
     
                <!-- Extended Hours -->
                <div class="p-4 rounded-lg bg-zinc-900">
                    <div class="flex items-center gap-3 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 class="font-semibold text-white">Extended Hours</h3>
                    </div>
                    <p class="text-zinc-400 text-sm">Trading from 4AM - 8PM ET</p>
                </div>
     
                <!-- Advanced Orders -->
                <div class="p-4 rounded-lg bg-zinc-900">
                    <div class="flex items-center gap-3 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 class="font-semibold text-white">Advanced Orders</h3>
                    </div>
                    <p class="text-zinc-400 text-sm">Bracket and OCO order types</p>
                </div>
            </div>
     
            <!-- Additional Features List -->
            <div class="space-y-3 mb-8">
                <div class="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span class="text-zinc-300">Up to 10 concurrent connections</span>
                </div>
                <div class="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span class="text-zinc-300">Historical data access included</span>
                </div>
            </div>
     
            <!-- Subscribe Button -->
            <button onclick="showPaymentModal()" class="w-full px-6 py-3 rounded-lg bg-yellow-400 hover:bg-yellow-500 transition-colors text-black font-semibold flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                Subscribe Now - $30/month
            </button>
        </div>
     
        <!-- Payment Modal -->
        <div id="paymentModal" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div class="bg-zinc-900 p-6 rounded-xl max-w-md w-full m-4">
                <h2 class="text-xl font-bold text-white mb-6">Complete Your Subscription</h2>
                
                <!-- Payment Form -->
                <form id="paymentForm" class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-zinc-300 mb-1">Card Number</label>
                        <input type="text" placeholder="1234 5678 9012 3456" class="w-full px-4 py-2 rounded-lg border border-zinc-700 bg-zinc-800 text-white">
                    </div>
                    
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-zinc-300 mb-1">Expiry Date</label>
                            <input type="text" placeholder="MM/YY" class="w-full px-4 py-2 rounded-lg border border-zinc-700 bg-zinc-800 text-white">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-zinc-300 mb-1">CVV</label>
                            <input type="text" placeholder="123" class="w-full px-4 py-2 rounded-lg border border-zinc-700 bg-zinc-800 text-white">
                        </div>
                    </div>
     
                    <div>
                        <label class="block text-sm font-medium text-zinc-300 mb-1">Name on Card</label>
                        <input type="text" placeholder="John Doe" class="w-full px-4 py-2 rounded-lg border border-zinc-700 bg-zinc-800 text-white">
                    </div>
     
                    <div class="flex items-center gap-2">
                        <input type="checkbox" id="terms" class="w-4 h-4 accent-yellow-400">
                        <label for="terms" class="text-sm text-zinc-300">I agree to the terms and conditions</label>
                    </div>
     
                    <div class="flex gap-3">
                        <button type="button" onclick="simulatePayment()" class="flex-1 px-4 py-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 transition-colors text-black font-semibold">
                            Pay $30
                        </button>
                        <button type="button" onclick="hidePaymentModal()" class="px-4 py-2 rounded-lg border border-zinc-700 text-zinc-300 hover:bg-zinc-800 transition-colors">
                            Cancel
                        </button>
                    </div>
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

  return isGenerating ? (
    <div
      ref={containerRef}
      dangerouslySetInnerHTML={{ __html: generatedHtml }}
      className="flex items-center justify-center min-h-screen w-full bg-black"
    />
  ) : (
    <InteractiveProPlan />
  );
};

export default GenerativeProPlan;