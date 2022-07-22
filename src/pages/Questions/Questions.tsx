import { useEffect, useState } from "react";
import { Question, Score, Loader } from "../../components/list";
import fetchQuestions, { Difficulty, NR_OF_QUESTIONS } from "../../api/api";

export enum TotalUserAnswersActions {
    INCREMENT = "increment",
    DECREMENT = "decrement",
}

const Questions = () => {
    const [loading, setLoading] = useState(true);
    const [questions, setQuestions] = useState([]);
    const [totalUserAnswers, setTotalUserAnswers] = useState(0);
    const [gameOver, setGameOver] = useState({
        showScoreComponent: false,
        showCheckButton: true,
    });

    useEffect(() => {
        const abortController = new AbortController();

        const fetchData = async () => {
            const fetchedQuestions = await fetchQuestions(
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
    }, []);

    const handleTotalUserAnswers = (action: TotalUserAnswersActions) => {
        if (action === "increment") {
            setTotalUserAnswers((prev) => prev + 1);

            return;
        }

        setTotalUserAnswers((prev) => prev - 1);
    };

    const handleCheckButtonClick = () => {
        setGameOver((prev) => ({
            ...prev,
            showScoreComponent: !prev.showScoreComponent,
            showCheckButton: !prev.showCheckButton,
        }));
    };

    return (
        <>
            {console.log(totalUserAnswers)}
            <div className="questions container">
                {loading && questions.length === 0 ? (
                    [...Array(NR_OF_QUESTIONS)].map((currentValue, i) => (
                        <Loader key={`${currentValue}-${i}`} />
                    ))
                ) : (
                    <>
                        {questions.map(
                            (
                                {
                                    question,
                                    answers,
                                    correct_answer,
                                    incorrect_answers,
                                },
                                index
                            ) => (
                                <Question
                                    key={index}
                                    answers={answers}
                                    text={question}
                                    correct_answer={correct_answer}
                                    incorrect_answer={incorrect_answers}
                                    handleTotalUserAnswers={
                                        handleTotalUserAnswers
                                    }
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
                <Score score={2} totalQuestions={5} />
            )}
        </>
    );
};

export default Questions;
