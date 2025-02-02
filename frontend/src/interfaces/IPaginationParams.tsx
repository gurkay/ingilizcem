import { IUserDto } from "./dtos/user/IUserDto";


export interface IWordDto {
    id: number;
    word: string;
    mean: string;
    sentence: string;
    wordType: string;
}

export interface ILessonDto {
    id: number;
    title: string;
    description: string;
    createdAt: Date;
    userId: number;
}

export interface IUserWordsDto {
    id: number;
    userId: number;
    wordId: number;
    word: IWordDto;
    user: IUserDto;
    status: string;
    lastReviewed: Date;
    reviewCount: number;
}

export interface ILessonWords {
    id: number;
    lessonId: number;
    wordId: number;
    word: IWordDto;
    lesson: ILessonDto;
    userWords: IUserWordsDto;
}

export interface ISort {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
}

export interface IPageable {
    pageNumber: number;
    pageSize: number;
    sort: ISort;
    offset: number;
    paged: boolean;
    unpaged: boolean;
}

export interface IContent {
    id: number;
    user: IUserDto;
    title: string;
    description: string;
    createdAt: Date;
    userId: number;
    lessonWords: ILessonWords[];
}

export interface ILessonWordsPageDto {
    content: ILessonWords[];
    pageable: IPageable;
    last: boolean;
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    sort: ISort;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}

export interface ILessonPageDto {
    content: IContent[];
    pageable: IPageable;
    last: boolean;
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    sort: ISort;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}
export interface IPaginationParams {
    page?: number;
    size?: number;
    sort?: string[];
    searchText?: string;
}

export interface IUserWordsPageDto {
    content: IUserWordsDto[];
    pageable: IPageable;
    last: boolean;
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
}