import React, { useState, useEffect, useRef } from 'react';
import InteractivePremiumPlan from './Interactive';

const GenerativePremiumPricing = () => {
  const [isGenerating, setIsGenerating] = useState(true);
  const [generatedHtml, setGeneratedHtml] = useState('');
  const containerRef = useRef(null);

  const rawHtml = `
    <!-- Main Premium Plan Card -->
        <div id="mainCard" class="max-w-2xl w-full m-4 p-6 rounded-xl bg-black shadow-lg border border-zinc-800">
            <!-- Header with Premium Badge -->
            <div class="flex items-center justify-between mb-6">
                <div class="flex items-center gap-3">
                    <div class="relative">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                    </div>
                    <div>
                        <h1 class="text-2xl font-bold text-white">Premium Plan</h1>
                        <p class="text-zinc-400">Built for professional traders</p>
                    </div>
                </div>
                <div class="px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full text-black font-bold">
                    $99/month
                </div>
            </div>
     
            <!-- Premium Features Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <!-- Level 2 Market Data -->
                <div class="p-5 rounded-xl bg-zinc-900 border border-zinc-700">
                    <div class="flex items-start gap-4">
                        <div class="p-2 rounded-lg bg-yellow-400/10">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </div>
                        <div>
                            <h3 class="font-semibold text-white mb-1">Level 2 Market Data</h3>
                            <p class="text-sm text-zinc-400">Full order book depth visibility</p>
                        </div>
                    </div>
                </div>
     
                <!-- Unlimited API -->
                <div class="p-5 rounded-xl bg-zinc-900 border border-zinc-700">
                    <div class="flex items-start gap-4">
                        <div class="p-2 rounded-lg bg-yellow-400/10">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div>
                            <h3 class="font-semibold text-white mb-1">Unlimited API Access</h3>
                            <p class="text-sm text-zinc-400">No request limits</p>
                        </div>
                    </div>
                </div>
     
                <!-- Multi-asset Trading -->
                <div class="p-5 rounded-xl bg-zinc-900 border border-zinc-700">
                    <div class="flex items-start gap-4">
                        <div class="p-2 rounded-lg bg-yellow-400/10">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <div>
                            <h3 class="font-semibold text-white mb-1">Multi-asset Trading</h3>
                            <p class="text-sm text-zinc-400">Trade across multiple asset classes</p>
                        </div>
                    </div>
                </div>
     
                <!-- Priority Support -->
                <div class="p-5 rounded-xl bg-zinc-900 border border-zinc-700">
                    <div class="flex items-start gap-4">
                        <div class="p-2 rounded-lg bg-yellow-400/10">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                        <div>
                            <h3 class="font-semibold text-white mb-1">Priority Support</h3>
                            <p class="text-sm text-zinc-400">Dedicated email & chat support</p>
                        </div>
                    </div>
                </div>
            </div>
     
            <!-- Additional Features Section -->
            <div class="bg-zinc-900 rounded-xl p-6 mb-8">
                <h3 class="text-lg font-semibold text-white mb-4">Additional Premium Benefits</h3>
                <div class="space-y-4">
                    <div class="flex items-center gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span class="text-zinc-300">Institutional tools access</span>
                    </div>
                    <div class="flex items-center gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span class="text-zinc-300">Historical tick-by-tick data</span>
                    </div>
                    <div class="flex items-center gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span class="text-zinc-300">Unlimited concurrent connections</span>
                    </div>
                </div>
            </div>
     
            <!-- CTA Section -->
            <div class="text-center">
                <button onclick="showUpgradeModal()" class="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 transition-all text-black font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                    Upgrade to Premium
                </button>
                <p class="mt-3 text-sm text-zinc-400">
                    30-day money-back guarantee • Cancel anytime
                </p>
            </div>
        </div>
     
        <!-- Upgrade Modal -->
        <div id="upgradeModal" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div class="bg-zinc-900 p-6 rounded-xl max-w-md w-full m-4">
                <div class="text-center mb-6">
                    <div class="w-16 h-16 bg-yellow-400/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                    </div>
                    <h2 class="text-xl font-bold text-white">Upgrade to Premium</h2>
                    <p class="text-zinc-400 mt-2">Get access to professional trading features</p>
                </div>
     
                <!-- Billing Options -->
                <div class="space-y-3 mb-6">
                    <label class="flex items-center justify-between p-4 rounded-lg border border-zinc-700 cursor-pointer">
                        <div class="flex items-center gap-3">
                            <input type="radio" name="billing" value="monthly" checked class="text-yellow-400 focus:ring-yellow-400">
                            <span class="text-white">Monthly Billing</span>
                        </div>
                        <span class="font-semibold text-white">$99/mo</span>
                    </label>
                    <label class="flex items-center justify-between p-4 rounded-lg border border-zinc-700 cursor-pointer">
                        <div class="flex items-center gap-3">
                            <input type="radio" name="billing" value="annual" class="text-yellow-400 focus:ring-yellow-400">
                            <div>
                                <span class="text-white">Annual Billing</span>
                                <span class="ml-2 px-2 py-0.5 rounded-full bg-green-900 text-green-400 text-xs">Save 20%</span>
                            </div>
                        </div>
                        <span class="font-semibold text-white">$79/mo</span>
                    </label>
                </div>
     
                <div class="flex gap-3">
                    <button onclick="processUpgrade()" class="flex-1 px-4 py-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 transition-colors text-black font-semibold">
                        Confirm Upgrade
                    </button>
                    <button onclick="hideUpgradeModal()" class="px-4 py-2 rounded-lg border border-zinc-700 text-zinc-300 hover:bg-zinc-800 transition-colors">
                        Cancel
                    </button>
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

  return isGenerating ? (
    <div
      ref={containerRef}
      dangerouslySetInnerHTML={{ __html: generatedHtml }}
      className="flex items-center justify-center min-h-screen w-full bg-black"
    />
  ) : (
    <InteractivePremiumPlan />
  );
};

export default GenerativePremiumPricing;