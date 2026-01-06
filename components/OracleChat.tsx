
import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { Icons } from '../constants';
import { getMessages, addMessage } from '../services/messageService';
// ...existing code...

const OracleChat: React.FC = () => {
  const STORAGE_KEY = 'reino_oracle_messages';

  // Inicializa o estado lendo do backend
  const [messages, setMessages] = useState<Message[]>([]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Carrega mensagens do backend ao montar
  useEffect(() => {
    async function fetchMessages() {
      const msgs = await getMessages();
      setMessages(msgs.map((m: any) => ({ ...m, timestamp: new Date(m.timestamp) })));
    }
    fetchMessages();
  }, []);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    setIsLoading(true);
    setInput('');

    // Salva mensagem do usuário no backend
    const userMsg = {
      role: 'user',
      text: input,
      timestamp: new Date().toISOString()
    };
    await addMessage(userMsg);
    // Resposta simulada
    setTimeout(async () => {
      const respostas = [
        "As entidades ouviram seu chamado. Confie na sua intuição.",
        "O caminho se abre para quem busca com fé.",
        "A resposta está dentro de você. Medite e reflita.",
        "As encruzilhadas pedem paciência. O tempo revelará o que precisa saber."
      ];
      const resposta = respostas[Math.floor(Math.random() * respostas.length)];
      const modelMsg = {
        role: 'model',
        text: resposta,
        timestamp: new Date().toISOString()
      };
      await addMessage(modelMsg);
      // Atualiza lista de mensagens
      const msgs = await getMessages();
      setMessages(msgs.map((m: any) => ({ ...m, timestamp: new Date(m.timestamp) })));
      setIsLoading(false);
    }, 1200);
  };

  const clearChat = () => {
    if (confirm("Deseja realmente limpar seu histórico com o Oráculo?")) {
      const initialMessage: Message = {
        role: 'model',
        text: 'As águas limparam o caminho. O que mais deseja saber, buscador?',
        timestamp: new Date()
      };
      setMessages([initialMessage]);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] md:h-[700px] max-w-4xl mx-auto w-full bg-neutral-900/50 rounded-2xl border border-red-900/20 overflow-hidden backdrop-blur-sm shadow-2xl">
      {/* Chat Header with Actions */}
      <div className="px-6 py-3 border-b border-red-900/20 bg-black/40 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></div>
          <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-neutral-400">Conexão Espiritual Ativa</span>
        </div>
        <button 
          onClick={clearChat}
          className="text-[9px] uppercase font-bold text-neutral-500 hover:text-red-500 transition-colors flex items-center space-x-1"
          title="Limpar Histórico"
        >
          <Icons.Trash />
          <span className="hidden sm:inline">Limpar Histórico</span>
        </button>
      </div>

      {/* Chat Area */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 no-scrollbar"
      >
        {messages.map((msg, idx) => (
          <div 
            key={idx} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
          >
            <div className={`max-w-[85%] md:max-w-[70%] rounded-2xl p-4 ${
              msg.role === 'user' 
                ? 'bg-red-900/20 border border-red-800/30 text-red-50' 
                : 'bg-neutral-800/80 border border-neutral-700/30 text-neutral-100 shadow-xl'
            }`}>
              <div className="flex items-center justify-between mb-1 opacity-50">
                <span className="text-[10px] uppercase font-bold tracking-widest">
                  {msg.role === 'user' ? 'Sua Voz' : 'Oráculo'}
                </span>
                <span className="text-[9px]">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <p className={`text-sm md:text-base leading-relaxed whitespace-pre-wrap ${msg.role === 'model' ? 'font-serif-mystic italic' : 'font-sans'}`}>
                {msg.text}
              </p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start animate-pulse">
            <div className="bg-neutral-800/80 border border-neutral-700/30 rounded-2xl p-4 flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full animate-bounce"></div>
              </div>
              <span className="text-xs italic text-neutral-400">O Reino está respondendo...</span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-red-900/20 bg-black/40">
        <div className="relative flex items-center">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                }
            }}
            placeholder="Sussurre sua pergunta às encruzilhadas..."
            className="w-full bg-neutral-800/50 border border-red-900/30 rounded-xl py-3 pl-4 pr-12 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#d4af37]/50 transition-all resize-none max-h-32"
            rows={1}
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="absolute right-2 p-2 bg-[#8b0000] hover:bg-[#a00000] disabled:opacity-30 disabled:hover:bg-[#8b0000] text-[#d4af37] rounded-lg transition-all border border-[#d4af37]/20 shadow-lg"
          >
            <Icons.Send />
          </button>
        </div>
        <p className="text-[10px] text-center mt-3 text-neutral-600 uppercase tracking-widest font-bold">
          As encruzilhadas não esquecem o que foi dito
        </p>
      </div>
    </div>
  );
};

export default OracleChat;
