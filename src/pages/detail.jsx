import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import supabase from "../supabase/client";
import SessionContext from "../context/SessionContext";
import Nav from "../components/nav";
import Chat from "../components/Chat"; // Lo creeremo più avanti

export default function Detail() {
  const { genre_slug, id } = useParams();
  const [game, setGame] = useState({});
  const [isFavorite, setIsFavorite] = useState(false);
  const session = useContext(SessionContext);

  useEffect(() => {
    async function getGame() {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}games/${id}?key=${import.meta.env.VITE_API_KEY}`
      );
      const json = await response.json();
      setGame(json);
    }
    getGame();
  }, [id]);

  // Verifica se il gioco è già tra i preferiti
  useEffect(() => {
    async function checkFavorite() {
      if (session && game.id) {
        const { data, error } = await supabase
          .from("favorites")
          .select("*")
          .eq("user_id", session.user.id)
          .eq("game_id", game.id)
          .maybeSingle(); // Uso di .maybeSingle() evita l'errore se non c'è nessun record
        if (error) {
          console.error("Errore nel controllo dei preferiti:", error);
        } else if (data) {
          setIsFavorite(true);
        }
      }
    }
    checkFavorite();
  }, [game, session]);

  const toggleFavorite = async () => {
    if (!session)
      return alert("Devi effettuare il login per aggiungere ai preferiti.");
    if (!isFavorite) {
      // Inserimento nei preferiti
      const { error } = await supabase.from("favorites").insert({
        user_id: session.user.id,
        game_id: game.id,
        game_name: game.name,
        background_image: game.background_image,
        // Puoi salvare anche il genere (es: genre_slug) se ti serve per il link
      });
      if (error) {
        alert("Errore nell'aggiunta ai preferiti: " + error.message);
      } else {
        setIsFavorite(true);
      }
    } else {
      // Rimozione dai preferiti
      const { error } = await supabase
        .from("favorites")
        .delete()
        .eq("user_id", session.user.id)
        .eq("game_id", game.id);
      if (error) {
        alert("Errore nella rimozione dai preferiti: " + error.message);
      } else {
        setIsFavorite(false);
      }
    }
  };

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
        <div
          className="overlay position-absolute w-100 h-100"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
        ></div>
        <div className="container h-100 d-flex flex-column justify-content-center align-items-start text-start position-relative">
          <h1 className="fw-bold display-4">{game.name}</h1>
          <h5 className="mt-2">
            {game.released && new Date(game.released).toLocaleDateString("it-IT")}
          </h5>
          <div className="d-flex mt-3">
            <button
              className="btn btn-light me-3 rounded-pill"
              onClick={toggleFavorite}
            >
              {isFavorite ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
            </button>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-3">
            <div>
              {game.esrb_rating && game.esrb_rating.id === 3 && (
                <img
                  src="../../Teen.png"
                  style={{ width: "100px" }}
                  alt="Teen"
                />
              )}
              {game.esrb_rating && game.esrb_rating.id === 4 && (
                <img
                  src="../../Mature.png"
                  style={{ width: "100px" }}
                  alt="Mature"
                />
              )}
              {game.esrb_rating && game.esrb_rating.id === 5 && (
                <img
                  src="../../AdultsOnly.webp"
                  style={{ width: "100px" }}
                  alt="Adults Only"
                />
              )}
              {game.esrb_rating && game.esrb_rating.id === 6 && (
                <img
                  src="../../Pending.png"
                  style={{ width: "100px" }}
                  alt="Pending"
                />
              )}
              {game.esrb_rating == null && (
                <img
                  src="../../Everyone.png"
                  style={{ width: "100px" }}
                  alt="Everyone"
                />
              )}
            </div>
            <div className="my-4">
              <h5 className="fw-bold">Piattaforme</h5>
              <ul className="list-unstyled">
                {game.platforms?.map((platform) => (
                  <li
                    className="badge rounded-pill text-bg-secondary me-1 my-1"
                    key={platform.platform.id}
                  >
                    {platform.platform.name}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-4">
              <h5 className="fw-bold">Generi</h5>
              <ul className="list-unstyled">
                {game.genres?.map((genre) => (
                  <li className="badge rounded-pill text-bg-info me-1" key={genre.id}>
                    {genre.name}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-4">
              <h5 className="fw-bold">Metacritic</h5>
              <div
                className="rating-badge d-inline-block text-white px-3 py-1 rounded-pill"
                style={{
                  backgroundColor:
                    game.metacritic >= 75
                      ? "#28a745"
                      : game.metacritic >= 50
                      ? "#ffc107"
                      : "#dc3545",
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
                  backgroundColor:
                    game.rating >= 4 ? "#28a745" : game.rating >= 2 ? "#E2AB05" : "#dc3545",
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
              <Chat gameId={game.id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
