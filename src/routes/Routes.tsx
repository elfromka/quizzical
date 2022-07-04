import { useRoutes } from "react-router-dom";
import { Intro, NotFound, Questions } from "../pages/list";

const Routes = () => {
    return useRoutes([
        { path: "/questions", element: <Questions /> },
        { path: "/", element: <Intro /> },
        { path: "*", element: <NotFound /> },
    ]);
};

export default Routes;
