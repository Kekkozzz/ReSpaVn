import Nav from "../components/nav";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function Detail() {
    const { id } = useParams();
    console.log(id);
    
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
        <div className="container">
            <div className="row mt-5">
                <div className="col-3">

                    <h5>Nome gioco: {game.name}</h5>
                    
                </div>
            </div>
        </div>
        </>
  )
}