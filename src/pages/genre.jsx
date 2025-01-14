import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Nav from "../components/nav";
import { Link } from "react-router-dom";

export default function Genre() {
    const { genre_slug } = useParams();
    const [genreGames, setGenreGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    // console.log(genres);

    useEffect(() => {
        async function getGenreGames() {
            setLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}games?key=${import.meta.env.VITE_API_KEY}&genres=${genre_slug}&page=${page}`);
            const json = await response.json();
            setGenreGames(json.results);
            setLoading(false);
        }
        getGenreGames();
    }, [genre_slug, page]);
    return (
        <>
            <Nav />
            <div className="container mt-5">
                <div className="row">

                    {loading ? (
                        <div className="fade-in">
                            <div className="col-12 d-flex justify-content-center">
                                <div className="loader">
                                    <svg viewBox="0 0 80 80">
                                        <circle r="32" cy="40" cx="40" id="test"></circle>
                                    </svg>
                                </div>

                                <div className="loader triangle">
                                    <svg viewBox="0 0 86 80">
                                        <polygon points="43 8 79 72 7 72"></polygon>
                                    </svg>
                                </div>

                                <div className="loader">
                                    <svg viewBox="0 0 80 80">
                                        <rect height="64" width="64" y="8" x="8"></rect>
                                    </svg>
                                </div>
                            </div>
                        </div>

                    ) : (genreGames.map(game => (
                        <div className="col-12 col-md-6 d-flex justify-content-center my-3" key={game.id}>
                            <div className="card border-0 zoom-in">
                                <Link to={`/${game.genres[0].slug}/${game.id}`} className="text-decoration-none">
                                    <img src={game.background_image} alt="{game.name}" className="card-img-top" />
                                    <div className="card-body bg-secondario text-light">
                                        <h5 className="card-title">{game.name}</h5>
                                        <em>
                                            <Link to={`/games/${game.genres[0].slug}`} className="text-decoration-none acc-primario hover-primario">{game.genres[0].name}</Link>
                                        </em>
                                        {game.genres[1] &&
                                            <span>
                                                <em>
                                                    <span className="acc-primario"> | </span>
                                                    <Link to={`/games/${game.genres[1].slug}`} className="text-decoration-none acc-primario hover-primario">{game.genres[1].name}</Link>
                                                </em>
                                            </span>
                                        }
                                        {game.genres[2] &&
                                            <span>
                                                <em>
                                                    <span className="acc-primario"> | </span>
                                                    <Link to={`/games/${game.genres[2].slug}`} className="text-decoration-none acc-primario hover-primario">{game.genres[2].name}</Link>
                                                </em>
                                            </span>
                                        }
                                        {game.genres[3] &&
                                            <span>
                                                <em>
                                                    <span className="acc-primario"> | </span>
                                                    <Link to={`/games/${game.genres[3].slug}`} className="text-decoration-none acc-primario hover-primario">{game.genres[3].name}</Link>
                                                </em>
                                            </span>
                                        }
                                        {game.genres[4] &&
                                            <span>
                                                <em>
                                                    <span className="acc-primario"> | </span>
                                                    <Link to={`/games/${game.genres[4].slug}`} className="text-decoration-none acc-primario hover-primario">{game.genres[4].name}</Link>
                                                </em>
                                            </span>
                                        }
                                        {game.genres[5] &&
                                            <span>
                                                <em>
                                                    <span className="acc-primario"> | </span>
                                                    <Link to={`/games/${game.genres[5].slug}`} className="text-decoration-none acc-primario hover-primario">{game.genres[5].name}</Link>
                                                </em>
                                            </span>
                                        }
                                    </div>
                                </Link>
                            </div>
                        </div>
                    )))}
                    {loading !== true &&
                        <div className="row my-4">

                            {page !== 1 &&
                                <div className="col-6">
                                    <button className="btn btn-light" onClick={() => setPage(page - 1)}>
                                        Via indietro
                                    </button>
                                </div>
                            }
                            {page == 1 &&
                                <div className="col-12 col-6 d-flex justify-content-end">
                                    <button className="btn btn-light" onClick={() => setPage(page + 1)}>
                                        Via avanti
                                    </button>
                                </div>
                            }

                            {page > 1 &&
                                
                                <div className="col-6 d-flex justify-content-end">
                                    <button className="btn btn-light" onClick={() => setPage(page + 1)}>
                                        Via avanti
                                    </button>
                                </div>
                                
                            }
                        </div>
                    }
                </div>
            </div>

        </>
    );
}
