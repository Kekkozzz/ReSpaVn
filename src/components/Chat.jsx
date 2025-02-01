import React, { useState, useEffect, useContext } from "react";
import supabase from "../supabase/client";
import SessionContext from "../context/SessionContext";

export default function Chat({ gameId }) {
  const session = useContext(SessionContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (!gameId) return;
    // Carica i messaggi esistenti per questo gioco
    async function fetchMessages() {
      const { data, error } = await supabase
        .from("game_chats")
        .select("*")
        .eq("game_id", gameId)
        .order("created_at", { ascending: true });
      if (error) console.error(error);
      else setMessages(data);
    }
    fetchMessages();

    // Sottoscrizione agli INSERT in tempo reale
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
        }
      )
      .subscribe();

    // Pulizia della subscription quando il componente si smonta
    return () => {
      supabase.removeChannel(channel);
    };
  }, [gameId]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;
    const { error } = await supabase.from("game_chats").insert([
      {
        game_id: gameId,
        user_id: session?.user?.id,
        message: newMessage,
      },
    ]);
    if (error) console.error(error);
    else setNewMessage("");
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
          <div key={msg.id} className="message mb-2 bg-black">
            <strong>{msg.user_id === session?.user?.id ? "Tu" : msg.user_id}</strong>:{" "}
            {msg.message}
          </div>
        ))}
      </div>
      {session ? (
        <form onSubmit={handleSendMessage} className="mt-2">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Scrivi un messaggio..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button className="btn btn-primary" type="submit">
              Invia
            </button>
          </div>
        </form>
      ) : (
        <p>Effettua il login per partecipare alla chat.</p>
      )}
    </div>
  );
}