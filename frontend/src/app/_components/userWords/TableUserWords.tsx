'use client'

import { findByLessonIdAndSearch, updateWordStatus } from "@/app/lib/features/lesson/lessonCreateAsyncThunk";
import { AppDispatch, RootState } from "@/app/lib/features/store";
import { findByUserIdAndStatus } from "@/app/lib/features/userWords/userWordsCreateAsyncThunk";
import { IPaginationParams, IUserWordsDto } from "@/interfaces/IPaginationParams";
import { StatusType } from "@/types/status";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

interface IProps {
    id: number;
    status: string;
}

function TableUserWords({ id, status }: IProps) {

    const dispatch = useDispatch<AppDispatch>();
    const selectorUserWords = useSelector((state: RootState) => state.userWordsReducer);
    const [paginationParams, setPaginationParams] = useState<IPaginationParams>({
        page: 0,
        size: 5,
        sort: ["id,desc"]
    });
    const [editingStatus, setEditingStatus] = useState<{ [key: number]: boolean }>({});


    // Update search when debounced text changes
    useEffect(() => {
        dispatch(findByUserIdAndStatus({ 
            id: id, 
            status: status,
            pagination: { 
                ...paginationParams
            } 
        }));
    }, [dispatch, editingStatus, paginationParams.page, paginationParams.size]);

    const getQuestions = async () => {
        try {
            dispatch(findByUserIdAndStatus({ id: id, status: status, pagination: paginationParams }));
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

    const handleStatusChange = async (wordId: number, newStatus: StatusType) => {
        try {
            await dispatch(updateWordStatus({ lessonWordId: wordId, status: newStatus }));
            // Status değiştiğinde mevcut status ile listeyi yenile
            dispatch(findByUserIdAndStatus({ 
                id, 
                status: status, // prop olarak gelen mevcut status
                pagination: paginationParams 
            }));
            
            // Eğer kelime farklı bir statuse geçtiyse ve mevcut tablo görünümünden çıkması gerekiyorsa
            if (newStatus !== status) {
                toast.success(`Word status updated to ${newStatus}`);
            }
        } catch (error) {
            console.error('Error updating status:', error);
            toast.error('Error updating status');
        }
    };

    const renderStatusCell = (userWord: IUserWordsDto) => {
        const isEditing = editingStatus[userWord.id];
        const currentStatus = userWord.status || 'NEW';

        if (isEditing) {
            return (
                <select
                    className="px-3 py-1 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={currentStatus}
                    onChange={(e) => {
                        handleStatusChange(userWord.word.id, e.target.value as StatusType);
                        setEditingStatus(prev => ({ ...prev, [userWord.word.id]: false }));
                    }}
                    onBlur={() => setEditingStatus(prev => ({ ...prev, [userWord.word.id]: false }))}
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
                onClick={() => setEditingStatus(prev => ({ ...prev, [userWord.word.id]: true }))}
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
        const totalPages = selectorUserWords?.userWordsPageDtos?.totalPages ?? 0;
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
                        className={`px-4 py-2 border rounded-md ${currentPage === i ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
                    >
                        {i + 1}
                    </button>
                );
            }
        } else {
            // Sayfa sayısı 5'ten fazla ise ellipsis (...) kullan
            if (currentPage > 2) {
                buttons.push(
                    <button key="ellipsis1" className="px-4 py-2">
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
                        className={`px-4 py-2 border rounded-md ${currentPage === i ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
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
                        className={`px-4 py-2 border rounded-md ${currentPage === totalPages - 1 ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
                    >
                        {totalPages}
                    </button>
                );
            }
        }

        return buttons;
    };

    if (selectorUserWords.loading) {
        return <div className="flex justify-center p-4">Loading...</div>;
    }

    if (selectorUserWords.userWordsPageDtos?.content?.length === 0) {
        return <div className="flex justify-center p-4">No lesson words found</div>;
    }
    console.log('TableLessonWords:::selectorLesson::: ', selectorUserWords.userWordsPageDtos);
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Word</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mean</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sentence</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {selectorUserWords?.userWordsPageDtos?.content?.map((userWord: IUserWordsDto) => (
                        <tr key={userWord.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {renderStatusCell(userWord)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{userWord.word.word}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{userWord.word.mean}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{userWord.word.sentence}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex justify-center items-center space-x-2 my-4">
                <span className="text-sm text-gray-700">
                    Page {(paginationParams.page ?? 0) + 1} of {selectorUserWords?.userWordsPageDtos?.totalPages}
                </span>
            </div>

            <div className="flex justify-center items-center space-x-2 my-4">
                <button
                    onClick={() => handlePageChange(0)}
                    disabled={(paginationParams.page ?? 0) <= 0}
                    className="px-4 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                >
                    First
                </button>
                <button
                    onClick={() => handlePageChange((paginationParams.page ?? 0) - 1)}
                    disabled={(paginationParams.page ?? 0) <= 0}
                    className="px-4 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                >
                    Previous
                </button>

                <div className="flex space-x-1">
                    {renderPaginationButtons()}
                </div>

                <button
                    onClick={() => handlePageChange((paginationParams.page ?? 0) + 1)}
                    disabled={(paginationParams.page ?? 0) >= ((selectorUserWords?.userWordsPageDtos?.totalPages ?? 1) - 1)}
                    className="px-4 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                >
                    Next
                </button>
                <button
                    onClick={() => handlePageChange((selectorUserWords?.userWordsPageDtos?.totalPages ?? 1) - 1)}
                    disabled={(paginationParams.page ?? 0) >= ((selectorUserWords?.userWordsPageDtos?.totalPages ?? 1) - 1)}
                    className="px-4 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                >
                    Last
                </button>
            </div>
        </div>
    );
}

export default TableUserWords;