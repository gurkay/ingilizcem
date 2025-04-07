'use client';

import { RootState } from "@/app/lib/features/store";
import { IQuestion } from "@/interfaces/IRedux";
import { useSelector } from "react-redux";

function Answer() {
    const { answers } = useSelector((state: RootState) => state.answerReducer);
    const selectorStoryQuiz = useSelector((state: RootState) => state.storyQuestionReducer);
    const selectorGenerateText = useSelector((state: RootState) => state.generateTextReducer);

    return (
        <>
            <div className="card m-3 p-2 mt-20"><h5>Answers</h5></div>
            <div className="card m-3">
                <div className="card-body">
                    <h5 className="card-title">Story: </h5>
                    <p className="card-text" >{selectorGenerateText.story}</p>
                </div>
                {
                    selectorStoryQuiz.output && selectorStoryQuiz.output.map((question: IQuestion, questionIndex: number) => (
                        <div className="text-start" key={questionIndex}>
                            <div className="card m-3">
                                <div className="card-body">
                                    <h5 className="card-title">Question{questionIndex + 1}: {question.question}</h5>
                                    <p className="card-text" style={{ color: 'green' }}>Answer: {question.answer}</p>
                                    {
                                        answers[questionIndex] &&
                                        <p className="card-text" style={{ color: `${question.answer === answers[questionIndex].answer ? 'green' : 'red'}` }}>
                                            Your Answer: {answers[questionIndex].answer}
                                        </p>
                                    }
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    );
}
export default Answer;