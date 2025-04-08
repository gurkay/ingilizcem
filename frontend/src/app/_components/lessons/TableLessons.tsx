'use client'

import { findByUserId } from "@/app/lib/features/lesson/lessonCreateAsyncThunk";
import { AppDispatch, RootState } from "@/app/lib/features/store";
import { IUserDto } from "@/interfaces/dtos/user/IUserDto";
import { IContent, IPaginationParams } from "@/interfaces/IPaginationParams";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from 'next/link';
import Pagination from "../Pagination";

interface IProps {
    user: IUserDto;
}

function TableLessons({ user }: IProps) {
    const dispatch = useDispatch<AppDispatch>();
    const selectorLesson = useSelector((state: RootState) => state.lessonReducer);
    
    const [paginationParams, setPaginationParams] = useState<IPaginationParams>({
        page: 0,
        size: 5,
        sort: ["createdAt,desc"]
    });

    useEffect(() => {
        dispatch(findByUserId({ id: user.id, pagination: paginationParams }));
    }, [paginationParams]);

    const handlePageChange = (newPage: number) => {
        setPaginationParams(prev => ({ ...prev, page: newPage }));
    };

    if (selectorLesson.loading) {
        return <div className="flex justify-center p-4">Loading...</div>;
    }

    if (selectorLesson.lessonPageDtos?.content?.length === 0) {
        return <div className="flex justify-center p-4">No lessons found</div>;
    }
    console.log("selectorLesson.lessonPageDtos", selectorLesson.lessonPageDtos);
    return (
        <div className="overflow-x-auto mt-20">
            <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {selectorLesson.lessonPageDtos?.content?.map((lesson: IContent) => (
                        <tr key={lesson.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                <Link href={`/dashboard/lessons/${lesson.id}`}>
                                    {lesson.title}
                                </Link>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lesson.description}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {new Date(lesson.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <button>
                                    <Link href={`/dashboard/lessons/${lesson.id}`}>
                                        <span className="text-blue-500 hover:text-blue-700">View</span>
                                    </Link>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination
                totalPages={selectorLesson?.lessonPageDtos?.totalPages ?? 1}
                currentPage={paginationParams.page ?? 0}
                handlePageChange={handlePageChange}
                page={paginationParams.page ?? 0}
            />
        </div>
    );
}

export default TableLessons;