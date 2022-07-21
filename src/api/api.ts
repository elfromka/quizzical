import { randomizeArrayStrings } from "../utils/utils";

export enum Difficulty {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard",
}

export const NR_OF_QUESTIONS: number = 5;

const fetchQuestions = async (
    amount: number = NR_OF_QUESTIONS,
    difficulty: Difficulty
) => {
    // const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple&encode=base64`;
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;

    try {
        const response = await fetch(endpoint);

        if (response.status !== 200) {
            throw new Error("API failed to respond. Please, try again later!");
        }

        const data = await response.json();

        return data.results.map((question: any) => ({
            ...question,
            answers: randomizeArrayStrings([
                ...question.incorrect_answers,
                question.correct_answer,
            ]),
        }));
    } catch (error) {
        console.error(error);

        throw new Error("Failed to fetch questions from the API");
    }
};

export default fetchQuestions;
