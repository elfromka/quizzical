import { useState } from "react";
import { Actions } from "../../pages/Questions/Questions";
import { Answer } from "../../components";

/**
 * @typedef QuestionObject
 * @prop {string} category - category from which the question is included
 * @prop {string} type - type of answers (multiple choice or true/false)
 * @prop {string} difficulty - easy | medium | hard
 * @prop {string} question - the question string
 * @prop {string} correct_answer - the correct answer of the question
 * @prop {Array<string>} incorrect_answers - an array of the incorrect answers
 * @prop {Array<string>} answers - the correct and the incorrect answers combined randomly in an array
 */
export interface QuestionObject {
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
    answers: string[];
}

/**
 * @typedef Props
 * @prop {string} text - the actual question
 * @prop {Array<string>} answers - all answers (incorrect ones with the correct one) in an array
 * @prop {string} correct_answer - the correct answer
 * @prop {boolean} showScore - hide/display the score component
 * @prop {} handleTotalUserAnswers - method to increase/decrease total nr of answers of the user
 * @prop {} handleScore - method to increase/decrease the score of the user
 */
interface Props {
    text: string;
    answers: string[];
    correct_answer: string;
    showScore: boolean;
    handleTotalUserAnswers: (action: Actions) => void;
    handleScore: (action: Actions) => void;
}

/**
 * Renders a question element with the data fetched from the API.
 * @param {Props} obj - having the question, answers, some methods, etc.
 * @return {JSX.Element} question and its' answers
 */
const Question: React.FC<Props> = ({
    text,
    answers,
    correct_answer,
    showScore: showResults,
    handleTotalUserAnswers,
    handleScore,
}): JSX.Element => {
    const [selectedCount, setSelectedCount] = useState(0);

    /**
     * Invoked on click of an answer component.
     */
    const handleSelect = (): void => {
        if (selectedCount > 1) return;

        if (selectedCount === 1) {
            setSelectedCount((prev) => prev - 1);
            handleTotalUserAnswers(Actions.DECREMENT);
            return;
        }

        setSelectedCount((prev) => prev + 1);
        handleTotalUserAnswers(Actions.INCREMENT);
    };

    return (
        <div className="question">
            <h2 className="question__title question__title--primary">{text}</h2>
            <div className="answers">
                {answers.map((answer, index) => (
                    <Answer
                        key={index}
                        text={answer}
                        correctAnswer={correct_answer}
                        selectAnswer={handleSelect}
                        selectedCount={selectedCount}
                        showResults={showResults}
                        handleScore={handleScore}
                    />
                ))}
            </div>
            <hr className="separator" />
        </div>
    );
};

export default Question;
