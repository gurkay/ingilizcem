import { IRoleDto } from "../role/IRoleDto";

export interface IUserDto {
    id: number;
    email: string;
    roles: IRoleDto[];
}