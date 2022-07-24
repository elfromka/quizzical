import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes/Routes";

import "./assets/scss/styles.scss";

/**
 * Returns the default component of the project and its' children (pages and their components) through routes.
 *
 * @return {JSX.Element} main element.
 */
const App: React.FC = (): JSX.Element => (
    <main className="wrapper wrapper--primary wrapper--centered">
        <Router>
            <Routes />
        </Router>
        <div className="blob blob--top blob--yellow"></div>
        <div className="blob blob--bottom blob--blue"></div>
    </main>
);

export default App;
