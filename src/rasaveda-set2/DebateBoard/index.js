import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export default function DebateBoard() {
  // Initial debates data
  const initialDebates = [
    {
      id: 1,
      dish: "Butter Chicken",
      claim: "Authentic butter chicken originated in Punjab, not Delhi",
      status: "open",
      createdBy: "Priya Sharma",
      createdDate: "2024-01-15",
      replies: [
        {
          id: 101,
          author: "Rajesh Kumar",
          argument: "The dish was actually created in Delhi in the 1950s by Kundan Lal Gujral",
          citation: "Indian Culinary Heritage - Vol 2",
          date: "2024-01-16",
        },
        {
          id: 102,
          author: "Priya Sharma",
          argument: "Historical records show similar preparations existed in Punjab for centuries",
          citation: "Ancient Punjabi Cooking Manuscripts",
          date: "2024-01-17",
        },
      ],
      resolution: null,
    },
    {
      id: 2,
      dish: "Sambar",
      claim: "Sambar spice blend varies significantly between Tamil Nadu regions",
      status: "open",
      createdBy: "Anita Rao",
      createdDate: "2024-01-18",
      replies: [
        {
          id: 201,
          author: "Kumar Iyer",
          argument: "Each district has its own unique sambar powder recipe",
          citation: "Tamil Cooking Traditions",
          date: "2024-01-19",
        },
      ],
      resolution: null,
    },
    {
      id: 3,
      dish: "Biryani",
      claim: "Biryani cooking method: layer cooking vs rice cooking",
      status: "closed",
      createdBy: "Aisha Khan",
      createdDate: "2024-01-10",
      replies: [
        {
          id: 301,
          author: "Farah Hassan",
          argument: "Dum pukht (sealed pot) method is traditional",
          citation: "Mughal Era Cooking Records",
          date: "2024-01-11",
        },
      ],
      resolution: "Both methods are valid regional variations. Dum pukht is more traditional but other methods are also used.",
    },
  ];

  const [debates, setDebates] = useState(initialDebates);
  const [selectedDebate, setSelectedDebate] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [replyAuthor, setReplyAuthor] = useState("");
  const [replyCitation, setReplyCitation] = useState("");
  const [resolutionNote, setResolutionNote] = useState("");
  const [showResolutionInput, setShowResolutionInput] = useState(false);

  // Handle adding a reply
  const handleAddReply = (debateId) => {
    if (!replyText.trim() || !replyAuthor.trim()) {
      alert("Please fill in all fields");
      return;
    }

    const updatedDebates = debates.map((debate) => {
      if (debate.id === debateId) {
        return {
          ...debate,
          replies: [
            ...debate.replies,
            {
              id: Math.max(...debate.replies.map((r) => r.id), 0) + 1,
              author: replyAuthor,
              argument: replyText,
              citation: replyCitation,
              date: new Date().toISOString().split("T")[0],
            },
          ],
        };
      }
      return debate;
    });

    setDebates(updatedDebates);
    setReplyText("");
    setReplyAuthor("");
    setReplyCitation("");
    
    // Update selected debate
    const updated = updatedDebates.find((d) => d.id === debateId);
    setSelectedDebate(updated);
  };

  // Handle closing a debate
  const handleCloseDebate = (debateId) => {
    if (!resolutionNote.trim()) {
      alert("Please enter a resolution note");
      return;
    }

    const updatedDebates = debates.map((debate) => {
      if (debate.id === debateId) {
        return {
          ...debate,
          status: "closed",
          resolution: resolutionNote,
        };
      }
      return debate;
    });

    setDebates(updatedDebates);
    setSelectedDebate(updatedDebates.find((d) => d.id === debateId));
    setResolutionNote("");
    setShowResolutionInput(false);
  };

  const openDebates = debates.filter((d) => d.status === "open");
  const closedDebates = debates.filter((d) => d.status === "closed");

  return (
    <div className="feature-page">
      <Link to="/" className="page-back">← Back</Link>
      <h1>🎭 Debate & Dispute Board</h1>
      <p className="subtitle">Community-driven discussions on Indian culinary traditions and regional variations</p>

      {!selectedDebate ? (
        <div className="debates-container">
          {/* Open Debates Section */}
          <section className="debates-section">
            <div className="section-header">
              <h2>💬 Open Debates</h2>
              <span className="badge-count">{openDebates.length}</span>
            </div>
            {openDebates.length === 0 ? (
              <p className="no-debates">No open debates. Be the first to start a discussion!</p>
            ) : (
              <div className="debates-list">
                {openDebates.map((debate) => (
                  <div
                    key={debate.id}
                    className="debate-card debate-open"
                    onClick={() => setSelectedDebate(debate)}
                  >
                    <div className="debate-header">
                      <h3 className="debate-dish">{debate.dish}</h3>
                      <span className="status-badge open">Open</span>
                    </div>
                    <p className="debate-claim">{debate.claim}</p>
                    <div className="debate-meta">
                      <span className="meta-item">👤 {debate.createdBy}</span>
                      <span className="meta-item">📅 {debate.createdDate}</span>
                      <span className="meta-item">💬 {debate.replies.length} replies</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Closed Debates Section */}
          <section className="debates-section">
            <div className="section-header">
              <h2>✅ Resolved Debates</h2>
              <span className="badge-count">{closedDebates.length}</span>
            </div>
            {closedDebates.length === 0 ? (
              <p className="no-debates">No resolved debates yet.</p>
            ) : (
              <div className="debates-list">
                {closedDebates.map((debate) => (
                  <div
                    key={debate.id}
                    className="debate-card debate-closed"
                    onClick={() => setSelectedDebate(debate)}
                  >
                    <div className="debate-header">
                      <h3 className="debate-dish">{debate.dish}</h3>
                      <span className="status-badge closed">Resolved</span>
                    </div>
                    <p className="debate-claim">{debate.claim}</p>
                    <div className="debate-meta">
                      <span className="meta-item">👤 {debate.createdBy}</span>
                      <span className="meta-item">📅 {debate.createdDate}</span>
                      <span className="meta-item">💬 {debate.replies.length} replies</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      ) : (
        <div className="thread-view">
          {/* Thread Header */}
          <button className="back-button" onClick={() => setSelectedDebate(null)}>
            ← Back to Debates
          </button>

          <div className="thread-header">
            <h2>{selectedDebate.dish}</h2>
            <span className={`status-badge ${selectedDebate.status}`}>
              {selectedDebate.status === "open" ? "Open" : "Resolved"}
            </span>
          </div>

          <div className="original-claim">
            <p className="claim-label">Original Claim:</p>
            <p className="claim-text">{selectedDebate.claim}</p>
            <div className="claim-meta">
              <span>Started by {selectedDebate.createdBy} on {selectedDebate.createdDate}</span>
            </div>
          </div>

          {/* Resolution Note if Closed */}
          {selectedDebate.status === "closed" && selectedDebate.resolution && (
            <div className="resolution-box">
              <h4>📌 Resolution</h4>
              <p>{selectedDebate.resolution}</p>
            </div>
          )}

          {/* Replies Section */}
          <div className="replies-section">
            <h3>💭 Discussion ({selectedDebate.replies.length})</h3>
            {selectedDebate.replies.length === 0 ? (
              <p className="no-replies">No replies yet. Be the first to share your perspective!</p>
            ) : (
              <div className="replies-list">
                {selectedDebate.replies.map((reply) => (
                  <div key={reply.id} className="reply-card">
                    <div className="reply-header">
                      <span className="reply-author">{reply.author}</span>
                      <span className="reply-date">{reply.date}</span>
                    </div>
                    <p className="reply-argument">{reply.argument}</p>
                    {reply.citation && (
                      <div className="reply-citation">
                        <span className="citation-icon">📚</span>
                        <span className="citation-text">{reply.citation}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Reply Form - Only show if debate is open */}
          {selectedDebate.status === "open" && (
            <div className="reply-form-section">
              <h3>Add Your Perspective</h3>
              <div className="form-group">
                <label>Your Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={replyAuthor}
                  onChange={(e) => setReplyAuthor(e.target.value)}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Your Argument</label>
                <textarea
                  placeholder="Share your perspective or evidence..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="form-textarea"
                  rows="4"
                />
              </div>
              <div className="form-group">
                <label>Citation/Source (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g., Book, Article, Historical Record"
                  value={replyCitation}
                  onChange={(e) => setReplyCitation(e.target.value)}
                  className="form-input"
                />
              </div>
              <button
                onClick={() => handleAddReply(selectedDebate.id)}
                className="submit-btn"
              >
                Post Reply
              </button>
            </div>
          )}

          {/* Close Debate Section - For Moderators */}
          {selectedDebate.status === "open" && (
            <div className="close-debate-section">
              <h3>🔒 Moderator Actions</h3>
              {!showResolutionInput ? (
                <button
                  onClick={() => setShowResolutionInput(true)}
                  className="close-debate-btn"
                >
                  Close Debate & Add Resolution
                </button>
              ) : (
                <div className="resolution-form">
                  <label>Resolution Note</label>
                  <textarea
                    placeholder="Enter the moderator's resolution for this debate..."
                    value={resolutionNote}
                    onChange={(e) => setResolutionNote(e.target.value)}
                    className="form-textarea"
                    rows="3"
                  />
                  <div className="button-group">
                    <button
                      onClick={() => handleCloseDebate(selectedDebate.id)}
                      className="confirm-btn"
                    >
                      Confirm & Close
                    </button>
                    <button
                      onClick={() => {
                        setShowResolutionInput(false);
                        setResolutionNote("");
                      }}
                      className="cancel-btn"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
