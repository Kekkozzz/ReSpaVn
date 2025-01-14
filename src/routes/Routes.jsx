import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { Filters } from "../lib/fetch";
import Welcome from "../pages/welcome";
import Register from "../pages/register";
import Login from "../pages/login";
import Genre from "../pages/genre";
import Detail from "../pages/detail";


const router = createBrowserRouter(
    createRoutesFromElements(
    <Route>
        <Route path="/" element={< Welcome />} loader={Filters} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/:genre_slug" element={<Genre />} loader={Filters}/>
        <Route path="/:genre_slug/:id" element={<Detail />} loader={Filters}/>
        
    </Route>

    )
);

export default router;