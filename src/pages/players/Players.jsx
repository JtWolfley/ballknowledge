
import "./Players.css";
import { useState, useEffect } from "react";
import Player from "../../components/player/Player";
import Slideshow from "../../components/slideshow/Slideshow";
import FanHooper from "../../components/fanhooper/FanHooper";
import AddHooper from "../../components/addhooper/AddHooper";

const API_URL = "https://beyondthearcserver.onrender.com";

const Players = () => {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [fanHoopers, setFanHoopers] = useState([]);
    const [fanLoading, setFanLoading] = useState(true);
    const [fanError, setFanError] = useState("");

    // Fetch NBA players from Render
    useEffect(() => {
        const getPlayers = async () => {
            try {
                const response = await fetch(`${API_URL}/api/players`);

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

    // Fetch fan-created hoopers from Render
    useEffect(() => {
        const getFanHoopers = async () => {
            try {
                const response = await fetch(`${API_URL}/api/fanhoopers`);

                if (!response.ok) {
                    throw new Error("Failed to load fan hoopers");
                }

                const data = await response.json();
                setFanHoopers(data);
            } catch (error) {
                console.error("Error fetching fan hoopers:", error);
                setFanError("Unable to load fan hoopers. Please try again later.");
            } finally {
                setFanLoading(false);
            }
        };

        getFanHoopers();
    }, []);

    // Automatically update the fan hooper list after a successful POST
    const handleHooperAdded = (newHooper) => {
        setFanHoopers((previous) => [...previous, newHooper]);
    };

    // Match NBA player names to existing preview routes
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

            {loading && (
                <p className="players-status">Loading players...</p>
            )}

            {error && (
                <p className="players-status">{error}</p>
            )}

            <div id="players-grid">
                {players.map((player) => (
                    <Player
                        key={player._id}
                        name={player.name}
                        team={`${player.position} - ${player.team}`}
                        image={`${API_URL}/${player.image}`}
                        link={`/players/${playerLinks[player.name]}`}
                        buttonText="VIEW STATS"
                    />
                ))}
            </div>

            {/* Fan Hooper Showcase */}
            <section id="fan-showcase">
                <div id="fan-showcase-title">
                    <p>YOUR GAME. YOUR STYLE.</p>
                    <h2>FAN HOOPER SHOWCASE</h2>
                    <p>
                        Check out fan-created basketball profiles
                        and create your own!
                    </p>
                </div>

                {fanLoading && (
                    <p className="players-status">
                        Loading fan hoopers...
                    </p>
                )}

                {fanError && (
                    <p className="players-status">{fanError}</p>
                )}

                <div id="fan-hooper-list">
                    {fanHoopers.map((hooper) => (
                        <FanHooper
                            key={hooper._id}
                            hooper={hooper}
                        />
                    ))}
                </div>

                <AddHooper onHooperAdded={handleHooperAdded} />
            </section>

        </main>
    );
};

export default Players;
