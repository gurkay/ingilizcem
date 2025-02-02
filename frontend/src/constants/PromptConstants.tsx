const format = `
Generate 5 fill-in-the-blank English sentences with their options. 
Each sentence should have 5 options (a, b, c, d, e).
Format the response as a JSON array of objects, where each object has:
- question: the sentence with a blank (marked as _____)
- options: array of 5 possible answers
- answer: the correct answer
- explanation: the explanation of the correct answer

Example format:
[
    {
        "question": "The students _____ their homework before class.",
        "options": ["completed", "complete", "completing", "completes", "completion"],
        "answer": "completed",
        "explanation": "We use the past tense 'completed' because the action happened in the past, before class. The sentence requires a past tense verb to be grammatically correct."
    }
]
`;

const wordSynonymsFormat = `
Generate 5 fill-in-the-blank English words with their options. 
Each words should have 5 options (a, b, c, d, e).
Format the response as a JSON array of objects, where each object has:
- question: the sentence with a blank (marked as _____)
- options: array of 5 possible answers
- answer: the correct answer
- explanation: the explanation of the correct answer

Example format:
[
    {
        "question": "Which word is a synonym of 'consist'?",
        "options": ["forget", "destroy", "occur", "ignore", "decline"],
        "answer": "occur",
        "explanation": "The word 'occur' means to happen or take place, which is a synonym of 'consist'."
    }
]
`;

const turkishMeanFormat = `
Generate 5 fill-in-the-blank English words with their options. 
Each words should have 5 options (a, b, c, d, e).
Format the response as a JSON array of objects, where each object has:
- question: the sentence with a blank (marked as _____)
- options: array of 5 possible answers
- answer: the correct answer
- explanation: the explanation of the correct answer

Example format:
[
    {
        "question": "Which of the Turkish synonyms of the word "Consist" is the most suitable?",
        "options": ["İçermek", "Oluşmak", "Yaşamak", "Tartışmak", "Hayatta kalmak"],
        "answer": "Oluşmak",
        "explanation": "The word 'Oluşmak' means to happen or take place, which is a synonym of 'consist'."
    }
]
`;

const englishMeanFormat = `
Generate 5 fill-in-the-blank English words with their options. 
Each words should have 5 options (a, b, c, d, e).
Format the response as a JSON array of objects, where each object has:
- question: the sentence with a blank (marked as _____)
- options: array of 5 possible answers
- answer: the correct answer
- explanation: the explanation of the correct answer

Example format:
[
    {
        "question": "Which word is a synonym for 'consist' meaning to be composed or made up of?",
        "options": ["Persist", "Compose", "Insist", "Resist", "Erupt"],
        "answer": "Compose",
        "explanation": "The word 'Compose' means to be composed or made up of, which is a synonym of 'consist'."
    }
]
`;

const storyStart = 'Lütfen bana, ';
const storyEnd = ' kelimelerini içeren, ingilizce kısa bir hikaye yazar mısın? Şimdiden teşekkür ederim.';

const translateStart = 'Lütfen bana, \"';
const translateEnd = '\" bu metni türkçeye çevir misin? Şimdiden teşekkür ederim.';

const storyQuizStart = 'Lütfen bana, bu \"';
const storyQuizEnd = `\" ingilizce hikaye içerisinden, ${format}? Şimdiden teşekkür ederim.`;



export const PromptConstants = {

    getBeginner: (content: string) => {
        const grammarQuestion = `Could you please prepare 5 beginner level questions for me, including the English topics \"${content}\", also consisting of 5 options, in json format \" [ \"question\": \"question\", \"options\": [\"option1\", \"option2\", \"option3\", \"option4\", \"option5\"], \"answer\": \"answer\" ] \"? Thank you in advance.`;
        return grammarQuestion;
    },

    getIntermediate: (content: string) => {
        const grammarQuestion = `Could you please prepare 5 intermediate level questions for me, including the English topics \"${content}\", also consisting of 5 options, in json format \" [ \"question\": \"question\", \"options\": [\"option1\", \"option2\", \"option3\", \"option4\", \"option5\"], \"answer\": \"answer\" ] \"? Thank you in advance.`;
        return grammarQuestion;
    },

    getAdvanced: (content: string) => {
        const grammarQuestion = `Could you please prepare 5 advanced level questions for me, including the English topics \"${content}\", also consisting of 5 options, in json format \" [ \"question\": \"question\", \"options\": [\"option1\", \"option2\", \"option3\", \"option4\", \"option5\"], \"answer\": \"answer\" ] \"? Thank you in advance.`;
        return grammarQuestion;
    },

    getStory: (content: string) => {
        const result = storyStart + content + storyEnd;
        return result;
    },

    getTranslateFromEnglish: (content?: string) => {
        const result = translateStart + content + translateEnd;
        return result;
    },

    getStoryQuiz: (content: string) => {
        const result = storyQuizStart + content + storyQuizEnd;
        return result;
    },

    getWordSynonyms: (content: string) => {
        const result = `${wordSynonymsFormat}, which are synonyms of the words \"${content}\"? Thank you in advance.`;
        return result;
    },

    getClozeTest: (content: string) => {
        const result = `Could you please prepare 5 cloze test questions for me, containing the words \"${content}\", ${format}? Thank you in advance.`;
        return result;
    },

    getTurkishMean: (content: string) => {
        const result = `${turkishMeanFormat}, which are synonyms of the words \"${content}\"? Thank you in advance.`;
        return result;
    },

    getEnglishMean: (content: string) => {
        const result = `${englishMeanFormat}, which are synonyms of the words \"${content}\"? Thank you in advance.`;
        return result;
    }
}