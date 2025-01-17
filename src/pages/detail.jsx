import Nav from "../components/nav";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Detail() {
    const { genre_slug, id } = useParams();
    const [game, setGame] = useState({});

    useEffect(() => {
        async function getGame() {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}games/${id}?key=${import.meta.env.VITE_API_KEY}`);
            const json = await response.json();
            setGame(json);
            console.log(json);
            
        }
        getGame();
    }, [id]);

    return (
        <>

            <Nav />

            <div
                className="hero-section position-relative text-white mt-3"
                style={{
                    backgroundImage: `url(${game.background_image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "75vh",
                }}
            >
                <div className="overlay position-absolute w-100 h-100" style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}></div>
                <div className="container h-100 d-flex flex-column justify-content-center align-items-start text-start position-relative">
                    <h1 className="fw-bold display-4">{game.name}</h1>
                    <h5 className="mt-2">{new Date(game.released).toLocaleDateString("it-IT")}</h5>
                    <div className="d-flex mt-3">
                        <button className="btn btn-light me-3 rounded-pill">Aggiungi ai preferiti</button>
                    </div>
                </div>
            </div>

            <div className="container mt-5">
                <div className="row">
                    <div className="col-lg-3">
                        <div>
                            {game.esrb_rating && game.esrb_rating.id === 3 &&
                            <img src="../../public/Teen.png" style={{ width: '100px' }} alt="Teen" />
                        }
                        {game.esrb_rating && game.esrb_rating.id === 4 &&
                            <img src="../../public/Mature.png" style={{ width: '100px' }} alt="Mature" />
                        }
                        {game.esrb_rating && game.esrb_rating.id === 5 &&
                            <img src="../../public/AdultsOnly.webp" style={{ width: '100px' }} alt="Adults Only" />
                        }
                        {game.esrb_rating && game.esrb_rating.id === 6 &&
                            <img src="../../public/Pending.png" style={{ width: '100px' }} alt="Pending" />
                        }
                        {game.esrb_rating == null &&
                            <img src="../../public/Everyone.png" style={{ width: '100px' }} alt="Everyone" />
                        }
                        </div>
                        <div className="my-4">
                            <h5 className="fw-bold">Piattaforme</h5>
                            <ul className="list-unstyled">
                                {game.platforms?.map((platform) => (
                                    <li className="badge rounded-pill text-bg-secondary me-1 my-1" key={platform.platform.id}>{platform.platform.name}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="mb-4">
                            <h5 className="fw-bold">Generi</h5>
                            <ul className="list-unstyled">
                                {game.genres?.map((genre) => (
                                    <li className="badge rounded-pill text-bg-info me-1" key={genre.id}>{genre.name}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="mb-4">
                            <h5 className="fw-bold">Metacritic</h5>
                            <div
                                className="rating-badge d-inline-block text-white px-3 py-1 rounded-pill"
                                style={{
                                    backgroundColor: game.metacritic >= 75 ? "#28a745" : game.metacritic >= 50 ? "#ffc107" : "#dc3545",
                                }}
                            >
                                {game.metacritic || "N/A"}
                            </div>
                        </div>
                        <div className="mb-4">
                            <h5 className="fw-bold">Rating</h5>
                            <div
                                className="rating-badge d-inline-block text-white px-3 py-1 rounded-pill"
                                style={{
                                    backgroundColor: game.rating >= 4 ? "#28a745" : game.rating >= 2 ? "#E2AB05" : "#dc3545",
                                }}
                            >
                                {game.rating || "N/A"}
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-9">
                        <div className="mb-4">
                            <h5 className="fw-bold">Informazioni sul gioco</h5>
                            <p className="text-secondary">{game.description_raw}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
