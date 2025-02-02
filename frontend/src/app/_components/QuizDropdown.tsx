import { useState } from 'react';

interface IProps {
    handleShow: () => void;
    handleQuiz: (e: any) => void;
}

function QuizDropdown(props: IProps) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const quizOptions = [
        { name: 'Create Story', action: props.handleShow },
        { name: 'Synonyms Quiz', value: 'wordSynonyms', action: props.handleQuiz },
        { name: 'Cloze Test', value: 'clozeTest', action: props.handleQuiz },
        { name: 'Turkish Mean', value: 'turkishMean', action: props.handleQuiz },
        { name: 'English Mean', value: 'englishMean', action: props.handleQuiz },
    ];

    const handleOptionClick = (option: any) => {
        if (option.value) {
            // Quiz seçenekleri için
            const event = {
                target: {
                    name: option.value
                }
            };
            option.action(event);
        } else {
            // Create Story için
            option.action();
        }
        setIsOpen(false);
    };

    return (
        <div className="relative inline-block m-4">
            {/* Main Button */}
            <button
                onClick={toggleDropdown}
                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg"
            >
                <span className="font-medium">Select Quiz Type</span>
                <svg
                    className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute left-0 mt-2 w-56 rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                    <div className="py-1">
                        {quizOptions.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleOptionClick(option)}
                                className="group flex w-full items-center px-4 py-3 text-gray-700 hover:bg-blue-50 transition-colors duration-150 first:rounded-t-xl last:rounded-b-xl"
                            >
                                {/* İkonlar */}
                                <span className="mr-3">
                                    {index === 0 ? (
                                        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                        </svg>
                                    )}
                                </span>
                                <span className="font-medium group-hover:text-blue-600">
                                    {option.name}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default QuizDropdown;