import React, { useState, useEffect, useRef } from 'react';
import InteractiveBasicPlan from './Interactive';

const GenerativeBasicPlan = () => {
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
                <h1 class="text-2xl font-bold text-white">Alpaca Markets Basic Plan</h1>
            </div>
     
            <!-- Pricing Badge -->
            <div class="inline-block px-4 py-1 rounded-full bg-yellow-400 text-black font-medium mb-6">
                Free Plan
            </div>
     
            <!-- Subtitle -->
            <div class="flex items-center gap-2 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <p class="text-zinc-300 italic">Perfect for beginners and algorithm testing</p>
            </div>
     
            <!-- Features List -->
            <div class="space-y-4">
                <div class="flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p class="text-zinc-200">Zero commission trading for stocks & ETFs</p>
                </div>
                
                <div class="flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p class="text-zinc-200">REST API access with 200 requests/min</p>
                </div>
     
                <div class="flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p class="text-zinc-200">Basic market data with 15-min delay</p>
                </div>
     
                <div class="flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p class="text-zinc-200">Paper trading environment for testing</p>
                </div>
     
                <div class="flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p class="text-zinc-200">Up to 3 concurrent connections</p>
                </div>
            </div>
     
            <!-- Get Started Button -->
            <button id="alpaca-getStartedBtn-89734" class="w-full mt-8 px-6 py-3 rounded-lg bg-yellow-400 hover:bg-yellow-500 transition-colors text-black font-semibold flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                Get Started Now
            </button>
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
    <InteractiveBasicPlan />
  );
};

export default GenerativeBasicPlan;