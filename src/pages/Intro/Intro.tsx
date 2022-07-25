import { Link } from "react-router-dom";

/**
 * First (intro) page of the application from where the quiz questions loads.
 *
 * @return {JSX.Element} with a title and subtitle, start link.
 */
const Intro: React.FC = (): JSX.Element => (
    <section className="intro container">
        <h1 className="intro__title intro__title--dark-grey">Quizzical</h1>
        <h2 className="intro__subtitle intro__subtitle--primary">
            Test your knowledge with 5 random questions.
        </h2>
        <Link className="btn btn--primary btn--xl" to="/questions">
            Start quiz
        </Link>
    </section>
);

export default Intro;
