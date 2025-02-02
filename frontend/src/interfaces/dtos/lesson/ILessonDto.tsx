import { IUserDto } from "../user/IUserDto";

export interface ILessonDto {
    id: number;
    user: IUserDto;
    title: string;
    description: string;
    createdAt: Date;
}