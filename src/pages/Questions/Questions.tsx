import { useEffect, useState } from "react";
import { Question, Score, Loader, Button } from "../../components/list";
import fetchQuestions, { Difficulty, NR_OF_QUESTIONS } from "../../api/api";
import { QuestionObject } from "../../components/Question/Question";

// used in handleTotalUserAnswers and handleScore functions
export enum Actions {
    INCREMENT = "increment",
    DECREMENT = "decrement",
}

/**
 * Brief description of the function here.
 *
 * @return {JSX.Element} with questions, 'Check answers' button or Score component
 */
const Questions: React.FC = (): JSX.Element => {
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
        // to clean-up the useEffect hook after fetching data from API
        const abortController = new AbortController();

        const fetchData = async () => {
            const fetchedQuestions: QuestionObject[] = await fetchQuestions(
                5,
                Difficulty.EASY,
                abortController
            );

            setQuestions(fetchedQuestions);
            setLoading(false);
        };

        fetchData();

        // this will cancel the fetch request when the effect is unmounted
        return () => abortController.abort();
    }, [playAgain]);

    /**
     * Calcultes the total sum of the answered questions from the user.
     *
     * @param {string} action - increment | decrement
     */
    const handleTotalUserAnswers = (action: string): void => {
        if (action === "increment") {
            setTotalUserAnswers((prevNr) => prevNr + 1);

            return;
        }

        setTotalUserAnswers((prevNr) => prevNr - 1);
    };

    /**
     * Increments or decrements the scores' state of the user depending what is received in the parameter of action.
     *
     * @param {string} action - increment | decrement
     */
    const handleScore = (action: string): void => {
        if (action === "increment") {
            setScore((prevScore) => prevScore + 1);
            return;
        }

        setScore((prevScore) => prevScore - 1);
    };

    /**
     * Changes state of the gameplay to hide/show the 'Check answers' button and display the score component.
     */
    const handleCheckButtonClick = (): void => {
        setGameOver((prev) => ({
            ...prev,
            showScoreComponent: !prev.showScoreComponent,
            showCheckButton: !prev.showCheckButton,
        }));
    };

    /**
     * Invoked when the game is restarted ('Play again' button is pressed) to reset states.
     */
    const handlePlayAgain = (): void => {
        setPlayAgain((prev) => !prev);
        resetStates();
    };

    /**
     * Called from handlePlayAgain to reset all states (score, questions answered, etc.)
     */
    const resetStates = (): void => {
        setTotalUserAnswers(0);
        setLoading(true);
        setQuestions([]);
        setScore(0);
        setGameOver({
            showScoreComponent: false,
            showCheckButton: true,
        });
    };

    return (
        <>
            <section className="questions container">
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
                <p className="questions__info">
                    Click again on an already selected answer to <b>deselect</b>{" "}
                    it.
                </p>
            </section>
            {gameOver.showCheckButton && (
                <Button
                    classes="btn btn--primary btn--md"
                    onClick={handleCheckButtonClick}
                    disabled={
                        (loading && (questions.length === 0 ? true : false)) ||
                        totalUserAnswers < NR_OF_QUESTIONS
                    }
                >
                    Check answers
                </Button>
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
