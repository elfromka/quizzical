import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes/Routes";
import "./assets/scss/styles.scss";

const App = () => {
    return (
        <div className="wrapper wrapper--primary wrapper--centered">
            <Router>
                <Routes />
            </Router>
            <div className="blob blob--top blob--yellow"></div>
            <div className="blob blob--bottom blob--blue"></div>
        </div>
    );
};

export default App;
