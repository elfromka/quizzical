import { useState, useEffect } from "react";

/**
 * @typedef Props
 * @prop {string} text - the answer to display
 * @prop {string} correctAnswer - the correct answer
 * @prop {Function} selectAnswer - sets selected answer of the user
 * @prop {number} selectedCount - flag if an answer is selected
 * @prop {boolean} showResults - disable the answer buttons if the results has to be shown
 * @prop {Function} handleScore - increase score points
 */
interface Props {
    text: string;
    correctAnswer: string;
    selectAnswer: () => void;
    selectedCount: number;
    showResults: boolean;
    handleScore: () => void;
}

/**
 * Represents one answer button below a question.
 *
 * @param {Props} obj - current answer, correct answer, methods and score data
 * @return {JSX.Element} answer button.
 */
const Answer = ({
    text,
    correctAnswer,
    selectAnswer,
    selectedCount,
    showResults,
    handleScore: handleScorePointsIncrement,
}: Props): JSX.Element => {
    const [applySelected, setApplySelected] = useState(false);
    const [classList, setClassList] = useState([
        "btn",
        "btn--outline",
        "btn--sm",
    ]);

    useEffect(() => {
        // modify the classList state
        if (applySelected) {
            if (showResults) {
                if (correctAnswer !== text) {
                    return setClassList((prevClassList) => [
                        ...prevClassList,
                        "btn--wrong",
                    ]);
                }

                return setClassList((prevClassList) => [
                    ...prevClassList,
                    "btn--correct",
                ]);
            }

            return setClassList((prevClassList) => [
                ...prevClassList,
                "btn--selected",
            ]);
        }

        if (!showResults) {
            setClassList((prevClassList) => {
                const copiedprevClassList = [...prevClassList];
                const indexSelectedClass =
                    copiedprevClassList.indexOf("btn--selected");

                if (indexSelectedClass !== -1) {
                    copiedprevClassList.splice(indexSelectedClass, 1);
                    return copiedprevClassList;
                }

                return prevClassList;
            });
        }

        if (showResults) {
            if (correctAnswer === text) {
                return setClassList((prevClassList) => [
                    ...prevClassList,
                    "btn--correct",
                ]);
            }
        }
    }, [showResults, applySelected, correctAnswer, text]);

    // classes in a string format from the classList state
    const classes = classList.join(" ");

    /**
     * Toggles the selected state of the answer button, changes the classes, and increases score
     * points if the selected answer is the correct answer.
     *
     * @return void
     */
    const handleClick = (): void => {
        if (selectedCount === 0 || applySelected) {
            setApplySelected((prev) => !prev);
            selectAnswer();
        }

        if (correctAnswer === text) {
            handleScorePointsIncrement();
        }
    };

    return (
        <button
            disabled={showResults}
            className={classes}
            onClick={handleClick}
            value={text}
        >
            {text}
        </button>
    );
};

export default Answer;
