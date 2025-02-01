// src/components/Chat.js
import React, { useState, useEffect, useContext } from "react";
import supabase from "../supabase/client";
import SessionContext from "../context/SessionContext";

export default function Chat({ gameId }) {
  const session = useContext(SessionContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [userProfile, setUserProfile] = useState(null);

  // Recupera il profilo dell'utente (per eventuale controllo sul nickname)
  useEffect(() => {
    async function fetchUserProfile() {
      if (session?.user?.id) {
        const { data, error } = await supabase
          .from("profiles")
          .select("username")
          .eq("id", session.user.id)
          .maybeSingle();
        if (error) console.error("Errore nel recupero del profilo:", error);
        else setUserProfile(data);
      }
    }
    fetchUserProfile();
  }, [session]);

  // Carica i messaggi esistenti per il gioco e imposta la sottoscrizione in realtime
  useEffect(() => {
    if (!gameId) return;
    async function fetchMessages() {
      const { data, error } = await supabase
        .from("game_chats")
        .select("*, profiles(username)")
        .eq("game_id", gameId)
        .order("created_at", { ascending: true });
      if (error) console.error("Errore nel recupero dei messaggi:", error);
      else setMessages(data);
    }    
    fetchMessages();

    const channel = supabase
  .channel(`game-chat-${gameId}`)
  .on(
    "postgres_changes",
    {
      event: "INSERT",
      schema: "public",
      table: "game_chats",
      filter: `game_id=eq.${gameId}`,
    },
    (payload) => {
      setMessages((prev) => [...prev, payload.new]);
      // Dopo aver ricevuto l'evento, ricarica i messaggi per avere anche il join
      fetchMessages();
    }
  )
  .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [gameId]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;
    // Verifica che l'utente abbia impostato un nickname (opzionale)
    if (!userProfile?.username || userProfile.username.trim() === "") {
      alert("Per partecipare alla chat, imposta un nickname nel tuo profilo.");
      return;
    }
    // Esegui l'inserimento e richiedi la rappresentazione del record inserito
    const { data, error } = await supabase
      .from("game_chats")
      .insert([
        {
          game_id: gameId,
          user_id: session?.user?.id,
          message: newMessage,
        },
      ])
      .select();
    if (error) {
      console.error("Errore durante l'invio del messaggio:", error);
    } else if (data && data.length > 0) {
      // Aggiorna lo stato locale con il nuovo messaggio
      setMessages((prev) => [...prev, data[0]]);
      setNewMessage("");
    }
  };

  return (
    <div className="chat-container mt-4">
      <h4>Chat</h4>
      <div
        className="chat-messages"
        style={{
          maxHeight: "300px",
          overflowY: "auto",
          background: "#f0f0f0",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        {messages.map((msg) => (
          <div key={msg.id} className="message mb-2 bg-black text-white p-1">
            <strong>
              {msg.user_id === session?.user?.id
                ? "Tu"
                : msg.profiles?.username || msg.user_id}
            </strong>
            : {msg.message}
          </div>
        ))}
      </div>
      {session ? (
        <>
          {(!userProfile || !userProfile.username || userProfile.username.trim() === "") && (
            <p style={{ color: "red" }}>
              Per partecipare alla chat, imposta un nickname nel tuo profilo.
            </p>
          )}
          <form onSubmit={handleSendMessage} className="mt-2">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Scrivi un messaggio..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                disabled={!userProfile || !userProfile.username || userProfile.username.trim() === ""}
              />
              <button
                className="btn btn-primary"
                type="submit"
                disabled={!userProfile || !userProfile.username || userProfile.username.trim() === ""}
              >
                Invia
              </button>
            </div>
          </form>
        </>
      ) : (
        <p>Effettua il login per partecipare alla chat.</p>
      )}
    </div>
  );
}
