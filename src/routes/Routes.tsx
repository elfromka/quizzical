import { useRoutes } from "react-router-dom";
import { Intro, NotFound, Questions } from "../pages";

/**
 * Used for set the routing of the whole application.
 *
 * @summary equivalent of <Routes>, but it uses JS objects instead of <Route> elements to define routes.
 * These objects have the same properties as normal <Route> elements, but they don't require JSX.
 *
 * @return {JSX.Element | null} valid React element that can be rendered or null.
 */
const Routes = (): JSX.Element | null =>
    useRoutes([
        { path: "/questions", element: <Questions /> },
        { path: "/", element: <Intro /> },
        { path: "*", element: <NotFound /> },
    ]);

export default Routes;
