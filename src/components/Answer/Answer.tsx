import { useState } from "react";

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
        // TODO: refactor the class set on the buttons - too messy
        <button
            disabled={showResults}
            className={`btn btn--outline btn--sm ${
                (!showResults && applySelected && "btn--selected") ||
                (showResults &&
                    applySelected &&
                    correctAnswer !== text &&
                    "btn--wrong")
            } ${showResults && correctAnswer === text && "btn--correct"}`}
            onClick={handleClick}
            value={text}
        >
            {text}
        </button>
    );
};

export default Answer;
