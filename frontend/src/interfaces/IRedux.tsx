import { ILessonDto } from "./dtos/lesson/ILessonDto";
import { ILessonPageDto, ILessonWordsPageDto, IUserWordsPageDto } from "./IPaginationParams";

export interface ILessonInitialState {
    lesson: ILessonDto | null;
    lessonPageDtos: ILessonPageDto | null;
    lessonWordsPageDtos: ILessonWordsPageDto | null;
    loading: boolean;
    status: string;
    responseMessage: string;

}
export interface IAnswer {
    question: string;
    answer: string;
}

export interface IQuestion {
    question: string,
    options: string[],
    answer: string,
    explanation: string
}
export interface IUserWordsInitialState {
    userWordsPageDtos: IUserWordsPageDto | null;
    loading: boolean;
    status: string;
    responseMessage: string;
}