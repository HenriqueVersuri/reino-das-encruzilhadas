
import React from 'react';
import { View, User } from '../types';
import { Icons, COLORS } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  activeView: View;
  onNavigate: (view: View) => void;
  user: User | null;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, onNavigate, user, onLogout }) => {
  const navItems = [
    { id: View.HOME, label: 'Início', icon: <Icons.Home /> },
    { id: View.ENTITIES, label: 'Guardiões', icon: <Icons.Trident /> },
    { id: View.CALENDAR, label: 'Agenda', icon: <Icons.Calendar /> },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col text-neutral-300">
      {/* Golden Top Border */}
      <div className="h-1 bg-gradient-to-r from-[#8b0000] via-[#d4af37] to-[#8b0000]"></div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-[#d4af37]/20 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => onNavigate(View.HOME)}>
          <div className="text-[#8b0000] group-hover:text-[#d4af37] transition-colors">
            <Icons.Trident />
          </div>
          <h1 className="text-xl font-bold tracking-[0.2em] text-white uppercase hidden sm:block">
            REINO DAS <span className="text-[#d4af37]">ENCRUZILHADAS</span>
          </h1>
          <h1 className="text-xl font-bold tracking-widest text-[#d4af37] uppercase sm:hidden font-mystical">
            RE
          </h1>
        </div>
        
        <nav className="hidden lg:flex items-center space-x-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex items-center space-x-2 transition-all px-3 py-1 rounded-full border border-transparent hover:border-[#d4af37]/30 ${
                activeView === item.id ? 'text-[#d4af37] border-[#d4af37]/40' : 'text-gray-400 hover:text-white'
              }`}
            >
              {item.icon}
              <span className="font-mystical text-xs tracking-wider uppercase">{item.label}</span>
            </button>
          ))}
          
          <div className="h-6 w-[1px] bg-neutral-800 mx-2"></div>

          {user ? (
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => onNavigate(View.MEMBERS)}
                className={`flex items-center space-x-2 px-3 py-1 rounded-full border transition-all ${activeView === View.MEMBERS ? 'border-[#d4af37] text-[#d4af37]' : 'border-neutral-800 text-neutral-400 hover:text-white'}`}
              >
                <Icons.User />
                <span className="text-xs uppercase font-bold">{user.name.split(' ')[0]}</span>
              </button>
              
              {user.isAdmin && (
                <button 
                  onClick={() => onNavigate(View.ADMIN)}
                  className={`p-2 rounded-full border transition-all ${activeView === View.ADMIN ? 'bg-[#8b0000] border-[#d4af37] text-white' : 'border-neutral-800 text-neutral-600 hover:text-[#d4af37] hover:border-[#d4af37]'}`}
                  title="Admin"
                >
                  <Icons.Admin />
                </button>
              )}
              
              <button onClick={onLogout} className="text-[10px] uppercase font-bold text-neutral-600 hover:text-red-500">Sair</button>
            </div>
          ) : (
            <button 
              onClick={() => onNavigate(View.AUTH)}
              className="px-6 py-2 bg-[#8b0000] hover:bg-[#a00000] text-[#d4af37] rounded-lg border border-[#d4af37]/50 font-bold uppercase tracking-widest text-[10px] transition-all shadow-lg shadow-[#8b0000]/10"
            >
              Membro do Reino
            </button>
          )}
        </nav>

        {/* Mobile Status / Settings Icon */}
        <div className="lg:hidden text-[#d4af37]">
           <Icons.Settings />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto no-scrollbar pb-24 lg:pb-6">
        {children}
      </main>

      {/* Mobile Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-xl border-t border-[#d4af37]/20 px-2 py-3 flex justify-around items-center z-50">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col items-center space-y-1 transition-colors ${
              activeView === item.id ? 'text-[#d4af37]' : 'text-gray-500'
            }`}
          >
            {item.icon}
            <span className="text-[9px] uppercase font-bold tracking-widest">{item.label}</span>
          </button>
        ))}
        <button
          onClick={() => onNavigate(user ? View.MEMBERS : View.AUTH)}
          className={`flex flex-col items-center space-y-1 transition-colors ${
            activeView === View.MEMBERS || activeView === View.AUTH ? 'text-[#d4af37]' : 'text-gray-500'
          }`}
        >
          <Icons.User />
          <span className="text-[9px] uppercase font-bold tracking-widest">{user ? 'Perfil' : 'Login'}</span>
        </button>
        
        {user?.isAdmin && (
          <button
            onClick={() => onNavigate(View.ADMIN)}
            className={`flex flex-col items-center space-y-1 transition-colors ${
              activeView === View.ADMIN ? 'text-[#d4af37]' : 'text-gray-500'
            }`}
          >
            <Icons.Admin />
            <span className="text-[9px] uppercase font-bold tracking-widest">ADM</span>
          </button>
        )}
      </nav>

      <footer className="hidden lg:block py-6 border-t border-neutral-900 bg-black text-center">
          <p className="text-[10px] text-neutral-600 uppercase tracking-[0.3em]">
            © 2025 <span className="text-[#8b0000]">REINO</span> DAS <span className="text-[#d4af37]">ENCRUZILHADAS</span> • MISTÉRIO E VERDADE
          </p>
      </footer>
    </div>
  );
};

export default Layout;
