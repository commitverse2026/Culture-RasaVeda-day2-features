import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export default function DebateBoard() {
  const [selected, setSelected] = useState(null);

  const [debates, setDebates] = useState([
    {
      id: 1,
      dish: "Biryani",
      claim: "Hyderabadi Biryani is the best",
      status: "open",
      replies: [
        {
          author: "User1",
          text: "Lucknowi biryani is more refined",
          citation: "Food blog",
        },
      ],
      resolution: "",
    },
    {
      id: 2,
      dish: "Chai",
      claim: "Milk chai is superior to black tea",
      status: "closed",
      replies: [],
      resolution: "Milk chai is more popular in India",
    },
  ]);

  const [reply, setReply] = useState("");
  const [citation, setCitation] = useState("");

  // ➕ Add reply
  const addReply = () => {
    if (!reply) return;

    const updated = debates.map((d) => {
      if (d.id === selected.id) {
        return {
          ...d,
          replies: [
            ...d.replies,
            { author: "You", text: reply, citation },
          ],
        };
      }
      return d;
    });

    setDebates(updated);
    setReply("");
    setCitation("");
  };

  // 🔒 Close debate
  const closeDebate = () => {
    const note = prompt("Enter resolution note:");
    if (!note) return;

    const updated = debates.map((d) => {
      if (d.id === selected.id) {
        return { ...d, status: "closed", resolution: note };
      }
      return d;
    });

    setDebates(updated);
    setSelected({ ...selected, status: "closed", resolution: note });
  };

  // 🔙 LIST VIEW
  if (!selected) {
    return (
      <div className="feature-page">
        <button className="page-back-btn" onClick={() => setSelected(null)}>
          ← Back
        </button>
        <h1>Debate & Dispute Board</h1>

        <div className="todo-box">
          Debate list + thread view + reply form + close debate
        </div>

        {debates.map((d) => (
          <div
            key={d.id}
            className={`card ${d.status === "closed" ? "closed" : ""}`}
            onClick={() => d.status === "open" && setSelected(d)}
          >
            <h3>{d.dish}</h3>
            <p>{d.claim}</p>

            <span className={`badge ${d.status}`}>
              {d.status}
            </span>
          </div>
        ))}
      </div>
    );
  }

  // 💬 THREAD VIEW
  return (
    <div className="feature-page">
      <button className="page-back-btn" onClick={() => setSelected(null)}>
        ← Back
      </button>

      <h1>{selected.dish}</h1>
      <p>{selected.claim}</p>

      {/* 🗨 REPLIES */}
      <div className="card">
        <h3>Replies</h3>

        {selected.replies.map((r, i) => (
          <div key={i} className="reply">
            <strong>{r.author}</strong>
            <p>{r.text}</p>
            <small>{r.citation}</small>
          </div>
        ))}
      </div>

      {/* 📝 FORM */}
      {selected.status === "open" && (
        <div className="card">
          <h3>Add Reply</h3>

          <input
            placeholder="Your argument"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
          />

          <input
            placeholder="Citation (optional)"
            value={citation}
            onChange={(e) => setCitation(e.target.value)}
          />

          <button onClick={addReply}>Submit</button>
        </div>
      )}

      {/* 🔒 CLOSE */}
      {selected.status === "open" && (
        <button onClick={closeDebate}>Close Debate</button>
      )}

      {/* 📌 RESOLUTION */}
      {selected.status === "closed" && (
        <div className="card">
          <h3>Resolution</h3>
          <p>{selected.resolution}</p>
        </div>
      )}
    </div>
  );
}