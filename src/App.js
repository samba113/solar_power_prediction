// App.js
import React, { useState } from "react";
import "./App.css";

function App() {
  const [msg, setMsg] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!msg.trim()) return;
    setLoading(true);
    setReply("");

    try {
      const res = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: msg }),
      });

      const data = await res.json();

      if (res.ok && data.prediction !== undefined) {
        setReply(`🔋 Predicted Solar Power Output: ${data.prediction} kW`);
      } else {
        setReply(data.error || "⚠️ Invalid input. Please follow format below.");
      }
    } catch (error) {
      setReply("❌ Server error. Please start the backend.");
    }

    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="app">
      <h1>🌞 Solar Power AI Chatbot</h1>

      <textarea
        placeholder="Predict power for 30°C, 60% humidity, 1010 hPa, 15 km/h speed"
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <button onClick={sendMessage} disabled={loading}>
        {loading ? "Predicting..." : "Send"}
      </button>

      <p className="reply">{reply}</p>

      <div className="hint">
        💡 <strong>Format Example:</strong><br />
        Temperature: 10–50 °C<br />
        Humidity: 10–100 %<br />
        Pressure: 900–1100 hPa<br />
        Speed: 0–50 km/h
      </div>
    </div>
  );
}

export default App;
