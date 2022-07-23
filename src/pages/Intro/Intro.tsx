import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const Intro: React.FC = () => (
    <div className="intro container">
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
    </div>
);

export default Intro;
