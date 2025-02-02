'use client';

import GenerateText from "@/app/_components/GenerateText";
import { AppDispatch, RootState } from "@/app/lib/features/store";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Quiz() {
    const dispatch = useDispatch<AppDispatch>();
    const selectorGenerateText = useSelector((state: RootState) => state.generateTextReducer);
    const [showQuiz, setShowQuiz] = useState(false);
    const pathName = usePathname();
    
    const get = async () => {
        setShowQuiz(true);
    }

    useEffect(() => {
        get();
    }, [dispatch])


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

    return (
        <>
            {
                showQuiz && <GenerateText output={selectorGenerateText.output} />
            }
        </>
    );

}

export default Quiz;