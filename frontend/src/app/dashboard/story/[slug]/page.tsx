'use client';

import GenerateText from "@/app/_components/GenerateText";
import { getStoryQuiz, getTranslateFromEnglish } from "@/app/lib/features/generateText/generateTextCreateAsyncThunk";
import { AppDispatch, RootState } from "@/app/lib/features/store";
import { PromptConstants } from "@/constants/PromptConstants";
import { getStringToJson } from "@/utils/getStringToJson";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function StorySlugPage({ params }: { params: { slug: string } }) {
    const pathName = usePathname();
    const dispatch = useDispatch<AppDispatch>();
    const selectorGenerateText = useSelector((state: RootState) => state.generateTextReducer);
    const [showQuiz, setShowQuiz] = useState(false);
    const [showTranslate, setShowTranslate] = useState(false);
    useEffect(() => {
        const initializePage = async () => {
            const param = params.slug;
            if (param === "quiz") {
                try {
                    setShowQuiz(true);
                } catch (error) {
                    console.error("quiz error:", error);
                }

            } else if (param === "translate") {
                try {
                    setShowTranslate(true);
                } catch (error) {
                    console.error("Translation error:", error);
                }
            }
        };

        initializePage();
    }, [dispatch, params.slug, selectorGenerateText.story]);

    useEffect(() => {
        console.log('story:::slug:::showTranslate:::loading...', showTranslate);
    }, [showTranslate]);

    const translateStory = () => {
        const prompt = PromptConstants.getTranslateFromEnglish(selectorGenerateText.story || '');
        dispatch(getTranslateFromEnglish(prompt));
        setShowTranslate(!showTranslate);
    }

    if (selectorGenerateText.loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <div className="inline-block w-12 h-12 border-4 border-t-blue-600 border-blue-200 rounded-full animate-spin"></div>
                    <p className="mt-4 text-gray-600 text-lg font-medium">Loading content...</p>
                </div>
            </div>
        );
    }

    const quiz = getStringToJson(selectorGenerateText.quiz || '');
    console.log('story:::slug:::quiz:::', quiz);
    console.log('story:::slug:::translate:::', selectorGenerateText);

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
            {/* Quiz Section */}
            <div className="mb-4">
                {showQuiz && <GenerateText output={quiz} pathName={pathName} questionType="story" />}
            </div>

            {/* Content Cards */}
            <div className="max-w-3xl mx-auto space-y-4">
                {/* Story Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-4 sm:p-6">
                        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-100">
                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                            <h2 className="text-lg sm:text-xl font-bold text-gray-800">Original Story</h2>
                        </div>
                        <div className="prose prose-sm sm:prose max-w-none">
                            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                                {selectorGenerateText.story}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Translation Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-4 sm:p-6">
                        {/* Action Buttons */}
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
                            <button 
                                onClick={translateStory} 
                                className="flex-1 sm:flex-none inline-flex items-center justify-center px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors shadow-sm"
                            >
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                                </svg>
                                <span className="whitespace-nowrap">Turkish Translate</span>
                            </button>

                            <button
                                onClick={() => {
                                    if ('speechSynthesis' in window) {
                                        const utterance = new SpeechSynthesisUtterance(selectorGenerateText.story || '');
                                        window.speechSynthesis.speak(utterance);
                                    } else {
                                        alert('Your browser does not support text-to-speech.');
                                    }
                                }}
                                className="flex-1 sm:flex-none inline-flex items-center justify-center px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors shadow-sm"
                            >
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                                </svg>
                                <span className="whitespace-nowrap">Listen to Story</span>
                            </button>
                        </div>

                        {/* Translation Text */}
                        {showTranslate && (
                            <div className="mt-3 p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-100">
                                <div className="flex items-center gap-2 mb-2 text-sm text-gray-500">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                                    </svg>
                                    <span>Turkish Translation</span>
                                </div>
                                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                                    {selectorGenerateText.translate}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StorySlugPage;