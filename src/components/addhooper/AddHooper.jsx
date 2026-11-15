
import { useState } from "react";
import "./AddHooper.css";

const API_URL = "https://beyondthearcserver.onrender.com";

const initialForm = {
    name: "",
    position: "",
    playstyle: "",
    team: ""
};

const AddHooper = ({ onHooperAdded }) => {
    const [form, setForm] = useState(initialForm);
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((previous) => ({
            ...previous,
            [name]: value
        }));

        setMessage("");
    };

    const validateForm = () => {
        const name = form.name.trim();
        const team = form.team.trim();

        if (name.length < 2 || name.length > 30) {
            return "Player name must be 2 to 30 characters.";
        }

        if (!["PG", "SG", "SF", "PF", "C"].includes(form.position)) {
            return "Please select a valid position.";
        }

        if (![
            "Playmaker",
            "Sharpshooter",
            "Slasher",
            "Defender",
            "All-Around"
        ].includes(form.playstyle)) {
            return "Please select a valid playstyle.";
        }

        if (team.length < 2 || team.length > 50) {
            return "Team name must be 2 to 50 characters.";
        }

        return "";
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const validationError = validateForm();

        if (validationError) {
            setSuccess(false);
            setMessage(validationError);
            return;
        }

        setSubmitting(true);
        setMessage("");

        try {
            const response = await fetch(`${API_URL}/api/fanhoopers`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: form.name.trim(),
                    position: form.position,
                    playstyle: form.playstyle,
                    team: form.team.trim()
                })
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(
                    result.errors?.join(" ") ||
                    result.message ||
                    "Unable to add player."
                );
            }

            onHooperAdded(result.hooper);

            setForm(initialForm);
            setSuccess(true);
            setMessage("Fan hooper added successfully!");
        } catch (error) {
            setSuccess(false);
            setMessage(error.message || "Unable to add player.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section id="add-hooper">
            <p className="add-hooper-label">YOUR GAME. YOUR STYLE.</p>
            <h2>CREATE YOUR HOOPER</h2>

            <form id="add-hooper-form" onSubmit={handleSubmit}>
                <label htmlFor="hooper-name">PLAYER NAME</label>
                <input
                    id="hooper-name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your basketball nickname"
                    minLength={2}
                    maxLength={30}
                    required
                />

                <label htmlFor="hooper-position">POSITION</label>
                <select
                    id="hooper-position"
                    name="position"
                    value={form.position}
                    onChange={handleChange}
                    required
                >
                    <option value="">SELECT POSITION</option>
                    <option value="PG">POINT GUARD</option>
                    <option value="SG">SHOOTING GUARD</option>
                    <option value="SF">SMALL FORWARD</option>
                    <option value="PF">POWER FORWARD</option>
                    <option value="C">CENTER</option>
                </select>

                <label htmlFor="hooper-playstyle">PLAYSTYLE</label>
                <select
                    id="hooper-playstyle"
                    name="playstyle"
                    value={form.playstyle}
                    onChange={handleChange}
                    required
                >
                    <option value="">SELECT PLAYSTYLE</option>
                    <option value="Playmaker">PLAYMAKER</option>
                    <option value="Sharpshooter">SHARPSHOOTER</option>
                    <option value="Slasher">SLASHER</option>
                    <option value="Defender">DEFENDER</option>
                    <option value="All-Around">ALL-AROUND</option>
                </select>

                <label htmlFor="hooper-team">FAVORITE NBA TEAM</label>
                <input
                    id="hooper-team"
                    name="team"
                    type="text"
                    value={form.team}
                    onChange={handleChange}
                    placeholder="Your favorite NBA team"
                    minLength={2}
                    maxLength={50}
                    required
                />

                <button type="submit" disabled={submitting}>
                    {submitting ? "ADDING..." : "ADD HOOPER"}
                </button>

                {message && (
                    <p
                        className={`hooper-feedback ${
                            success ? "success" : "error"
                        }`}
                        role="status"
                        aria-live="polite"
                    >
                        {message}
                    </p>
                )}
            </form>
        </section>
    );
};

export default AddHooper;
