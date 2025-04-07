'use client'

import MyLevelModal from "@/app/_components/modals/MyLevelModal";
import QuizDropdown from "@/app/_components/QuizDropdown";
import TableUserWords from "@/app/_components/userWords/TableUserWords";
import { getPrompt, googleAi } from "@/app/lib/features/generateText/generateTextCreateAsyncThunk";
import { AppDispatch, RootState } from "@/app/lib/features/store";
import { PromptConstants } from "@/constants/PromptConstants";
import { IUserWordsDto } from "@/interfaces/IPaginationParams";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function LearningPage() {
    const dispatch = useDispatch<AppDispatch>();
    const route = useRouter();
    const selectorUserWords = useSelector((state: RootState) => state.userWordsReducer);
    
    const [show, setShow] = useState(false);
    const handleLevelModalClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleQuiz = (e: any) => {
        console.log('handleQuiz:::', e.target.name);
        let content = '';
        selectorUserWords.userWordsPageDtos?.content.forEach((word: IUserWordsDto) => {
            content += word.word.word + ', ';
        });

        if(e.target.name === 'clozeTest') {
            const prompt = PromptConstants.getClozeTest(content);
            console.log('LearningPage:::prompt:::', prompt);
            //dispatch(getPrompt(prompt));
            dispatch(googleAi(prompt));
            route.push(`/dashboard/learning/clozeTest`);
        } else if(e.target.name === 'wordSynonyms') {
            const prompt = PromptConstants.getWordSynonyms(content);
            console.log('LearningPage:::prompt:::', prompt);
            // dispatch(getPrompt(prompt));
            dispatch(googleAi(prompt));
            route.push(`/dashboard/learning/wordSynonyms`);
        } else if(e.target.name === 'turkishMean') {
            const prompt = PromptConstants.getTurkishMean(content);
            console.log('LearningPage:::prompt:::', prompt);
            // dispatch(getPrompt(prompt));
            dispatch(googleAi(prompt));
            route.push(`/dashboard/learning/turkishMean`);
        } else if(e.target.name === 'englishMean') {
            const prompt = PromptConstants.getEnglishMean(content);
            console.log('LearningPage:::prompt:::', prompt);
            // dispatch(getPrompt(prompt));
            dispatch(googleAi(prompt));
            route.push(`/dashboard/learning/englishMean`);
        } else if(e.target.name === 'story') {
            handleShow();
        }
    }

    const handleStory = (level: string) => {

        let content = '';
        selectorUserWords.userWordsPageDtos?.content.forEach((word: IUserWordsDto) => {
            content += word.word.word + ', ';
        });

        if (level === '1') {
            content += 'başlangıç seviyede ';
        } else if (level === '2') {
            content += 'orta seviyede ';
        } else if (level === '3') {
            content += 'iler seviyede ';
        }

        const prompt = PromptConstants.getStory(content);
        console.log('LearningPage:::prompt:::', prompt);
        // dispatch(getPrompt(prompt));
        dispatch(googleAi(prompt));
        route.push(`/dashboard/story`);
    }
    return (
        <>
            <MyLevelModal handleStory={handleStory} show={show} handleLevelModalClose={handleLevelModalClose} />
            <div className="flex justify-center items-center m-8 mt-20">
                <QuizDropdown handleShow={handleShow} handleQuiz={handleQuiz} />
            </div>
            <TableUserWords id={1} status="LEARNING" />
        </>
    );
}

export default LearningPage;