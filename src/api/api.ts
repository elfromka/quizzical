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

// TODO: retrieve number of questions per categories
// get max number of questions of a certain category to prevent problems while fetching questions from the API
// from this endpoint: https://opentdb.com/api_count.php?category=CATEGORY_ID_HERE
// interface Category {
//     category_id: number;
//     category_question_count: {
//         total_question_count: number;
//         total_easy_question_count: number;
//         total_medium_question_count: number;
//         total_hard_question_count: number;
//     };
// }

interface ApiOptionInterface {
    id: number;
    name: string;
}

export interface OptionInterface {
    value: string | number;
    text: string;
}

/**
 * Retrieve all the categories of questions from the Open Trivia Database API.
 *
 * @async
 *
 * @param {any} abortController - controller object that allows to abort one or more DOM requests as and when desired.
 *
 * @return {Promise<Array>} of objects (categories: id - name) or on fail returns an empty array.
 */
const fetchCategories = async (
    abortController: any
): Promise<OptionInterface[]> => {
    const ENDPOINT = `/api_category.php`;

    try {
        const response = await fetch(ENDPOINT, {
            signal: abortController.signal,
        });

        if (response.status !== 200) {
            throw new Error("No response. Check the APIs' status.");
        }

        const {
            trivia_categories,
        }: { trivia_categories: ApiOptionInterface[] } = await response.json();

        const categories: OptionInterface[] = trivia_categories.map(
            ({ id, name }: { id: number; name: string }) => ({
                value: id,
                text: name,
            })
        );

        // adding "Any Category" to options as well to get questions from any category
        categories.unshift({
            value: 0,
            text: "Any Category",
        });

        return categories;
    } catch (error: any) {
        if (error instanceof Error) {
            // don't take in consideration this first error message (appears only in dev mode)
            if (error.message !== "The user aborted a request.") {
                throw new Error(
                    `Failed on fetching categories. Message: ${error.message}`
                );
            }
        }
    }

    return [];
};

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
    let endpoint = `/api.php?amount=${amount}&difficulty=${difficulty}&type=${type}&encode=base64`;

    if (category) {
        endpoint = `${endpoint}&category=${category}`;
    }

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

        if (type === "boolean") {
            // if the type is boolean then display True before False
            return dataDecoded.map((question: any) => ({
                ...question,
                answers: [
                    ...question.incorrect_answers,
                    question.correct_answer,
                ]
                    .sort()
                    .reverse(),
            }));
        }

        return dataDecoded.map((question: any) => ({
            ...question,
            answers: randomizeArrayStrings([
                ...question.incorrect_answers,
                question.correct_answer,
            ]),
        }));
    } catch (error: any) {
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

export { fetchQuestions, fetchCategories };
