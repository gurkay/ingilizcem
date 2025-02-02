export const getStringToJson = (str: string) => {
    const questionsFormat = str.split('```').map((e: string) => e.split('json'));
    const question = questionsFormat[1]!;
    const questions = question === undefined ? '' : question[1];
    const json = JSON.parse(questions || '{}');
    return json;
}