import { useState } from "react";
import { Page } from "../App";

interface MessagesProps {
  navigate: (p: Page) => void;
}

const CONVOS = [
  { id: 1, name: "Sarah @ Atlassian", role: "Talent Partner", avatar: "SA", preview: "Hi! We'd love to connect.", time: "10:02 AM", unread: 2 },
  { id: 2, name: "James @ Canva", role: "Engineering Manager", avatar: "JA", preview: "Can you do a call Thursday?", time: "9:00 AM", unread: 0 },
  { id: 3, name: "Priya @ Afterpay", role: "Recruiter", avatar: "PR", preview: "Thanks for applying!", time: "Yesterday", unread: 1 },
  { id: 4, name: "PROSAMA Team", role: "Platform", avatar: "PS", preview: "Welcome to PROSAMA!", time: "2d ago", unread: 0 },
];

const MESSAGES: Record<number, { from: "me" | "them"; text: string; time: string }[]> = {
  1: [
    { from: "them", text: "Hi there! I'm Sarah from Atlassian's talent team.", time: "10:02 AM" },
    { from: "them", text: "I came across your profile and think you'd be a great fit for our role.", time: "10:03 AM" },
    { from: "me", text: "Hi Sarah! Thanks for reaching out — definitely interested. What does the role involve?", time: "10:05 AM" },
    { from: "them", text: "It's a full-stack focused role, mostly React/TS on the frontend with Node on backend.", time: "10:07 AM" },
  ],
  2: [
    { from: "them", text: "Hey! I'm James, engineering manager at Canva.", time: "9:00 AM" },
    { from: "them", text: "Can you do a call Thursday at 2pm? We'd love to learn more about your background.", time: "9:01 AM" },
  ],
  3: [
    { from: "them", text: "Thanks for applying to Afterpay — we're moving you to the next round!", time: "Yesterday" },
  ],
  4: [
    { from: "them", text: "Welcome to PROSAMA! Complete your profile to get noticed by top employers.", time: "2d ago" },
  ],
};

