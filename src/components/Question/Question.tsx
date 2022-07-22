import { useState } from "react";
import { Answer } from "../../components/list";
import { TotalUserAnswersActions } from "../../pages/Questions/Questions";

type Props = {
    text: string;
    answers: string[];
    correct_answer: string;
    incorrect_answer: string[];
    handleTotalUserAnswers: (action: TotalUserAnswersActions) => void;
};

const Question: React.FC<Props> = ({
    text,
    answers,
    // correct_answer,
    // incorrect_answer,
    handleTotalUserAnswers,
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
                            selectAnswer={handleSelect}
                            selectedCount={selectedCount}
                        />
                    ))}
                </div>
                <hr className="separator" />
            </div>
        </>
    );
};

export default Question;
