
import { useState } from "react";
import "./FanHooper.css";

const FanHooper = ({ hooper }) => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <article className="fan-hooper">
            <div className="fan-hooper-icon" aria-hidden="true">
                🏀
            </div>

            <h3>{hooper.name}</h3>
            <p>{hooper.position} - {hooper.playstyle}</p>

            <button
                type="button"
                className="fan-hooper-button"
                onClick={() => setShowDetails(!showDetails)}
                aria-expanded={showDetails}
            >
                {showDetails ? "HIDE DETAILS" : "VIEW PROFILE"}
            </button>

            {showDetails && (
                <div className="fan-hooper-details">
                    <p><strong>POSITION:</strong> {hooper.position}</p>
                    <p><strong>PLAYSTYLE:</strong> {hooper.playstyle}</p>
                    <p><strong>FAVORITE TEAM:</strong> {hooper.team}</p>
                </div>
            )}
        </article>
    );
};

export default FanHooper;
