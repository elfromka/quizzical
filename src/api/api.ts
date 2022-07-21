import { randomizeArrayStrings } from "../utils/utils";

export enum Difficulty {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard",
}

export const NR_OF_QUESTIONS: number = 5;

const fetchQuestions = async (
    amount: number = NR_OF_QUESTIONS,
    difficulty: Difficulty,
    abortController: any
) => {
    // const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple&encode=base64`;
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;

    try {
        const response = await fetch(endpoint, {
            signal: abortController.signal,
        });

        if (response.status !== 200) {
            throw new Error("No response. Check the APIs' status.");
        }

        const data = await response.json();

        return data.results.map((question: any) => ({
            ...question,
            answers: randomizeArrayStrings([
                ...question.incorrect_answers,
                question.correct_answer,
            ]),
        }));
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(
                `Failed on fetching questions. Message: ${error.message}`
            );
        }
    }
};

export default fetchQuestions;
