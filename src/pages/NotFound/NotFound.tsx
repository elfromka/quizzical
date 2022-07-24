import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

/**
 * 404 not found page for any other route than "/" and "/questions".
 *
 * @return {JSX.Element} with a title, subtitle, and a go back button which goes to the Intro page.
 */
const NotFound: React.FC = (): JSX.Element => (
    <section className="not-found container">
        <Helmet>
            <title>Quizzical - 404 - Not found</title>
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
    </section>
);

export default NotFound;
