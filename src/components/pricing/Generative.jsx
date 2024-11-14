import React, { useState, useEffect, useRef } from 'react';
import InteractivePricingPlan from './Interactive';

const GenerativePricing = () => {
  const [isGenerating, setIsGenerating] = useState(true);
  const [generatedHtml, setGeneratedHtml] = useState('');
  const containerRef = useRef(null);

  const rawHtml = `
    <!-- Main Content -->
        <div class="max-w-4xl w-full space-y-8">
            <!-- Header -->
            <div class="text-center">
                <h1 class="text-4xl font-bold text-black dark:text-white mb-4">Alpaca Markets Pricing</h1>
            </div>
     
            <!-- Pricing Cards Grid -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <!-- Basic Plan -->
                <div class="rounded-lg bg-white dark:bg-zinc-800 p-6 shadow-lg border border-zinc-200 dark:border-zinc-700 hover:border-yellow-400 dark:hover:border-yellow-400 transition-all">
                    <div class="flex items-center space-x-2 mb-3 sm:mb-4">
                        <span class="text-xl sm:text-2xl text-yellow-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                        </svg>
                        </span>
                        <h2 class="text-xl sm:text-2xl font-bold text-black dark:text-white">Basic</h2>
                    </div>
                    <p class="text-xl font-bold text-black dark:text-white mb-2">Free</p>
                    <p class="text-zinc-600 dark:text-zinc-300 mb-4">Perfect for beginners and algorithm testing</p>
                    
                    <ul class="space-y-3 mb-6">
                        <li class="flex items-center text-zinc-700 dark:text-zinc-300">
                            <svg class="w-5 h-5 mr-2 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                            </svg>
                            Zero commission trading
                        </li>
                        <li class="flex items-center text-zinc-700 dark:text-zinc-300">
                            <svg class="w-5 h-5 mr-2 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                            </svg>
                            REST API (200 req/min)
                        </li>
                        <li class="flex items-center text-zinc-700 dark:text-zinc-300">
                            <svg class="w-5 h-5 mr-2 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                            </svg>
                            15-min delayed data
                        </li>
                    </ul>
                    <button onclick="showPlanDetails('basic')" class="w-full py-2 px-4 bg-yellow-400 text-black rounded-lg hover:opacity-90 transition-opacity">
                        Choose Basic
                    </button>
                </div>
     
                <!-- Unlimited Plan -->
                <div class="rounded-lg bg-white dark:bg-zinc-800 p-6 shadow-lg border border-zinc-200 dark:border-zinc-700 hover:border-yellow-400 dark:hover:border-yellow-400 transition-all">
                    <div class="flex items-center space-x-2 mb-3 sm:mb-4">
                        <span class="text-xl sm:text-2xl text-yellow-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                        </svg>
                        </span>
                        <h2 class="text-xl sm:text-2xl font-bold text-black dark:text-white">Unlimited</h2>
                    </div>
                    <p class="text-xl font-bold text-black dark:text-white mb-2">$30/month</p>
                    <p class="text-zinc-600 dark:text-zinc-300 mb-4">Ideal for active traders and developers</p>
                    
                    <ul class="space-y-3 mb-6">
                        <li class="flex items-center text-zinc-700 dark:text-zinc-300">
                            <svg class="w-5 h-5 mr-2 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                            </svg>
                            Real-time data streaming
                        </li>
                        <li class="flex items-center text-zinc-700 dark:text-zinc-300">
                            <svg class="w-5 h-5 mr-2 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                            </svg>
                            Websocket API (500 req/min)
                        </li>
                        <li class="flex items-center text-zinc-700 dark:text-zinc-300">
                            <svg class="w-5 h-5 mr-2 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                            </svg>
                            Extended hours trading
                        </li>
                    </ul>
                    <button onclick="showPlanDetails('unlimited')" class="w-full py-2 px-4 bg-yellow-400 text-black rounded-lg hover:opacity-90 transition-opacity">
                        Choose Unlimited
                    </button>
                </div>
     
                <!-- Premium Plan -->
                <div class="rounded-lg bg-white dark:bg-zinc-800 p-6 shadow-lg border border-zinc-200 dark:border-zinc-700 hover:border-yellow-400 dark:hover:border-yellow-400 transition-all">
                    <div class="flex items-center space-x-2 mb-3 sm:mb-4">
                        <span class="text-xl sm:text-2xl text-yellow-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                        </svg>
                        </span>
                        <h2 class="text-xl sm:text-2xl font-bold text-black dark:text-white">Premium</h2>
                    </div>
                    <p class="text-xl font-bold text-black dark:text-white mb-2">$99/month</p>
                    <p class="text-zinc-600 dark:text-zinc-300 mb-4">Built for professional traders</p>
                    
                    <ul class="space-y-3 mb-6">
                        <li class="flex items-center text-zinc-700 dark:text-zinc-300">
                            <svg class="w-5 h-5 mr-2 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                            </svg>
                            Level 2 market data
                        </li>
                        <li class="flex items-center text-zinc-700 dark:text-zinc-300">
                            <svg class="w-5 h-5 mr-2 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                            </svg>
                            Unlimited API requests
                        </li>
                        <li class="flex items-center text-zinc-700 dark:text-zinc-300">
                            <svg class="w-5 h-5 mr-2 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                            </svg>
                            Priority support
                        </li>
                    </ul>
                    <button onclick="showPlanDetails('premium')" class="w-full py-2 px-4 bg-yellow-400 text-black rounded-lg hover:opacity-90 transition-opacity">
                        Choose Premium
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
    <InteractivePricingPlan />
  );
};

export default GenerativePricing;