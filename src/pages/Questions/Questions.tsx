import { useEffect, useState } from "react";
import { Question, Score, Loader } from "../../components/list";
import fetchQuestions, { Difficulty, NR_OF_QUESTIONS } from "../../api/api";
import { QuestionObject } from "../../components/Question/Question";

export enum TotalUserAnswersActions {
    INCREMENT = "increment",
    DECREMENT = "decrement",
}

const Questions = () => {
    const [playAgain, setPlayAgain] = useState(false);
    const [loading, setLoading] = useState(true);
    const [questions, setQuestions] = useState<QuestionObject[]>([]);
    const [totalUserAnswers, setTotalUserAnswers] = useState(0);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState({
        showScoreComponent: false,
        showCheckButton: true,
    });

    useEffect(() => {
        const abortController = new AbortController();

        const fetchData = async () => {
            const fetchedQuestions: QuestionObject[] = await fetchQuestions(
                5,
                Difficulty.EASY,
                abortController
            );
            setQuestions(fetchedQuestions);
        };

        fetchData();
        setLoading(true);

        // this will cancel the fetch request when the effect is unmounted
        return () => abortController.abort();
    }, [playAgain]);

    const handleTotalUserAnswers = (action: TotalUserAnswersActions) => {
        if (action === "increment") {
            setTotalUserAnswers((prevNr) => prevNr + 1);

            return;
        }

        setTotalUserAnswers((prevNr) => prevNr - 1);
    };

    const handleScore = () => {
        setScore((prevScore) => prevScore + 1);
    };

    const handleCheckButtonClick = () => {
        setGameOver((prev) => ({
            ...prev,
            showScoreComponent: !prev.showScoreComponent,
            showCheckButton: !prev.showCheckButton,
        }));
    };

    const handlePlayAgain = () => {
        setPlayAgain((prev) => !prev);
        resetStates();
    };

    const resetStates = () => {
        setTotalUserAnswers(0);
        setLoading(false);
        setQuestions([]);
        setScore(0);
        setGameOver({
            showScoreComponent: false,
            showCheckButton: true,
        });
    };

    return (
        <>
            <div className="questions container">
                {loading && questions.length === 0 ? (
                    [...Array(NR_OF_QUESTIONS)].map((currentValue, i) => (
                        <Loader key={`${currentValue}-${i}`} />
                    ))
                ) : (
                    <>
                        {questions.map(
                            ({ question, answers, correct_answer }, index) => (
                                <Question
                                    key={index}
                                    answers={answers}
                                    text={question}
                                    correct_answer={correct_answer}
                                    handleTotalUserAnswers={
                                        handleTotalUserAnswers
                                    }
                                    showScore={gameOver.showScoreComponent}
                                    handleScore={handleScore}
                                />
                            )
                        )}
                    </>
                )}
            </div>
            {gameOver.showCheckButton && (
                <button
                    disabled={
                        (loading && (questions.length === 0 ? true : false)) ||
                        totalUserAnswers < NR_OF_QUESTIONS
                    }
                    className="btn btn--primary btn--md"
                    onClick={handleCheckButtonClick}
                >
                    Check answers
                </button>
            )}
            {gameOver.showScoreComponent && (
                <Score
                    score={score}
                    totalQuestions={NR_OF_QUESTIONS}
                    handlePlayAgain={handlePlayAgain}
                />
            )}
        </>
    );
};

export default Questions;
