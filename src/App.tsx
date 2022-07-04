import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes/Routes";
import "./assets/scss/general.scss";

const App = () => {
    return (
        <Router>
            <Routes />
        </Router>
    );
};

export default App;
