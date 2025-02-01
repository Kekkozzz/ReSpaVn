import { useState, useEffect, useContext } from "react";
import supabase from "../supabase/client";
import SessionContext from "../context/SessionContext";

export default function Profile() {
  const session = useContext(SessionContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Recupera o crea il profilo al caricamento
  useEffect(() => {
    if (!session) {
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      // Recupera il profilo dell'utente usando .maybeSingle()
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .maybeSingle();

      if (error) {
        console.error("Errore nel recupero del profilo:", error);
      } else if (!data) {
        console.log("Nessun profilo trovato per questo utente. Creazione del profilo di default.");
        // Se non esiste, crealo con valori di default
        const { data: newProfile, error: insertError } = await supabase
          .from("profiles")
          .insert({
            id: session.user.id,
            username: "NuovoUtente",
            avatar_url: "",
            bio: "",
          })
          // Usiamo .select() per ottenere il record inserito
          .select()
          .maybeSingle();

        if (insertError) {
          console.error("Errore durante la creazione del profilo:", insertError);
        } else {
          setProfile(newProfile);
        }
      } else {
        setProfile(data);
      }
      setLoading(false);
    };

    fetchProfile();
  }, [session]);

  // Gestione dei cambiamenti nel form
  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  // Aggiornamento del profilo
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("profiles")
      .update({
        username: profile.username,
        avatar_url: profile.avatar_url,
        bio: profile.bio,
      })
      .eq("id", session.user.id)
      // Usando .select() restituiremo l'array dei record aggiornati
      .select();

    if (error) {
      alert("Errore nell'aggiornamento del profilo: " + error.message);
    } else if (!data || data.length === 0) {
      // Se non sono state restituite righe, potrebbe significare che:
      // - I dati inviati sono identici a quelli già presenti, oppure
      // - Le policy RLS non consentono di leggere il record aggiornato.
      alert("Profilo aggiornato, ma nessun dato restituito (verifica se ci sono modifiche o le policy RLS).");
    } else {
      alert("Profilo aggiornato con successo!");
      // Aggiorna lo stato locale con il primo record dell'array restituito
      setProfile(data[0]);
    }
  };

  if (!session) {
    return <p>Devi effettuare il login per visualizzare il profilo.</p>;
  }

  if (loading || profile === null) {
    return <p>Caricamento...</p>;
  }

  return (
    <div className="container mt-4">
      <h2>Il tuo profilo</h2>
      <div className="profile-info mb-4">
        <p>
          <strong>Username:</strong> {profile.username}
        </p>
        <p>
          <strong>Bio:</strong> {profile.bio}
        </p>
        {profile.avatar_url && (
          <img
            src={profile.avatar_url}
            alt="Avatar"
            style={{ maxWidth: "200px" }}
          />
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="form-control"
            value={profile.username || ""}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="avatar_url" className="form-label">
            Avatar URL
          </label>
          <input
            type="text"
            id="avatar_url"
            name="avatar_url"
            className="form-control"
            value={profile.avatar_url || ""}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="bio" className="form-label">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            className="form-control"
            value={profile.bio || ""}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Aggiorna profilo
        </button>
      </form>
    </div>
  );
}
