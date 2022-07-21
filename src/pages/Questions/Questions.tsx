// import { Question, Score } from "../../components/list";
import { useEffect, useState } from "react";
import fetchQuestions, { Difficulty, NR_OF_QUESTIONS } from "../../api/api";
import { Question, Loader } from "../../components/list";

// const checkAnswers = () => {};

const Questions = () => {
    const [loading, setLoading] = useState(true);
    const [questions, setQuestions] = useState([]);

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
                                />
                            )
                        )}
                    </>
                )}
            </div>
            <button
                disabled={loading && (questions.length === 0 ? true : false)}
                className="btn btn--primary btn--md"
            >
                Check answers
            </button>
            {/* <Score score={2} totalQuestions={5} /> */}
        </>
    );
};

export default Questions;
