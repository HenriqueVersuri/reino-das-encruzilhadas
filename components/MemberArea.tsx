
import React, { useState } from 'react';
import { User, MemberEntity, DiaryEntry, InternalMessage } from '../types';
import { Icons } from '../constants';

interface MemberAreaProps {
  user: User;
  onUpdateUser: (updatedUser: User) => void;
  isAdminViewing?: boolean;
}

const MemberArea: React.FC<MemberAreaProps> = ({ user, onUpdateUser, isAdminViewing = false }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'entities' | 'diary' | 'messages'>('profile');
  
  const updateProfile = (data: Partial<NonNullable<User['profile']>>) => {
    const updatedUser: User = {
      ...user,
      profile: {
        fullName: user.name,
        birthDate: '',
        whatsapp: '',
        allergies: '',
        observations: '',
        entities: [],
        diary: [],
        messages: [],
        ...user.profile,
        ...data
      }
    };
    onUpdateUser(updatedUser);
  };

  const addEntity = () => {
    const newEntity: MemberEntity = {
      id: Date.now().toString(),
      name: '',
      type: 'Exu',
      history: '',
      preferences: { drink: '', smoke: '', clothes: '', colors: '' }
    };
    const currentEntities = user.profile?.entities || [];
    updateProfile({ entities: [...currentEntities, newEntity] });
  };

  const addDiaryEntry = () => {
    const newEntry: DiaryEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      title: 'Nova Reflexão',
      content: ''
    };
    const currentDiary = user.profile?.diary || [];
    updateProfile({ diary: [newEntry, ...currentDiary] });
  };

  return (
    <div className={`max-w-6xl mx-auto p-4 md:p-8 space-y-10 animate-in fade-in duration-700 ${isAdminViewing ? 'bg-neutral-900/40 rounded-[3rem] border border-[#d4af37]/10' : ''}`}>
      {isAdminViewing && (
        <div className="bg-[#8b0000]/20 border border-[#d4af37]/30 px-6 py-2 rounded-full inline-flex items-center space-x-2">
          <Icons.Admin />
          <span className="text-[10px] font-bold text-[#d4af37] uppercase tracking-[0.2em]">Visão Administrativa: {user.name}</span>
        </div>
      )}

      <header className="bg-neutral-900 border border-[#d4af37]/20 rounded-[2.5rem] p-8 flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8 shadow-2xl">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#8b0000] to-[#d4af37] p-1">
          <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-3xl font-bold text-[#d4af37] font-mystical">
            {user.name[0]}
          </div>
        </div>
        <div className="text-center md:text-left flex-1">
          <h2 className="text-2xl font-bold text-white uppercase tracking-widest font-mystical">{user.profile?.fullName || user.name}</h2>
          <p className="text-[#d4af37] text-[10px] uppercase font-bold tracking-[0.3em] opacity-70">
            {user.isAdmin ? 'Guardião do Reino' : 'Iniciado da Corrente'}
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-2 bg-black/40 p-1.5 rounded-2xl border border-neutral-800">
          {[
            { id: 'profile', label: 'Cadastro', icon: <Icons.User /> },
            { id: 'entities', label: 'Falange', icon: <Icons.Trident /> },
            { id: 'diary', label: 'Diário', icon: <Icons.Book /> },
            { id: 'messages', label: 'Mensagens', icon: <Icons.Send /> },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-[10px] font-bold uppercase transition-all ${activeTab === t.id ? 'bg-[#8b0000] text-[#d4af37]' : 'text-neutral-500 hover:text-white'}`}
            >
              {t.icon}
              <span className="hidden sm:inline">{t.label}</span>
            </button>
          ))}
        </div>
      </header>

      <div className="min-h-[400px]">
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in slide-in-from-bottom-4">
            <div className="bg-neutral-900 border border-neutral-800 rounded-[2rem] p-8 space-y-6">
              <h3 className="text-[#d4af37] font-bold uppercase tracking-widest text-sm">Dados de Identidade</h3>
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[9px] uppercase text-neutral-500 font-bold ml-1">Nome Completo</label>
                  <input type="text" value={user.profile?.fullName || ''} onChange={e => updateProfile({fullName: e.target.value})} className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:border-[#d4af37]" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase text-neutral-500 font-bold ml-1">WhatsApp</label>
                    <input type="text" value={user.profile?.whatsapp || ''} onChange={e => updateProfile({whatsapp: e.target.value})} className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:border-[#d4af37]" placeholder="(00) 00000-0000" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase text-neutral-500 font-bold ml-1">E-mail</label>
                    <input type="text" value={user.email} disabled className="w-full bg-neutral-800/50 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-neutral-500" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-[2rem] p-8 space-y-6">
              <h3 className="text-[#d4af37] font-bold uppercase tracking-widest text-sm">Nascimento e Raízes</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] uppercase text-neutral-500 font-bold ml-1">Data</label>
                  <input type="date" value={user.profile?.birthDate || ''} onChange={e => updateProfile({birthDate: e.target.value})} className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-sm" />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] uppercase text-neutral-500 font-bold ml-1">Hora</label>
                  <input type="time" value={user.profile?.birthTime || ''} onChange={e => updateProfile({birthTime: e.target.value})} className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-sm" />
                </div>
                <div className="col-span-2 space-y-1">
                  <label className="text-[9px] uppercase text-neutral-500 font-bold ml-1">Local de Nascimento</label>
                  <input type="text" value={user.profile?.birthPlace || ''} onChange={e => updateProfile({birthPlace: e.target.value})} className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-sm" placeholder="Cidade, Estado" />
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 bg-neutral-900 border border-neutral-800 rounded-[2rem] p-8 space-y-6">
              <h3 className="text-[#d4af37] font-bold uppercase tracking-widest text-sm">Saúde e Observações de Ritual</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <textarea value={user.profile?.allergies || ''} onChange={e => updateProfile({allergies: e.target.value})} className="bg-black border border-neutral-800 rounded-xl p-4 text-sm h-24" placeholder="Alergias (Ervas, Comidas, Bebidas)..." />
                <textarea value={user.profile?.observations || ''} onChange={e => updateProfile({observations: e.target.value})} className="bg-black border border-neutral-800 rounded-xl p-4 text-sm h-24" placeholder="Observações importantes para o ADM..." />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'entities' && (
          <div className="space-y-8 animate-in slide-in-from-bottom-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-white uppercase font-mystical">Falange Particular</h3>
              <button onClick={addEntity} className="bg-[#d4af37] text-black px-4 py-2 rounded-xl text-[10px] font-bold uppercase flex items-center space-x-2">
                <Icons.Plus /> <span>Adicionar Entidade</span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              {(user.profile?.entities || []).map(en => (
                <div key={en.id} className="bg-neutral-900 border border-neutral-800 rounded-[2rem] p-8 space-y-6 relative border-l-4 border-l-[#8b0000]">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 max-w-xs">
                      <input value={en.name} onChange={e => updateProfile({entities: user.profile!.entities.map(item => item.id === en.id ? {...item, name: e.target.value} : item)})} className="bg-transparent border-b border-neutral-800 text-xl font-bold text-[#d4af37] outline-none w-full" placeholder="Nome da Entidade" />
                      <select value={en.type} onChange={e => updateProfile({entities: user.profile!.entities.map(item => item.id === en.id ? {...item, type: e.target.value} : item)})} className="bg-transparent text-[10px] uppercase font-bold text-neutral-500 mt-1">
                        <option value="Exu">Exu</option>
                        <option value="Pombagira">Pombagira</option>
                        <option value="Malandro">Malandro</option>
                        <option value="Caboclo">Caboclo</option>
                        <option value="Preto Velho">Preto Velho</option>
                      </select>
                    </div>
                    <button onClick={() => updateProfile({entities: user.profile!.entities.filter(item => item.id !== en.id)})} className="text-neutral-700 hover:text-red-500"><Icons.Trash /></button>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-neutral-500 tracking-widest">Histórico e Fundamento</label>
                    <textarea 
                      value={en.history} 
                      onChange={e => updateProfile({entities: user.profile!.entities.map(item => item.id === en.id ? {...item, history: e.target.value} : item)})} 
                      className="w-full bg-black/40 border border-neutral-800 rounded-2xl p-6 text-sm font-serif-mystic italic h-48 outline-none focus:border-[#8b0000] leading-relaxed resize-none" 
                      placeholder="Descreva a jornada desta entidade..." 
                    />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <input value={en.preferences.drink} onChange={e => updateProfile({entities: user.profile!.entities.map(item => item.id === en.id ? {...item, preferences: {...item.preferences, drink: e.target.value}} : item)})} className="bg-black p-3 rounded-xl text-xs" placeholder="Bebida" />
                    <input value={en.preferences.smoke} onChange={e => updateProfile({entities: user.profile!.entities.map(item => item.id === en.id ? {...item, preferences: {...item.preferences, smoke: e.target.value}} : item)})} className="bg-black p-3 rounded-xl text-xs" placeholder="Fumo" />
                    <input value={en.preferences.clothes} onChange={e => updateProfile({entities: user.profile!.entities.map(item => item.id === en.id ? {...item, preferences: {...item.preferences, clothes: e.target.value}} : item)})} className="bg-black p-3 rounded-xl text-xs" placeholder="Vestimenta" />
                    <input value={en.preferences.colors} onChange={e => updateProfile({entities: user.profile!.entities.map(item => item.id === en.id ? {...item, preferences: {...item.preferences, colors: e.target.value}} : item)})} className="bg-black p-3 rounded-xl text-xs" placeholder="Cores" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'diary' && (
          <div className="text-center py-20 opacity-20 italic">Diário de vivências espirituais...</div>
        )}
        
        {activeTab === 'messages' && (
          <div className="text-center py-20 opacity-20 italic">Central de comunicação interna...</div>
        )}
      </div>
    </div>
  );
};

export default MemberArea;
