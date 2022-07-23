//TODO: add descriptions

type ScoreProps = {
    score: number;
    totalQuestions: number;
    handlePlayAgain: () => void;
};

const Score = ({
    score = 0,
    totalQuestions = 0,
    handlePlayAgain,
}: ScoreProps) => (
    <div className="score">
        <h3 className="score__title">
            You scored {score}/{totalQuestions} correct answers.
        </h3>
        <button className="btn btn--primary btn--md" onClick={handlePlayAgain}>
            Play again
        </button>
    </div>
);

export default Score;
