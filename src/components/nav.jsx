import { NavLink, Link } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import SearchGame from "./searchGame";
import supabase from "../supabase/client";
import { useContext } from "react";
import SessionContext from "../context/SessionContext";
export default function Nav() {
    const session = useContext(SessionContext);
    const logout = async () => {
        const { error } = await supabase.auth.signOut()
        if (error) {
            alert(error)
        }
    }
    const { genres, platforms } = useLoaderData();
    // console.log({ genres, platforms });
    return (
        <>
            <nav className="container-fluid navbar navbar-expand-lg border-body px-5 pt-4 mb-2" data-bs-theme="dark">

                <Link to="/" className="navbar-brand fw-bold fs-3 px-5">ReSpaVn</Link>

                <SearchGame />

                <ul className="navbar-nav ms-auto mb-2 mb-lg-0 pe-5">
                    <li className="nav-item dropdown px-3">
                        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Generi
                        </a>
                        <ul className="dropdown-menu">
                            {genres.map((genre) => (
                                <li key={genre.id}>
                                    <Link to={`/${genre.slug}`} className="dropdown-item">{genre.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </li>

                    <li className="nav-item dropdown px-3">
                        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Piattaforme
                        </a>
                        <ul className="dropdown-menu">
                            {platforms.map((platform) => (
                                <li key={platform.id}>
                                    <Link to={`/platform/${platform.slug}`} className="dropdown-item">{platform.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </li>
                    {session ?
                        <li>
                            <button className="nav-link px-3 text-warning" onClick={logout}>Esci</button>
                        </li>
                        :
                        <li>
                            <NavLink to="/register" className="nav-link px-3">Registrati/Accedi</NavLink>
                        </li>
                    }


                </ul>

            </nav>
        </>
    )
}

