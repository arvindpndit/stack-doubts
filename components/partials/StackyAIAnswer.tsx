'use client';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';

import Ripples from '@/public/assets/icons/ripples.svg';
import { waitingButtonMessages } from '@/utils/constants';

interface Props {
  title: string | undefined;
  content: string | undefined;
}

const StackyAIAnswer = ({ title, content }: Props) => {
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [buttonText, setButtonText] = useState('Ask Stacky AI');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/ai-answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        throw new Error('Failed to get answer');
      }

      const data = await response.json();
      setAnswer(data.answer);
    } catch (err) {
      setError((err as Error).message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) {
      let index = 0;
      setButtonText(waitingButtonMessages[0]);
      const interval = setInterval(() => {
        setButtonText(waitingButtonMessages[index + 1]);
        index = (index + 1) % waitingButtonMessages.length;
      }, 2500);
      return () => clearInterval(interval);
    } else {
      setButtonText('Ask Stacky AI');
    }
  }, [loading]);

  return (
    <div>
      <div className="flex flex-col bg-gradient-to-b from-red-100 to-white dark:from-gray-900 dark:to-black text-center items-center my-10 border rounded-2xl border-gray-300  dark:border-gray-800">
        <div className="w-full flex flex-col sm:flex-row items-center justify-between p-6  sm:text-left rounded-2xl shadow-lg">
          {/* Left Section: Logo & Subtext */}
          <div className="flex flex-col items-center sm:items-start">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span className="text-orange-500 dark:text-yellow-400">★</span>
              <span className="bg-gradient-to-r from-orange-500 to-yellow-500 text-transparent bg-clip-text">
                Stacky AI
              </span>
              <span>
                <Image
                  src={Ripples}
                  alt="searching..."
                  width={50}
                  height={50}
                />
              </span>
            </h1>
            <p className="text-md text-gray-600 dark:text-gray-300 mt-2">
              AI assistance, powered by Google Gemini.
            </p>
          </div>

          {/* Right Section: Button */}
          <button
            onClick={handleSubmit}
            className="mt-4 sm:mt-0 px-5 sm:px-6 py-2 font-semibold rounded-full shadow-md transition bg-gradient-to-r from-orange-600 to-yellow-600 text-white hover:opacity-90"
          >
            {buttonText}
          </button>
        </div>
        {loading && (
          <Image
            src={Ripples}
            alt="searching..."
            width={100}
            height={100}
            className="mb-4"
          />
        )}
      </div>
      <div>
        {error && <div className="mt-4 p-3 text-red-500">{error}</div>}
        {answer && (
          <div className="mt-8 p-3 rounded-2xl bg-gray-50 dark:bg-gray-950 border border-gray-300  dark:border-gray-800">
            <h2 className="text-xl font-semibold">Answer by Stacky AI:</h2>
            <h2 className="text-xs text-red-500 mb-6">
              Stacky AI may generate incorrect responses, double check important
              information
            </h2>
            <div className="prose max-w-full break-words whitespace-pre-wrap overflow-scroll">
              {/* <ParseHTML code={answer}></ParseHTML> */}
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {answer}
              </ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StackyAIAnswer;

