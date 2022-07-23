import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

/**
 * First (intro) page of the application from where the quiz questions loads.
 *
 * @return {JSX.Element} with a title and subtitle, start link.
 */
const Intro: React.FC = (): JSX.Element => (
    <section className="intro container">
        <Helmet>
            <title>Quizzes - Welcome!</title>
        </Helmet>
        <h1 className="intro__title intro__title--dark-grey">Quizzical</h1>
        <h2 className="intro__subtitle intro__subtitle--primary">
            Test yourself right now
        </h2>
        <Link className="btn btn--primary btn--xl" to="/questions">
            Start quiz
        </Link>
    </section>
);

export default Intro;
