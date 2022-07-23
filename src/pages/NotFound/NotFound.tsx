import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

//TODO: add descriptions

const NotFound = () => {
    return (
        <div className="not-found container">
            <Helmet>
                <title>Quizzes - 404 - Not found</title>
            </Helmet>
            <h1 className="not-found__title not-found__title--dark-grey">
                404 - Not found
            </h1>
            <h2 className="not-found__subtitle not-found__subtitle--primary">
                The page you requested was not found on this server.
            </h2>
            <Link className="btn btn--primary btn--xl" to="/">
                Go back
            </Link>
        </div>
    );
};

export default NotFound;
