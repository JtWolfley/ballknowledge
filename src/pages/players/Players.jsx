
import "./Players.css";
import { useState, useEffect } from "react";
import Player from "../../components/player/Player";
import Slideshow from "../../components/slideshow/Slideshow";

const Players = () => {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const getPlayers = async () => {
            try {
                const response = await fetch(
                    "https://beyondthearcserver.onrender.com/api/players"
                );

                if (!response.ok) {
                    throw new Error("Failed to load players");
                }

                const data = await response.json();
                setPlayers(data);
            } catch (error) {
                console.error("Error fetching players:", error);
                setError("Unable to load players. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        getPlayers();
    }, []);

    // Match API player names to existing preview routes
    const playerLinks = {
        "ANTHONY EDWARDS": "anthony",
        "VICTOR WEMBANYAMA": "victorw",
        "SHAI GILGEOUS-ALEXANDER": "sga",
        "NIKOLA JOKIC": "jokic",
        "LUKA DONCIC": "luka",
        "JALEN BRUNSON": "brunson",
        "GIANNIS ANTETOKOUNMPO": "giannis",
        "STEPHEN CURRY": "curry"
    };

    return (
        <main id="players-page" className="page">

            <div id="players-heading">
                <p>AROUND THE LEAGUE</p>
                <h1>NBA PLAYERS</h1>
                <p>
                    Explore the stars of the NBA and learn about their teams,
                    positions, accomplishments, and performance on the court.
                </p>
            </div>

            <Slideshow />

            <div id="player-search">
                <label htmlFor="player-search-input">
                    FIND A PLAYER
                </label>

                <div id="search-fields">
                    <input
                        id="player-search-input"
                        type="text"
                        placeholder="SEARCH PLAYERS..."
                    />

                    <select defaultValue="all">
                        <option value="all">ALL POSITIONS</option>
                        <option value="PG">POINT GUARD</option>
                        <option value="SG">SHOOTING GUARD</option>
                        <option value="SF">SMALL FORWARD</option>
                        <option value="PF">POWER FORWARD</option>
                        <option value="C">CENTER</option>
                    </select>
                </div>
            </div>

            {loading && <p className="players-status">Loading players...</p>}

            {error && <p className="players-status">{error}</p>}

            <div id="players-grid">
                {players.map((player) => (
                    <Player
                        key={player._id}
                        name={player.name}
                        team={`${player.position} - ${player.team}`}
                        image={`https://beyondthearcserver.onrender.com/${player.image}`}
                        link={`/players/${playerLinks[player.name]}`}
                        buttonText="VIEW STATS"
                    />
                ))}
            </div>

        </main>
    );
};

export default Players;