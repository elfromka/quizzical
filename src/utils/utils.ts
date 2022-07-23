import { decode } from "js-base64";
import { QuestionObject } from "../components/Question/Question";

/**
 * Arranges strings in a random order from a given array.
 *
 * @param {Array<string>} arr - an array of strings
 * @return {Array<string>} the array with the same values and length, but with random ordering
 */
const randomizeArrayStrings = (arr: string[]): string[] =>
    [...arr].sort(() => Math.random() - 0.5);

/**
 * Brief description of the function here.
 *
 * @param {QuestionObject<string>} obj - only QuestionObject type of object with base64 encoded values
 * @return {QuestionObject<string>} QuestionObject with decoded string values.
 */
//TODO: needs change to be more general (on the object structure)!
const decodeObjectValues = ({
    category,
    type,
    difficulty,
    question,
    correct_answer,
    incorrect_answers,
}: QuestionObject) => ({
    category: decode(category),
    type: decode(type),
    difficulty: decode(difficulty),
    question: decode(question),
    correct_answer: decode(correct_answer),
    incorrect_answers: incorrect_answers.map((answer) => decode(answer)),
});

export { randomizeArrayStrings, decodeObjectValues };
