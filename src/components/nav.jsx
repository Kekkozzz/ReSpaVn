import { NavLink, Link } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
export default function Nav() {
    const { genres, platforms } = useLoaderData();
    // console.log({ genres, platforms });
    return (
        <>
            <nav className="container-fluid navbar navbar-expand-lg bg-secondario border-bottom border-body px-5 py-3 sticky-top" data-bs-theme="dark">

                <Link to="/" className="navbar-brand fs-3 px-5">ReSpaVn</Link>

                <form className="d-flex mx-auto" role="search" style={{ width: "40%" }}>
                    <input className="form-control me-2" type="search" placeholder="Cerca il tuo gioco" aria-label="Search"></input>
                    <div style={{ position: "relative" }}>
                        <button className="btn " type="submit" style={{ position: "absolute", right: "8px" }}>
                            <i className="bi bi-search"></i>
                        </button>
                    </div>
                </form>

                <ul className="navbar-nav ms-auto mb-2 mb-lg-0 pe-5">
                    <li className="nav-item dropdown px-3">
                        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Generi
                        </a>
                        <ul className="dropdown-menu">
                            {genres.map((genre) => (
                                <li key={genre.id}>
                                    <Link to={`/games/${genre.slug}`} className="dropdown-item">{genre.name}</Link>
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
                    <li>
                        <NavLink to="/signin" className="nav-link px-3">Registrati/Accedi</NavLink>
                    </li>
                </ul>

            </nav>
        </>
    )
}

