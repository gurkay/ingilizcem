'use client';

interface PaginationProps {
    currentPage: number;
    handlePageChange: (page: number) => void;
    page: number;
    totalPages: number;
}

const Pagination = ({ currentPage, totalPages, handlePageChange, page }: PaginationProps) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <>
        {/* Pagination Section */}
        <div className="flex justify-center items-center mt-8 gap-2">
                {/* Previous Button */}
                <button
                    onClick={() => handlePageChange((page ?? 0) - 1)}
                    disabled={(page ?? 0) <= 0}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ease-in-out"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    Previous
                </button>

                {/* Current Page Info */}
                <div className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
                    <span className="text-gray-900 dark:text-gray-300">Page</span>
                    <span className="px-2 py-1 text-blue-600 dark:text-blue-400 font-semibold">
                        {(page ?? 0) + 1}
                    </span>
                    <span className="text-gray-900 dark:text-gray-300">of</span>
                    <span className="px-2 py-1 text-blue-600 dark:text-blue-400 font-semibold">
                        {totalPages ?? 1}
                    </span>
                </div>

                {/* Next Button */}
                <button
                    onClick={() => handlePageChange((page ?? 0) + 1)}
                    disabled={(page ?? 0) >= ((totalPages ?? 1) - 1)}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ease-in-out"
                >
                    Next
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </>
    );
};

export default Pagination; 