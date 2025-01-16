import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function SearchGame() {
    const [search, setSearch] = useState("");
    const [games, setGames] = useState([]);
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        const timeoutAPI = setTimeout(() => {
            async function fetchData() {
                if (!search) {
                    setGames([]);
                    return;
                }
                const response = await fetch(
                    `${import.meta.env.VITE_BASE_URL}games?key=${import.meta.env.VITE_API_KEY}&page=1&search=${search}`
                );
                const json = await response.json();
                setGames(json.results);
            }
            fetchData();
        }, 400);
        return () => clearTimeout(timeoutAPI);
    }, [search]);

    return (
        <>
            <div className="form__group field ms-5">
                <input
                    type="input"
                    className="form__field"
                    placeholder="Name"
                    required
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onFocus={() => setShowResults(true)}
                    onBlur={() => setTimeout(() => setShowResults(false), 200)}
                />
                <label htmlFor="name" className="form__label">
                    Cerca 800k+ giochi
                </label>


                {showResults && (
                    <div
                        className="search-results position-absolute w-100 bg-dark pt-3"
                        style={{
                            top: "100%",
                            left: "0",
                            zIndex: 1,
                            overflowY: "scroll",
                            maxHeight: "500px",
                        }}
                    >
                        {games.length > 0 ? (
                            games.map((game) => (
                                <div key={game.id}>
                                    <Link to={`/detail/${game.id}`} className="text-decoration-none text-white d-flex align-items-center">
                                        <img
                                            src={game.background_image || "fallback-image.jpg"}
                                            alt={game.name || "Immagine del gioco"}
                                            style={{ width: "100px", height: "70px" }}
                                            className="my-2 mx-3 img-fluid"
                                        />
                                        <p className="text-white m-0">{game.name}</p>
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <p className="text-white text-center">
                                Inizia a cercare
                            </p>
                        )}

                    </div>
                )}
            </div>
        </>
    );
}
