import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function RenderCards() {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function getGames() {
            setLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}games?key=${import.meta.env.VITE_API_KEY}&dates=2023-01-01,2024-01-01`);
            const json = await response.json();
            setGames(json.results);
            // console.log(json.results);
            setLoading(false);
        }
        getGames();
    }, []);
    return (
        <>
            <div className="container mt-5">
                <div className="row">

                    {loading &&
                        <div className="col-12 d-flex justify-content-center fade-in">
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
                        </div>}

                    {games.map(game => (
                        <div className="col-12 col-md-6 d-flex justify-content-center my-3" key={game.id}>
                            <div className="card border-0 zoom-in">
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
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
)}