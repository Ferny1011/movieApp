import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home.jsx";
import MovieDetail from '../pages/MovieDetail';


const Router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/movie/:id",
        element: <MovieDetail />
    }
]);

export default Router;