'use client';

import GenerateText from "@/app/_components/GenerateText";
import { setQuiz } from "@/app/lib/features/generateText/generateTextSlice";
import { AppDispatch, RootState } from "@/app/lib/features/store";
import { getStringToJson } from "@/utils/getStringToJson";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function LearningSlugPage({ params }: { params: { slug: string } }) {
    const selectorGenerateText = useSelector((state: RootState) => state.generateTextReducer);
    const dispatch = useDispatch<AppDispatch>();

    // setQuiz'i useEffect içine taşıyalım
    useEffect(() => {
        if (selectorGenerateText.output) {

            dispatch(setQuiz(selectorGenerateText.output));
        }
    }, [selectorGenerateText.output, dispatch]);
    
    if (selectorGenerateText.loading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
                    <p className="text-gray-600 text-lg">Loading questions...</p>
                </div>
            </div>
        );
    }
    const output = getStringToJson(selectorGenerateText.output);
    return (
        <>
            {output && <GenerateText output={output} />}
        </>
    );
}

export default LearningSlugPage;