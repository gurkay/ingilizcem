'use client'

import { findByLessonIdAndSearch, updateWordStatus } from "@/app/lib/features/lesson/lessonCreateAsyncThunk";
import { AppDispatch, RootState } from "@/app/lib/features/store";
import { ILessonWords, IPaginationParams } from "@/interfaces/IPaginationParams";
import { StatusType } from "@/types/status";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

interface IProps {
    id: number;
}

function TableLessonWords({ id }: IProps) {
    console.log('TableLessonWords:::id::: ', id);
    const dispatch = useDispatch<AppDispatch>();
    const selectorLesson = useSelector((state: RootState) => state.lessonReducer);
    const [paginationParams, setPaginationParams] = useState<IPaginationParams>({
        page: 0,
        size: 5,
        sort: ["id,desc"]
    });
    const [editingStatus, setEditingStatus] = useState<{ [key: number]: boolean }>({});
    const [searchText, setSearchText] = useState<string>('');
    const [debouncedSearchText, setDebouncedSearchText] = useState<string>('');

    // Debounce search text to prevent too many API calls
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchText(searchText);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchText]);

    // Update search when debounced text changes
    useEffect(() => {
        dispatch(findByLessonIdAndSearch({ 
            id, 
            pagination: { 
                ...paginationParams,
                searchText: debouncedSearchText 
            } 
        }));
    }, [dispatch, debouncedSearchText, paginationParams.page, paginationParams.size]);

    const getQuestions = async () => {
        try {
            dispatch(findByLessonIdAndSearch({ id: id, pagination: paginationParams }));
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getQuestions();
    }, [dispatch, paginationParams])

    const handlePageChange = (newPage: number) => {
        setPaginationParams(prev => ({ ...prev, page: newPage }));
    };

    const handleStatusChange = async (lessonWordId: number, newStatus: StatusType) => {
        try {
            await dispatch(updateWordStatus({ lessonWordId, status: newStatus }));
            // Status güncellendikten sonra listeyi yenile
            dispatch(findByLessonIdAndSearch({ id, pagination: paginationParams }));
        } catch (error) {
            console.error('Error updating status:', error);
            // Hata durumunda kullanıcıya bilgi ver
            toast.error('Error updating status');
        }
    };

    const renderStatusCell = (lessonWord: ILessonWords) => {
        const isEditing = editingStatus[lessonWord.id];
        const currentStatus = lessonWord.userWords?.status || 'NEW';

        if (isEditing) {
            return (
                <select
                    className="px-3 py-1 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={currentStatus}
                    onChange={(e) => {
                        handleStatusChange(lessonWord.id, e.target.value as StatusType);
                        setEditingStatus(prev => ({ ...prev, [lessonWord.id]: false }));
                    }}
                    onBlur={() => setEditingStatus(prev => ({ ...prev, [lessonWord.id]: false }))}
                    autoFocus
                >
                    <option value="NEW">New</option>
                    <option value="LEARNING">Learning</option>
                    <option value="LEARNED">Learned</option>
                </select>
            );
        }

        const statusColors = {
            NEW: 'bg-gray-100 text-gray-800',
            LEARNING: 'bg-yellow-100 text-yellow-800',
            LEARNED: 'bg-green-100 text-green-800'
        };

        return (
            <div 
                className="flex items-center space-x-2"
                onClick={() => setEditingStatus(prev => ({ ...prev, [lessonWord.id]: true }))}
            >
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[currentStatus as StatusType]}`}>
                    {currentStatus}
                </span>
                <button className="text-gray-400 hover:text-gray-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                </button>
            </div>
        );
    };

    const renderPaginationButtons = () => {
        const totalPages = selectorLesson?.lessonWordsPageDtos?.totalPages ?? 0;
        const currentPage = paginationParams.page ?? 0;
        const buttons = [];
        const maxVisiblePages = 5;

        // İlk sayfa her zaman görünür
        buttons.push(
            <button
                key="first"
                onClick={() => handlePageChange(0)}
                className={`px-4 py-2 border rounded-md ${currentPage === 0 ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
            >
                1
            </button>
        );

        if (totalPages <= maxVisiblePages) {
            // Toplam sayfa sayısı 5 veya daha az ise tüm sayfaları göster
            for (let i = 1; i < totalPages; i++) {
                buttons.push(
                    <button
                        key={i}
                        onClick={() => handlePageChange(i)}
                        className={`px-4 py-2 border rounded-md ${currentPage === i ? 'bg-blue-500 text-white' : 'bg-gray-500 text-white hover:bg-gray-100'}`}
                    >
                        {i + 1}
                    </button>
                );
            }
        } else {
            // Sayfa sayısı 5'ten fazla ise ellipsis (...) kullan
            if (currentPage > 2) {
                buttons.push(
                    <button key="ellipsis1" className="px-4 py-2 text-black">
                        ...
                    </button>
                );
            }

            // Aktif sayfanın etrafındaki sayfaları göster
            for (let i = Math.max(1, currentPage - 1); i <= Math.min(currentPage + 1, totalPages - 2); i++) {
                buttons.push(
                    <button
                        key={i}
                        onClick={() => handlePageChange(i)}
                        className={`px-4 py-2 border rounded-md ${currentPage === i ? 'bg-blue-500 text-white' : 'bg-gray-500 text-white hover:bg-gray-100 hover:bg-gray-50 hover:text-blue-600'}`}
                    >
                        {i + 1}
                    </button>
                );
            }

            if (currentPage < totalPages - 3) {
                buttons.push(
                    <button key="ellipsis2" className="px-4 py-2">
                        ...
                    </button>
                );
            }

            // Son sayfa her zaman görünür
            if (totalPages > 1) {
                buttons.push(
                    <button
                        key="last"
                        onClick={() => handlePageChange(totalPages - 1)}
                        className={`px-4 py-2 border rounded-md ${currentPage === totalPages - 1 ? 'bg-blue-500 text-white' : 'bg-gray-500 text-white hover:bg-gray-100 hover:bg-gray-50 hover:text-blue-600'}`}
                    >
                        {totalPages}
                    </button>
                );
            }
        }

        return buttons;
    };

    if (selectorLesson.loading) {
        return <div className="flex justify-center p-4">Loading...</div>;
    }

    if (selectorLesson.lessonWordsPageDtos?.content?.length === 0) {
        return <div className="flex justify-center p-4">No lesson words found</div>;
    }
    console.log('TableLessonWords:::selectorLesson::: ', selectorLesson.lessonWordsPageDtos);
    return (
        <div className="overflow-x-auto">
            {/* Search field */}
            <div className="mb-4">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search by word or status..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <svg
                            className="w-5 h-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>
                </div>
            </div>

            <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Word</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mean</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sentence</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {selectorLesson.lessonWordsPageDtos?.content?.map((lessonWord: ILessonWords) => (
                        <tr key={lessonWord.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lessonWord.lesson.title}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {renderStatusCell(lessonWord)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lessonWord.word.word}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lessonWord.word.mean}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lessonWord.word.sentence}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Section */}
            <div className="flex flex-col items-center space-y-5 mt-8">
                {/* Page Info */}
                <div className="text-sm text-black-700 dark:text-black-300">
                    <span className="font-medium text-black dark:text-black">Showing page</span>{' '}
                    <span className="font-semibold text-blue-600 dark:text-blue-400">
                        {(paginationParams.page ?? 0) + 1}
                    </span>{' '}
                    <span className="font-medium text-black dark:text-black">of</span>{' '}
                    <span className="font-semibold text-blue-600 dark:text-blue-400">
                        {selectorLesson?.lessonWordsPageDtos?.totalPages ?? 1}
                    </span>
                </div>

                {/* Pagination Controls */}
                <div className="flex items-center gap-2">
                    {/* First Page Button */}
                    <button
                        onClick={() => handlePageChange(0)}
                        disabled={(paginationParams.page ?? 0) <= 0}
                        className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-blue-600 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ease-in-out"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                        </svg>
                        <span className="hidden sm:inline">First</span>
                    </button>

                    {/* Previous Button */}
                    <button
                        onClick={() => handlePageChange((paginationParams.page ?? 0) - 1)}
                        disabled={(paginationParams.page ?? 0) <= 0}
                        className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-blue-600 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ease-in-out"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                        <span className="hidden sm:inline">Previous</span>
                    </button>

                <div className="flex space-x-1">
                    {renderPaginationButtons()}
                </div>

                    {/* Next Button */}
                    <button
                        onClick={() => handlePageChange((paginationParams.page ?? 0) + 1)}
                        disabled={(paginationParams.page ?? 0) >= ((selectorLesson?.lessonWordsPageDtos?.totalPages ?? 1) - 1)}
                        className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-blue-600 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ease-in-out"
                    >
                        <span className="hidden sm:inline">Next</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Last Page Button */}
                    <button
                        onClick={() => handlePageChange((selectorLesson?.lessonWordsPageDtos?.totalPages ?? 1) - 1)}
                        disabled={(paginationParams.page ?? 0) >= ((selectorLesson?.lessonWordsPageDtos?.totalPages ?? 1) - 1)}
                        className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-blue-600 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ease-in-out"
                    >
                        <span className="hidden sm:inline">Last</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7m-8-14l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TableLessonWords;