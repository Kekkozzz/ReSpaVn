// src/pages/Favorites.js
import { useState, useEffect, useContext } from "react";
import supabase from "../supabase/client";
import SessionContext from "../context/SessionContext";
import { Link } from "react-router-dom";

export default function Favorites() {
  const session = useContext(SessionContext);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (session) {
      async function fetchFavorites() {
        const { data, error } = await supabase
          .from("favorites")
          .select("*")
          .eq("user_id", session.user.id);
        if (error) {
          console.error(error);
        } else {
          setFavorites(data);
        }
      }
      fetchFavorites();
    }
  }, [session]);

  if (!session)
    return <p className="text-center mt-5">Devi effettuare il login per vedere i tuoi preferiti.</p>;

  return (
    <div className="container mt-4">
      <h2>I tuoi giochi preferiti</h2>
      {favorites.length === 0 ? (
        <p>Nessun gioco aggiunto ai preferiti.</p>
      ) : (
        <div className="row">
          {favorites.map((fav) => (
            <div className="col-md-4 mb-3" key={fav.id}>
              <div className="card">
                <img
                  src={fav.background_image}
                  className="card-img-top"
                  alt={fav.game_name}
                />
                <div className="card-body">
                  <h5 className="card-title">{fav.game_name}</h5>
                  {/* Se hai salvato il genere, puoi costruire il link ai dettagli */}
                  <Link to={`/${fav.genre_slug || "genere"}/${fav.game_id}`} className="btn btn-primary">
                    Dettagli
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
