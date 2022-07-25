/**
 * @typedef ScoreProps
 * @prop {number} score - total points of user
 * @prop {number} totalQuestions - number of questions displayed
 * @prop {} handlePlayAgain - quiz start method/action
 */
interface ScoreProps {
    score: number;
    totalQuestions: number;
    handlePlayAgain: () => void;
}

/**
 * Score information of user after each question has a selected answer and the 'Check answers' button is clicked.
 *
 * @type {ScoreProps}
 * @param {Object<ScoreProps>} obj - (?) score, nr of questions and method of replay
 * @return {JSX.Element} with the final points and a button for replay
 */
const Score = ({
    score = 0,
    totalQuestions = 0,
    handlePlayAgain,
}: ScoreProps): JSX.Element => (
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
