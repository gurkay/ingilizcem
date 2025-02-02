'use client';

import { RootState } from "@/app/lib/features/store";
import { IQuestion } from "@/interfaces/IRedux";
import { useSelector } from "react-redux";
import Link from "next/link";
import { getStringToJson } from "@/utils/getStringToJson";

function Answer() {
    const selectorGenerateText = useSelector((state: RootState) => state.generateTextReducer);
    const { answers } = useSelector((state: RootState) => state.answerReducer);
    
    console.log('answer:::selectorGenerateText:::', selectorGenerateText);
    console.log('answer:::answers:::', answers);

    // Loading state
    if (selectorGenerateText.loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <div className="inline-block w-12 h-12 border-4 border-t-blue-600 border-blue-200 rounded-full animate-spin"></div>
                    <p className="mt-4 text-gray-600">Loading results...</p>
                </div>
            </div>
        );
    }

    // Parse questions
    const questions = getStringToJson(selectorGenerateText.quiz || '[]');
    
    if (!questions || !Array.isArray(questions) || questions.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <p className="text-red-600">No questions available</p>
                    <Link href="/dashboard" className="mt-4 inline-block text-blue-600 hover:underline">
                        Return to Dashboard
                    </Link>
                </div>
            </div>
        );
    }

    // Calculate score
    const calculateScore = () => {
        if (!answers || !Array.isArray(answers)) return { correct: 0, total: questions.length, percentage: 0 };
        
        let correct = 0;
        questions.forEach((question: IQuestion, index: number) => {
            if (answers[index] && question.answer === answers[index].answer) {
                correct++;
            }
        });
        
        return {
            correct,
            total: questions.length,
            percentage: Math.round((correct / questions.length) * 100)
        };
    };

    const score = calculateScore();

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                {/* Score Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Quiz Results</h1>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold ${
                                score.percentage >= 70 ? 'bg-green-100 text-green-600' :
                                score.percentage >= 40 ? 'bg-yellow-100 text-yellow-600' :
                                'bg-red-100 text-red-600'
                            }`}>
                                {score.percentage}%
                            </div>
                            <div>
                                <p className="text-gray-600">Correct Answers</p>
                                <p className="text-2xl font-bold text-gray-800">{score.correct} / {score.total}</p>
                            </div>
                        </div>
                        <Link
                            href="/dashboard/learning"
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Try Another Quiz
                        </Link>
                    </div>
                </div>

                {/* Questions Review */}
                <div className="space-y-6">
                    {questions.map((question: IQuestion, questionIndex: number) => (
                        <div 
                            key={questionIndex}
                            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
                        >
                            <div className="p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-700 font-semibold">
                                        {questionIndex + 1}
                                    </span>
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        {question.question}
                                    </h3>
                                </div>

                                <div className="space-y-4">
                                    {/* Correct Answer */}
                                    <div className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                                            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <p className="text-green-600 font-medium">
                                            Correct Answer: {question.answer}
                                        </p>
                                    </div>

                                    {/* User's Answer */}
                                    {answers[questionIndex] && (
                                        <div className="flex items-center gap-3">
                                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                                question.answer === answers[questionIndex].answer
                                                    ? 'bg-green-100'
                                                    : 'bg-red-100'
                                            }`}>
                                                {question.answer === answers[questionIndex].answer ? (
                                                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                ) : (
                                                    <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                )}
                                            </div>
                                            <p className={`font-medium ${
                                                question.answer === answers[questionIndex].answer
                                                    ? 'text-green-600'
                                                    : 'text-red-600'
                                            }`}>
                                                Your Answer: {answers[questionIndex].answer}
                                            </p>
                                        </div>
                                    )}

                                    {/* Explanation Section */}
                                    <div className="mt-4 pt-4 border-t border-gray-100">
                                        <div className="flex items-start gap-3">
                                            <div className="w-6 h-6 mt-0.5 rounded-full bg-blue-100 flex items-center justify-center">
                                                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-blue-600 mb-1">Explanation</p>
                                                <p className="text-gray-600">
                                                    {question.explanation || 
                                                    `The correct answer is "${question.answer}". This word fits best in the context of the sentence, 
                                                    maintaining proper grammar and meaning.`}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Answer;