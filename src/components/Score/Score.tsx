import { Link } from "react-router-dom";

type ScoreProps = {
    score: number;
    totalQuestions: number;
};

const Score = ({ score = 0, totalQuestions = 0 }: ScoreProps) => (
    <div className="score">
        <h3 className="score__title">
            You scored {score}/{totalQuestions} correct answers.
        </h3>
        <Link className="btn btn--primary btn--md" to="/">
            Play again
        </Link>
    </div>
);

export default Score;
