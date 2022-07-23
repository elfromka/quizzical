import { decode } from "js-base64";
import { QuestionObject } from "../components/Question/Question";

const randomizeArrayStrings = (array: string[]): string[] =>
    [...array].sort(() => Math.random() - 0.5);

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
