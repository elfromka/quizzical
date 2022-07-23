import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes/Routes";
import { Helmet } from "react-helmet";
import "./assets/scss/styles.scss";

const App: React.FC = () => {
    return (
        <div className="wrapper wrapper--primary wrapper--centered">
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
        </div>
    );
};

export default App;
