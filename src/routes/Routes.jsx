import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { Filters } from "../lib/fetch";
import Welcome from "../pages/welcome";
import SignIn from "../pages/signIn";
import SignUp from "../pages/signUp";
import Genre from "../pages/genre";
import Detail from "../pages/detail";


const router = createBrowserRouter(
    createRoutesFromElements(
    <Route>
        <Route path="/" element={< Welcome />} loader={Filters} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/:genre_slug" element={<Genre />} loader={Filters}/>
        <Route path="/:genre_slug/:game_id" element={<Detail />} loader={Filters}/>
        
    </Route>

    )
);

export default router;