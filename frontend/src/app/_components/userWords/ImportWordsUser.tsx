'use client'
import { useDispatch, useSelector } from "react-redux";
import { importWordsUser } from "@/app/lib/features/userWords/userWordsCreateAsyncThunk";
import { AppDispatch, RootState } from "@/app/lib/features/store";

interface ImportWordsUserProps {
    userId?: string;
}

function ImportWordsUser({ userId }: ImportWordsUserProps) {
    const dispatch = useDispatch<AppDispatch>();
    const selectorUserWords = useSelector((state: RootState) => state.userWordsReducer);

    console.log('selectorUserWords:::', selectorUserWords);
    const handleImportWordsUser = () => {
        dispatch(importWordsUser(parseInt(userId!)));
    }

    return (
        <div>
            <button
                key="import-words-user"
                onClick={handleImportWordsUser}
                className={'bg-blue-500 text-white hover:bg-blue-100 hover:bg-blue-50 hover:text-gray-600 rounded-md px-4 py-2'}
            >
                Import Words
            </button>
        </div>
    );
}

export default ImportWordsUser;