export default function Messages({ navigate }: MessagesProps) {
  const [active, setActive] = useState(1);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState(MESSAGES);

  const send = () => {
    if (!input.trim()) return;
    setMsgs((m) => ({
      ...m,
      [active]: [...(m[active] || []), { from: "me", text: input.trim(), time: "Now" }],
    }));
    setInput("");
  };

  const activeConvo = CONVOS.find((c) => c.id === active)!;

  return (
    <div className="messages-page">
      <div className="messages-header">
        <h1>Messages</h1>
      </div>
      <div className="messages-layout">
        <aside className="convos-list">
          {CONVOS.map((c) => (
            <button
              key={c.id}
              className={`convo-item ${active === c.id ? "active" : ""}`}
              onClick={() => setActive(c.id)}
            >
              <div className="convo-avatar">{c.avatar}</div>
              <div className="convo-info">
                <div className="convo-top">
                  <span className="convo-name">{c.name}</span>
                  <span className="convo-time">{c.time}</span>
                </div>
                <span className="convo-role">{c.role}</span>
                <p className="convo-preview">{c.preview}</p>
              </div>
              {c.unread > 0 && <span className="unread-badge">{c.unread}</span>}
            </button>
          ))}
        </aside>

        <div className="chat-area">
          <div className="chat-header">
            <div className="chat-avatar">{activeConvo.avatar}</div>
            <div>
              <p className="chat-name">{activeConvo.name}</p>
              <p className="chat-role">{activeConvo.role}</p>
            </div>
          </div>
          <div className="chat-messages">
            {(msgs[active] || []).map((m, i) => (
              <div key={i} className={`msg-bubble-wrap ${m.from === "me" ? "me" : "them"}`}>
                <div className="msg-bubble">
                  <p>{m.text}</p>
                  <span className="msg-time">{m.time}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              placeholder="Type a message…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
            />
            <button onClick={send} disabled={!input.trim()}>Send</button>
          </div>
        </div>
      </div>

      <style>{`
        .messages-page { padding: 36px 0 0; height: calc(100vh - 68px); display: flex; flex-direction: column; }
        .messages-header { margin-bottom: 20px; }
        .messages-header h1 { font-family: var(--font-head); font-size: 28px; font-weight: 800; }
        .messages-layout {
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: 0;
          flex: 1;
          border: 1px solid var(--border);
          border-radius: var(--radius);
          overflow: hidden;
          background: var(--surface);
          min-height: 0;
        }
        .convos-list {
          border-right: 1px solid var(--border);
          overflow-y: auto;
          display: flex;
          flex-direction: column;
        }
        .convo-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 16px;
          border: none;
          background: none;
          text-align: left;
          border-bottom: 1px solid var(--border);
          transition: background var(--transition);
          position: relative;
          color: var(--text);
        }
        .convo-item:hover { background: var(--surface2); }
        .convo-item.active { background: var(--surface2); border-right: 2px solid var(--accent); }
        .convo-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: var(--accent);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-head);
          font-weight: 700;
          font-size: 13px;
          flex-shrink: 0;
        }
        .convo-info { flex: 1; min-width: 0; }
        .convo-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2px;
        }
        .convo-name { font-weight: 600; font-size: 14px; }
        .convo-time { font-size: 11px; color: var(--muted); }
        .convo-role { font-size: 11px; color: var(--accent); margin-bottom: 4px; display: block; }
        .convo-preview { font-size: 12px; color: var(--muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .unread-badge {
          position: absolute;
          top: 16px;
          right: 16px;
          background: var(--accent);
          color: white;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          font-size: 11px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .chat-area {
          display: flex;
          flex-direction: column;
          min-height: 0;
        }
        .chat-header {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px 20px;
          border-bottom: 1px solid var(--border);
          flex-shrink: 0;
        }
        .chat-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--accent2);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-head);
          font-weight: 700;
          font-size: 13px;
        }
        .chat-name { font-weight: 600; font-size: 14px; }
        .chat-role { font-size: 12px; color: var(--muted); }
        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .msg-bubble-wrap { display: flex; }
        .msg-bubble-wrap.me { justify-content: flex-end; }
        .msg-bubble-wrap.them { justify-content: flex-start; }
        .msg-bubble {
          max-width: 65%;
          padding: 12px 16px;
          border-radius: 16px;
        }
        .msg-bubble-wrap.me .msg-bubble {
          background: var(--accent);
          color: white;
          border-bottom-right-radius: 4px;
        }
        .msg-bubble-wrap.them .msg-bubble {
          background: var(--surface2);
          border: 1px solid var(--border);
          border-bottom-left-radius: 4px;
        }
        .msg-bubble p { font-size: 14px; line-height: 1.5; margin-bottom: 4px; }
        .msg-time { font-size: 11px; opacity: 0.7; }
        .chat-input {
          display: flex;
          gap: 10px;
          padding: 16px 20px;
          border-top: 1px solid var(--border);
          flex-shrink: 0;
        }
        .chat-input input {
          flex: 1;
          background: var(--surface2);
          border: 1px solid var(--border);
          border-radius: 24px;
          padding: 11px 18px;
          color: var(--text);
          font-size: 14px;
          outline: none;
          transition: border-color var(--transition);
        }
        .chat-input input:focus { border-color: var(--accent); }
        .chat-input input::placeholder { color: var(--muted); }
        .chat-input button {
          padding: 11px 22px;
          background: var(--accent);
          color: white;
          border: none;
          border-radius: 24px;
          font-weight: 600;
          font-size: 14px;
          transition: background var(--transition);
        }
        .chat-input button:hover:not(:disabled) { background: #e55a28; }
        .chat-input button:disabled { opacity: 0.4; cursor: not-allowed; }
        @media (max-width: 700px) {
          .messages-layout { grid-template-columns: 1fr; }
          .convos-list { display: none; }
        }
      `}</style>
    </div>
  );
}