
import React, { useState } from 'react';
import { User } from '../types';
import { Icons } from '../constants';

interface AuthAreaProps {
  onLogin: (user: User) => void;
}

const AuthArea: React.FC<AuthAreaProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleQuickAccess = (role: 'admin' | 'member') => {
    const userObj: User = {
      id: role === 'admin' ? 'admin-1' : 'member-1',
      name: role === 'admin' ? 'Guardião Supremo' : 'Iniciado da Noite',
      email: role === 'admin' ? 'admin@reino.com' : 'membro@reino.com',
      isMember: true,
      isAdmin: role === 'admin'
    };

    setToastMessage(`Bem-vindo ao Reino, ${userObj.name}!`);
    setShowToast(true);

    setTimeout(() => {
      onLogin(userObj);
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isActuallyAdmin = email.toLowerCase() === 'admin@reino.com';
    const userName = isLogin ? (isActuallyAdmin ? 'Guardião Supremo' : 'Iniciado do Reino') : name;
    
    const userObj: User = {
      id: 'u-' + Date.now(),
      name: userName,
      email: email,
      isMember: true,
      isAdmin: isActuallyAdmin
    };

    setToastMessage(`Bem-vindo ao Reino, ${userName}!`);
    setShowToast(true);

    setTimeout(() => {
      onLogin(userObj);
    }, 1200);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-6 relative animate-in fade-in duration-700">
      {showToast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] bg-black/90 border border-[#d4af37] px-8 py-4 rounded-2xl shadow-[0_0_30px_rgba(139,0,0,0.4)] flex items-center space-x-4 backdrop-blur-md">
          <div className="text-[#d4af37] animate-pulse"><Icons.Trident /></div>
          <p className="text-[#d4af37] font-bold uppercase tracking-widest text-xs">{toastMessage}</p>
          <button
            type="button"
            onClick={() => setShowToast(false)}
            className="text-[#d4af37]/70 hover:text-[#d4af37] transition-colors text-sm font-bold"
            aria-label="Fechar aviso"
          >
            ×
          </button>
        </div>
      )}

      <div className={`w-full max-w-md bg-neutral-900 border border-[#d4af37]/30 rounded-[3rem] overflow-hidden shadow-2xl relative transition-all ${showToast ? 'opacity-50 blur-sm' : 'opacity-100'}`}>
        <div className="p-10 space-y-10">
          <header className="text-center space-y-3">
            <h2 className="text-4xl font-bold text-white uppercase tracking-widest font-mystical">
              {isLogin ? 'O Portal' : 'O Pacto'}
            </h2>
            <p className="text-[#d4af37] text-[10px] uppercase font-bold tracking-[0.3em] opacity-70">Identifique sua vibração</p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-neutral-500 tracking-widest ml-1">Nome</label>
                <input required type="text" value={name} onChange={e => setName(e.target.value)} className="w-full bg-black border border-neutral-800 rounded-xl px-5 py-4 text-white outline-none focus:border-[#d4af37] transition-all" />
              </div>
            )}
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-neutral-500 tracking-widest ml-1">E-mail</label>
              <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-black border border-neutral-800 rounded-xl px-5 py-4 text-white outline-none focus:border-[#d4af37] transition-all" placeholder="admin@reino.com" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-neutral-500 tracking-widest ml-1">Senha</label>
              <input required type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-black border border-neutral-800 rounded-xl px-5 py-4 text-white outline-none focus:border-[#d4af37] transition-all" />
            </div>

            <button type="submit" className="w-full bg-[#8b0000] text-[#d4af37] border border-[#d4af37]/40 font-bold uppercase tracking-widest py-5 rounded-2xl shadow-xl hover:scale-105 transition-all">
              {isLogin ? 'Abrir Caminhos' : 'Consagrar'}
            </button>
          </form>

          <div className="pt-6 border-t border-neutral-800 space-y-4">
             <p className="text-[9px] uppercase font-bold text-neutral-600 text-center tracking-widest">Acesso de Comando</p>
             <div className="grid grid-cols-2 gap-4">
                <button onClick={() => handleQuickAccess('admin')} className="px-4 py-3 border border-[#d4af37]/30 rounded-xl text-[#d4af37] text-[9px] font-bold uppercase hover:bg-[#d4af37]/10 transition-all">ADM</button>
                <button onClick={() => handleQuickAccess('member')} className="px-4 py-3 border border-neutral-800 rounded-xl text-neutral-500 text-[9px] font-bold uppercase hover:bg-white/5 transition-all">Membro</button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthArea;
