import { BrowserRouter as Router } from "react-router-dom";
import { Helmet } from "react-helmet";
import Routes from "./routes/Routes";

import "./assets/scss/styles.scss";

//TODO: Error in console of browser caused by the react-helmet module. Check: https://github.com/nfl/react-helmet/issues/623

/**
 * Returns the default component of the project and its' children (pages and their components) through routes.
 *
 * @return {JSX.Element} main element.
 */
const App: React.FC = (): JSX.Element => (
    <main className="wrapper wrapper--primary wrapper--centered">
        <Helmet>
            <title>Quizzes</title>
            <meta
                name="description"
                content="Test your general knowledge with 5 questions from various topics in this quiz."
            />
            <meta
                name="keywords"
                content="quiz, question, questions, answer, answers, knowledge, information, interesting"
            />
        </Helmet>
        <Router>
            <Routes />
        </Router>
        <div className="blob blob--top blob--yellow"></div>
        <div className="blob blob--bottom blob--blue"></div>
    </main>
);

export default App;
