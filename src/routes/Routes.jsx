import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { Filters } from "../lib/fetch";
import Welcome from "../pages/welcome";
import SignIn from "../pages/signIn";
import SignUp from "../pages/signUp";
import Genre from "../pages/genre";


const router = createBrowserRouter(
    createRoutesFromElements(
    <Route loader={Filters}>
        <Route path="/" element={< Welcome />} loader={Filters} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/games/:genre_slug" element={<Genre />} loader={Filters}/>
        
    </Route>

    )
);

export default router;