import { randomizeArrayStrings, decodeObjectValues } from "../utils/utils";
import { QuestionObject } from "../components/Question/Question";

// To retrieve questions from the API with a certain difficulty level
export enum Difficulty {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard",
}

// Set questions' choices/answers type for each question
export enum Type {
    MULTIPLE = "multiple",
    BOOLEAN = "boolean",
}

// Retrieve questions in a certain category
export const categories: string[] = [
    "General Knowledge",
    "Entertainment: Books",
    "Entertainment: Film",
    "Entertainment: Music",
    "Entertainment: Musicals & Theatres",
    "Entertainment: Television",
    "Entertainment: Video Games",
    "Entertainment: Board Games",
    "Science & Nature",
    "Science: Computers",
    "Science: Mathematics",
    "Mythology",
    "Sports",
    "Geography",
    "History",
    "Politics",
    "Art",
    "Celebrities",
    "Animals",
    "Vehicles",
    "Entertainment: Comics",
    "Science: Gadgets",
    "Entertainment: Japanese Anime & Manga",
    "Entertainment: Cartoon & Animations",
];

/**
 * Retrieve questions from the Open Trivia Database API.
 *
 * @async
 * @param {number} amount - number of questions to retrieve,
 * @param {Difficulty} difficulty - difficulty level of questions,
 * @param {any} abortController - controller object that allows to abort one or more DOM requests as and when desired.
 *
 * @return {Promise<Array>} of objects (questions with their answer(s)) or on fail returns an empty array.
 */
const fetchQuestions = async (
    amount: string,
    category: string,
    difficulty: string,
    type: string,
    abortController: any
): Promise<Array<QuestionObject>> => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}&encode=base64`;

    try {
        const response = await fetch(endpoint, {
            signal: abortController.signal,
        });

        if (response.status !== 200) {
            throw new Error("No response. Check the APIs' status.");
        }

        const originalData = await response.json();

        // no questions can be returned with the criteria set by the visitor
        if (originalData.response_code === 1) {
            throw new Error(
                "Failed to get questions with these specifications. Please, try to modify them."
            );
        }

        // decoding base64 encoded values of questions - solves issue with quote marks, etc.
        const dataEncoded = [...originalData.results];
        const dataDecoded = dataEncoded.map((questionObj) =>
            decodeObjectValues(questionObj)
        );

        return dataDecoded.map((question: any) => ({
            ...question,
            answers: randomizeArrayStrings([
                ...question.incorrect_answers,
                question.correct_answer,
            ]),
        }));
    } catch (error: unknown) {
        if (error instanceof Error) {
            // don't take in consideration this first error message (appears only in dev mode)
            if (error.message !== "The user aborted a request.") {
                throw new Error(
                    `Failed on fetching questions. Message: ${error.message}`
                );
            }
        }
    }

    return [];
};

export default fetchQuestions;
