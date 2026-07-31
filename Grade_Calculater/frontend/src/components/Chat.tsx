import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';

interface ChatMessage {
  user: string;
  text: string;
  timestamp: string;
}

export const Chat = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [ws, setWs] = useState<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Connect to the actual websocket server
    const socket = new WebSocket('ws://localhost:8000/api/ws/chat');
    socket.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      setMessages(prev => [...prev, msg]);
    };
    setWs(socket);
    
    // Cleanup on unmount
    return () => socket.close();
  }, []);

  useEffect(() => {
    setMessages([
      { user: 'System', text: 'Welcome to Campus Connect Live Chat!', timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }
    ]);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    
    const msg = {
      user: user?.name || 'Anonymous',
      text: input,
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };

    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(msg));
    } else {
      // Fallback if websocket fails or isn't connected
      setMessages(prev => [...prev, msg]);
      setTimeout(() => {
        setMessages(prev => [...prev, {
          user: 'System',
          text: 'Error: WebSocket disconnected. Cannot send message to server.',
          timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
        }]);
      }, 500);
    }
    
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto mb-4 pr-3 custom-scrollbar flex flex-col gap-4">
        {messages.length === 0 && (
          <div className="flex-1 flex items-center justify-center text-slate-500">
            Connecting to chat...
          </div>
        )}
        {messages.map((msg, idx) => {
          if (msg.user === 'System') {
            return (
              <div key={idx} className="flex justify-center w-full my-2 animate-in fade-in zoom-in duration-300">
                <div className="bg-slate-800/60 border border-slate-700/50 px-4 py-1.5 rounded-full text-xs font-medium text-slate-400 flex items-center gap-2 shadow-sm">
                  <svg className="w-3.5 h-3.5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {msg.text}
                </div>
              </div>
            );
          }

          const isMe = msg.user === user?.name;

          return (
            <div 
              key={idx} 
              className={`flex flex-col max-w-[85%] animate-in slide-in-from-bottom-2 duration-300 ${isMe ? 'self-end items-end' : 'self-start items-start'}`}
            >
              {!isMe && <span className="text-xs font-medium text-slate-400 mb-1 ml-2">{msg.user}</span>}
              <div className={`px-4 py-2.5 rounded-2xl shadow-sm ${
                isMe 
                  ? 'bg-gradient-to-br from-indigo-500 to-violet-600 text-white rounded-br-sm' 
                  : 'bg-slate-800 border border-white/5 text-slate-200 rounded-bl-sm'
              }`}>
                <p className="text-sm leading-relaxed">{msg.text}</p>
              </div>
              <span className={`text-[10px] font-medium text-slate-500 mt-1 ${isMe ? 'mr-1' : 'ml-1'}`}>{msg.timestamp}</span>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex gap-3 items-end pt-2 border-t border-white/5">
        <div className="flex-1 bg-slate-900/50 border border-white/10 focus-within:border-violet-500/50 focus-within:ring-1 focus-within:ring-violet-500/30 rounded-2xl p-1 transition-all shadow-inner">
          <input 
            type="text" 
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="w-full bg-transparent px-4 py-2 text-sm text-slate-100 placeholder:text-slate-500 outline-none"
          />
        </div>
        <button 
          onClick={sendMessage}
          disabled={!input.trim()}
          className="bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-400 hover:to-violet-500 disabled:from-slate-700 disabled:to-slate-800 disabled:text-slate-500 text-white p-3 rounded-xl transition-all flex items-center justify-center w-12 h-12 shadow-lg hover:shadow-indigo-500/25 active:scale-95 flex-shrink-0"
        >
          <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        </button>
      </div>
    </div>
  );
};
