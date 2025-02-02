'use client'
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../lib/features/store";
import { IAnswer, IQuestion } from "@/interfaces/IRedux";
import { setAnswer } from "../lib/features/answer/answerSlice";
import { getAlphabet } from "@/utils/getAlphabet";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
interface IProps {
  output: any;
  questionType?: string;
  pathName?: string;
}

function GenerateText(props: IProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { answers } = useSelector((state: RootState) => state.answerReducer);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  if (!props.output || !Array.isArray(props.output)) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <p className="text-red-600">No questions available</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="mt-4 px-4 py-2 text-blue-600 hover:underline"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const setHandleOption = (e: any) => {
    const ans: IAnswer = {
      question: e.target.id.split('-')[1],
      answer: e.target.value
    }
    
    const newAnswers = answers ? [...answers] : [];
    const existingIndex = newAnswers.findIndex(a => a.question === ans.question);
    
    if (existingIndex !== -1) {
      newAnswers[existingIndex] = ans;
    } else {
      newAnswers.push(ans);
    }
    
    dispatch(setAnswer(newAnswers));
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <div className="flex items-center">
            <svg 
              className="w-6 h-6 text-red-500 mr-3" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
            <h3 className="text-lg font-medium text-red-800">Error</h3>
          </div>
          <p className="mt-2 text-red-700">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col pb-32 pt-12">
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800">
              {props.questionType || 'Quiz'} Exercise
            </h1>
            <p className="text-gray-600 mt-2">
              Choose the correct answer for each question
            </p>
          </div>

          {
            props.output && props.output.map((e: any, questionIndex: number) => (
              <div
                key={questionIndex}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-semibold text-sm">
                      {questionIndex + 1}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Question {questionIndex + 1}
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {e.question}
                  </p>
                  <div className="space-y-3">
                    {e.options && e.options.map((option: string, optionIndex: number) => (
                      <label
                        key={optionIndex}
                        className="flex items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                      >
                        <input
                          type="radio"
                          id={`question-${questionIndex}-option-${optionIndex}`}
                          name={`question-${questionIndex}`}
                          value={option}
                          onChange={setHandleOption}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <div className="ml-4 flex items-center gap-3">
                          <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-700 font-medium">
                            {getAlphabet(optionIndex)}
                          </span>
                          <span className="text-gray-700">{option}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 z-10">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto flex justify-end">
            <button
              onClick={() => {
                router.push('/dashboard/answer');
              }}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <svg
                className="ml-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
              Check Answers
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GenerateText;