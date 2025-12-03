import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, Bot, X, Loader2, Sparkles } from 'lucide-react';
import { ChatMessage } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

const AiGuide: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hi! I\'m your AI Badge Coach. Ask me how to earn a specific badge or plan your strategy!' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const response = await sendMessageToGemini(userMsg, messages);
    
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 rounded-full bg-gradient-to-r from-github-blue to-github-purple text-white shadow-lg hover:scale-110 transition-transform z-40 ${isOpen ? 'hidden' : 'flex'}`}
      >
        <Sparkles className="w-6 h-6 mr-2" />
        <span className="font-bold">Ask AI Coach</span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[90vw] md:w-[400px] h-[600px] bg-github-darker border border-github-border rounded-xl shadow-2xl z-50 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in transition-colors duration-300">
          {/* Header */}
          <div className="p-4 border-b border-github-border bg-github-dark flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-github-blue/20 flex items-center justify-center">
                 <Bot className="w-5 h-5 text-github-blue" />
              </div>
              <div>
                <h3 className="font-bold text-github-text text-sm">Badge Intelligence</h3>
                <p className="text-xs text-github-muted flex items-center gap-1">
                   <span className="w-1.5 h-1.5 rounded-full bg-github-green"></span>
                   Powered by Gemini 3.0 Pro
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-github-muted hover:text-github-text">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-github-inset transition-colors duration-300">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[85%] rounded-lg p-3 text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-github-blue text-white' 
                      : 'bg-github-dark border border-github-border text-github-text'
                  }`}
                >
                  {/* Basic markdown rendering for lists/bold */}
                  <div dangerouslySetInnerHTML={{ 
                      __html: msg.text
                        .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
                        .replace(/\n/g, '<br />') 
                  }} />
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                 <div className="bg-github-border/30 rounded-lg p-3 flex items-center gap-2 text-github-muted text-xs">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Thinking (High Reasoning)...
                 </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-github-dark border-t border-github-border">
            <div className="flex items-center gap-2 bg-github-darker border border-github-border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-github-blue">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="How do I get the Quickdraw badge?"
                className="flex-1 bg-transparent outline-none text-sm text-github-text placeholder-github-muted"
                disabled={isLoading}
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="text-github-blue hover:text-github-text disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="text-[10px] text-github-muted text-center mt-2">
                AI can make mistakes. Check official GitHub docs.
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AiGuide;