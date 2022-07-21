// import { Question, Score } from "../../components/list";
import { useEffect, useState } from "react";
import fetchQuestions, { Difficulty, NR_OF_QUESTIONS } from "../../api/api";
import { Question, Loader } from "../../components/list";

// const checkAnswers = () => {};

const Questions = () => {
    const [loading, setLoading] = useState(true);
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const fetchedQuestions = await fetchQuestions(5, Difficulty.EASY);
            setQuestions(fetchedQuestions);
        };

        fetchData();

        setLoading(false);
    }, []);

    return (
        <>
            <div className="questions container">
                {questions ? true : false}
                {loading ? (
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
            <button disabled={loading} className="btn btn--primary btn--md">
                Check answers
            </button>
            {/* <Score score={2} totalQuestions={5} /> */}
        </>
    );
};

export default Questions;
