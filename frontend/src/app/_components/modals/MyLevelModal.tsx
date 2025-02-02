import { Fragment, useState } from 'react'

interface IProps {
    show: boolean;
    handleLevelModalClose: () => void;
    handleStory: (value: string) => void;
}

function MyLevelModal(props: IProps) {
    const [radioValue, setRadioValue] = useState('1');
    const radios = [
        { name: 'Beginner', value: '1', color: 'bg-green-500' },
        { name: 'Intermediate', value: '2', color: 'bg-blue-500' },
        { name: 'Advanced', value: '3', color: 'bg-purple-500' },
    ];

    if (!props.show) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>

            {/* Modal */}
            <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all w-full max-w-md">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-semibold text-white">Select Your Level</h3>
                            <button
                                onClick={props.handleLevelModalClose}
                                className="text-white hover:text-gray-200 transition-colors"
                            >
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Body */}
                    <div className="px-6 py-4">
                        <p className="text-gray-600 mb-6">Choose your English proficiency level to get personalized content:</p>
                        <div className="grid grid-cols-1 gap-3">
                            {radios.map((radio) => (
                                <button
                                    key={radio.value}
                                    onClick={() => setRadioValue(radio.value)}
                                    className={`
                                        w-full px-4 py-3 rounded-xl flex items-center justify-between
                                        transition-all duration-200 ease-in-out
                                        ${radioValue === radio.value 
                                            ? `${radio.color} text-white shadow-lg scale-[1.02]` 
                                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                                        }
                                    `}
                                >
                                    <span className="font-medium">{radio.name}</span>
                                    {radioValue === radio.value && (
                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3">
                        <button
                            onClick={props.handleLevelModalClose}
                            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => props.handleStory(radioValue)}
                            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
                        >
                            <span>Start Learning</span>
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyLevelModal;