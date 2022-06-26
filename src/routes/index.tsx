import {useRoutes} from "react-router-dom";
import Home from "../pages/Home";
import PokemonDetails from "../pages/PokemonDetails";
import Favorites from "../pages/Favorites";

export default function Router() {
    return useRoutes([
        {
            path: '', element: <Home/>
        },
        {
            path: '/:id', element: <PokemonDetails/>
        },
        {
            path: '/favorites', element: <Favorites/>
        }
    ])
}