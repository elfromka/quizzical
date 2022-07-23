import { useState } from "react";
import { Answer } from "../../components/list";
import { TotalUserAnswersActions } from "../../pages/Questions/Questions";

export type QuestionObject = {
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
    answers: string[];
};

type Props = {
    text: string;
    answers: string[];
    correct_answer: string;
    showScore: boolean;
    handleTotalUserAnswers: (action: TotalUserAnswersActions) => void;
    handleScore: () => void;
};

const Question: React.FC<Props> = ({
    text,
    answers,
    correct_answer,
    showScore: showResults,
    handleTotalUserAnswers,
    handleScore,
}) => {
    const [selectedCount, setSelectedCount] = useState(0);

    const handleSelect = () => {
        if (selectedCount > 1) return;
        if (selectedCount === 1) {
            setSelectedCount((prev) => prev - 1);
            handleTotalUserAnswers(TotalUserAnswersActions.DECREMENT);

            return;
        }
        setSelectedCount((prev) => prev + 1);
        handleTotalUserAnswers(TotalUserAnswersActions.INCREMENT);
    };

    return (
        <>
            <div className="question">
                <h2 className="question__title question__title--primary">
                    {text}
                </h2>
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
        </>
    );
};

export default Question;
