'use client';

import { getPrompt, getStoryQuiz, getTranslateFromEnglish } from "@/app/lib/features/generateText/generateTextCreateAsyncThunk";
import { setStory } from "@/app/lib/features/generateText/generateTextSlice";
import { AppDispatch, RootState } from "@/app/lib/features/store";
import { PromptConstants } from "@/constants/PromptConstants";
import { IUserWordsDto } from "@/interfaces/IPaginationParams";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

function Story() {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const selectorGenerateText = useSelector((state: RootState) => state.generateTextReducer);
    const selectorUserWords = useSelector((state: RootState) => state.userWordsReducer);

    if (selectorGenerateText.loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <div className="inline-block w-12 h-12 border-4 border-t-blue-600 border-blue-200 rounded-full animate-spin"></div>
                    <p className="mt-4 text-gray-600 text-lg font-medium">Generating story...</p>
                </div>
            </div>
        );
    }
    console.log('story:::selectorGenerateText:::', selectorGenerateText);
    console.log('story:::selectorUserWords:::', selectorUserWords);
    return (
        <div className="max-w-4xl mx-auto px-4 py-8 mt-20">
            {/* Words Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
                <div className="flex flex-wrap gap-2 items-center">
                    <span className="font-semibold text-gray-700">
                        {selectorUserWords.userWordsPageDtos?.content[0].word.wordType}:
                    </span>
                    {selectorUserWords.userWordsPageDtos?.content.map((word: IUserWordsDto) => (
                        <span
                            key={word.id}
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700"
                        >
                            {word.word.word}
                        </span>
                    ))}
                </div>
            </div>

            {/* Story Content */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Story</h2>
                    <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                        {selectorGenerateText.output}
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="border-t border-gray-100 bg-gray-50 px-6 py-4">
                    <div className="flex flex-wrap gap-4 justify-end">
                        <button
                            onClick={() => {
                                const prompt = PromptConstants.getTranslateFromEnglish(selectorGenerateText.output || '');
                                dispatch(getTranslateFromEnglish(prompt));
                                router.push(`/dashboard/story/translate`)
                            }}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                            </svg>
                            Translate to Turkish
                        </button>

                        <button
                            onClick={() => {
                                if ('speechSynthesis' in window) {
                                    const utterance = new SpeechSynthesisUtterance(selectorGenerateText.output);
                                    window.speechSynthesis.speak(utterance);
                                } else {
                                    alert('Your browser does not support text-to-speech.');
                                }
                            }}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                            </svg>
                            Listen
                        </button>

                        <button
                            onClick={() => {
                                dispatch(setStory(selectorGenerateText.output));
                                const prompt = PromptConstants.getStoryQuiz(selectorGenerateText.output || '');
                                dispatch(getStoryQuiz(prompt));
                                router.push(`/dashboard/story/quiz`);
                            }}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                            </svg>
                            Create Quiz
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Story;