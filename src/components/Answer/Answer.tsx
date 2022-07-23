import { useState, useEffect } from "react";

type Props = {
    text: string;
    correctAnswer: string;
    selectAnswer: () => void;
    selectedCount: number;
    showResults: boolean;
    handleScore: () => void;
};

const Answer = ({
    text,
    correctAnswer,
    selectAnswer,
    selectedCount,
    showResults,
    handleScore: handleScorePointsIncrement,
}: Props) => {
    const [applySelected, setApplySelected] = useState(false);
    const [classList, setClassList] = useState([
        "btn",
        "btn--outline",
        "btn--sm",
    ]);

    useEffect(() => {
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

    const classes = classList.join(" ");

    const handleClick = () => {
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
