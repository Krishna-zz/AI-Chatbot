import { useState } from "react";
import { motion } from "framer-motion";
import { Send, PlusCircle  } from "lucide-react";

function Chatbox(){

   const [conversations, setConversations] = useState([
    { id: 1, title: "Welcome", messages: [] },
  ]);
  const [currentId, setCurrentId] = useState(1);
  const [input, setInput] = useState("");

  const currentConv = conversations.find((c) => c.id === currentId);

  const handleNewChat = () => {
    const newId = Date.now();
    setConversations([...conversations, { id: newId, title: "New Chat", messages: [] }]);
    setCurrentId(newId);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    // only updates frontend for now; backend call would go here
    const updated = conversations.map((c) =>
      c.id === currentId
        ? {
            ...c,
            messages: [...c.messages, { sender: "user", text: input }],
          }
        : c
    );
    setConversations(updated);
    setInput("");
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 flex flex-col p-4">
        <button
          onClick={handleNewChat}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-xl mb-4"
        >
          <PlusCircle size={18} /> New Chat
        </button>
        <div className="space-y-2 overflow-y-auto flex-1">
          {conversations.map((c) => (
            <div
              key={c.id}
              onClick={() => setCurrentId(c.id)}
              className={`p-2 rounded-xl cursor-pointer truncate ${
                c.id === currentId ? "bg-gray-700" : "hover:bg-gray-700"
              }`}
            >
              {c.title}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Panel */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-700 text-xl font-semibold">
          {currentConv?.title}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
          {currentConv?.messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`max-w-[70%] p-3 rounded-2xl ${
                msg.sender === "user" ? "bg-blue-600 ml-auto" : "bg-gray-700"
              }`}
            >
              {msg.text}
            </motion.div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-700 flex gap-2 bg-gray-800">
          <input
            type="text"
            className="flex-1 px-4 py-2 rounded-xl bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your message…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl flex items-center justify-center"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}


export default Chatbox