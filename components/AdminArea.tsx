
import React, { useState, useMemo } from 'react';
import { Entity, SpiritualEvent, Announcement, User, FinancialGoal, Donation, Payment, InventoryItem } from '../types';
import { Icons } from '../constants';
import MemberArea from './MemberArea';

interface AdminAreaProps {
  entities: Entity[];
  onUpdateEntities: (entities: Entity[]) => void;
  events: SpiritualEvent[];
  onUpdateEvents: (events: SpiritualEvent[]) => void;
  announcements: Announcement[];
  onUpdateAnnouncements: (announcements: Announcement[]) => void;
  allMembers: User[];
  onUpdateMembers: (members: User[]) => void;
  goals: FinancialGoal[];
  onUpdateGoals: (goals: FinancialGoal[]) => void;
  donations: Donation[];
  onUpdateDonations: (donations: Donation[]) => void;
  payments: Payment[];
  onUpdatePayments: (payments: Payment[]) => void;
  inventory: InventoryItem[];
  onUpdateInventory: (items: InventoryItem[]) => void;
}

const AdminArea: React.FC<AdminAreaProps> = ({ 
  allMembers = [], 
  onUpdateMembers,
  goals = [], 
  donations = [], 
  payments = [], 
  inventory = [], 
  onUpdateInventory,
  onUpdatePayments
}) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'members' | 'inventory' | 'portal'>('dashboard');
  const [editingMember, setEditingMember] = useState<User | null>(null);

  // Estatísticas do Dashboard Financeiro
  const stats = useMemo(() => {
    const totalDonations = donations.reduce((acc, d) => acc + (d.amount || 0), 0);
    const totalPayments = payments.filter(p => p.status === 'pago').reduce((acc, p) => acc + (p.amount || 0), 0);
    const totalArrecadado = totalDonations + totalPayments;
    const maxDonation = donations.length > 0 ? Math.max(...donations.map(d => d.amount)) : 100;
    return { totalDonations, totalPayments, totalArrecadado, maxDonation };
  }, [donations, payments]);

  const togglePaymentStatus = (paymentId: string) => {
    const newList = payments.map(p => {
      if (p.id === paymentId) {
        const isPaying = p.status === 'pendente';
        return { ...p, status: (isPaying ? 'pago' : 'pendente') as any, date: isPaying ? new Date().toISOString() : undefined };
      }
      return p;
    });
    onUpdatePayments(newList);
  };

  if (editingMember) {
    return (
      <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-6">
        <button onClick={() => setEditingMember(null)} className="text-[#d4af37] text-[10px] font-bold uppercase tracking-widest flex items-center hover:translate-x-[-4px] transition-transform">
          ← Voltar ao Comando do Reino
        </button>
        <MemberArea user={editingMember} onUpdateUser={(u) => onUpdateMembers(allMembers.map(m => m.id === u.id ? u : m))} isAdminViewing={true} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-12 animate-in fade-in duration-700">
      {/* Admin Header com Navegação Estilo MemberArea (Ícones) */}
      <header className="bg-neutral-900 border border-[#d4af37]/20 rounded-[3rem] p-8 flex flex-col md:flex-row items-center justify-between shadow-2xl space-y-6 md:space-y-0">
        <div className="flex items-center space-x-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#8b0000] to-[#d4af37] p-1 shadow-lg shadow-[#8b0000]/20">
            <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-2xl font-bold text-[#d4af37] font-mystical">
              A
            </div>
          </div>
          <div className="text-left">
            <h2 className="text-2xl font-bold text-white uppercase tracking-[0.2em] font-mystical">Guardião Supremo</h2>
            <p className="text-[#d4af37] text-[10px] uppercase font-bold tracking-[0.3em] opacity-60">Poder de Administração</p>
          </div>
        </div>

        {/* NAVEGAÇÃO POR ÍCONES - ONDE O USUÁRIO CIRCULOU */}
        <div className="flex flex-wrap justify-center gap-2 bg-black/40 p-2 rounded-2xl border border-neutral-800">
          {[
            { id: 'dashboard', label: 'Finanças', icon: <Icons.Chart /> },
            { id: 'members', label: 'Iniciados', icon: <Icons.User /> },
            { id: 'inventory', label: 'Estoque', icon: <Icons.Inventory /> },
            { id: 'portal', label: 'Mistério', icon: <Icons.Settings /> },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl text-[10px] font-bold uppercase transition-all duration-300 ${
                activeTab === t.id 
                ? 'bg-[#8b0000] text-[#d4af37] shadow-[0_0_20px_rgba(139,0,0,0.4)] border border-[#d4af37]/20 scale-105' 
                : 'text-neutral-500 hover:text-white hover:bg-white/5'
              }`}
            >
              {t.icon}
              <span className="hidden sm:inline tracking-widest">{t.label}</span>
            </button>
          ))}
        </div>
      </header>

      {/* Conteúdo Dinâmico */}
      <div className="min-h-[500px]">
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="lg:col-span-2 space-y-8">
              {/* Cards do Dashboard */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden group hover:border-[#d4af37]/30 transition-all">
                  <p className="text-[10px] uppercase font-bold text-neutral-500 tracking-widest mb-2">Arrecadação Total</p>
                  <p className="text-4xl font-bold text-[#d4af37]">R$ {stats.totalArrecadado.toLocaleString()}</p>
                </div>
                <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-[2.5rem] shadow-xl">
                  <p className="text-[10px] uppercase font-bold text-neutral-500 tracking-widest mb-2">Manutenções</p>
                  <p className="text-4xl font-bold text-white">R$ {stats.totalPayments.toLocaleString()}</p>
                </div>
                <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-[2.5rem] shadow-xl">
                  <p className="text-[10px] uppercase font-bold text-neutral-500 tracking-widest mb-2">Doações Espontâneas</p>
                  <p className="text-4xl font-bold text-[#8b0000]">R$ {stats.totalDonations.toLocaleString()}</p>
                </div>
              </div>

              {/* Visualização de Fluxo */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-[3rem] p-10 space-y-8 shadow-2xl relative overflow-hidden">
                <h3 className="text-xl font-bold text-white uppercase font-mystical tracking-wider">Histórico de Fluxo de Axé</h3>
                <div className="h-64 flex items-end space-x-4 border-b border-neutral-800/50 pb-4 relative">
                  {donations.length > 0 ? donations.slice(-10).map((d) => (
                    <div key={d.id} className="flex-1 flex flex-col items-center group relative h-full justify-end">
                      <div className="absolute bottom-full mb-3 opacity-0 group-hover:opacity-100 transition-all scale-95 group-hover:scale-100 bg-black border border-[#d4af37] px-4 py-2 rounded-2xl z-20 pointer-events-none text-center shadow-2xl min-w-[120px]">
                        <p className="text-[9px] text-[#d4af37] uppercase font-bold mb-1">{d.memberName}</p>
                        <p className="text-sm text-white font-bold">R$ {d.amount}</p>
                      </div>
                      <div 
                        style={{ height: `${Math.max(10, (d.amount / stats.maxDonation) * 100)}%` }}
                        className="w-full bg-gradient-to-t from-[#8b0000] to-[#d4af37] rounded-t-xl transition-all duration-700 hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] relative"
                      >
                         <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 rounded-t-xl"></div>
                      </div>
                    </div>
                  )) : (
                    <div className="absolute inset-0 flex items-center justify-center text-neutral-700 text-xs uppercase font-bold tracking-[0.3em] italic">Aguardando ofertas...</div>
                  )}
                </div>
              </div>

              {/* Tabela de Mensalidades Ativa */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-[3rem] overflow-hidden shadow-2xl">
                <div className="p-8 border-b border-neutral-800 flex justify-between items-center">
                  <h3 className="text-lg font-bold text-white uppercase font-mystical tracking-wider">Controle de Mensalidades</h3>
                  <span className="text-[9px] font-bold text-[#d4af37] uppercase bg-[#d4af37]/10 px-4 py-1 rounded-full border border-[#d4af37]/20">Maio 2025</span>
                </div>
                <table className="w-full text-left">
                  <thead className="bg-black/50 text-[10px] uppercase font-bold text-neutral-500 border-b border-neutral-800">
                    <tr>
                      <th className="px-10 py-6">Iniciado da Corrente</th>
                      <th className="px-10 py-6">Vibração (Status)</th>
                      <th className="px-10 py-6 text-right">Ação Rápida</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800/50">
                    {allMembers.map(m => {
                      const pay = payments.find(p => p.memberId === m.id);
                      const isPaid = pay?.status === 'pago';
                      return (
                        <tr key={m.id} className="hover:bg-white/[0.02] transition-colors group">
                          <td className="px-10 py-6 font-bold text-white group-hover:text-[#d4af37] transition-colors">{m.name}</td>
                          <td className="px-10 py-6">
                            <span className={`text-[9px] font-bold px-4 py-1 rounded-full border ${isPaid ? 'border-green-500/50 text-green-500 bg-green-500/5' : 'border-[#8b0000]/50 text-[#8b0000] bg-[#8b0000]/5 animate-pulse'}`}>
                              {isPaid ? 'PAGO' : 'PENDENTE'}
                            </span>
                          </td>
                          <td className="px-10 py-6 text-right">
                            <button onClick={() => pay && togglePaymentStatus(pay.id)} className={`text-[10px] font-bold uppercase transition-all px-4 py-2 rounded-xl ${isPaid ? 'text-neutral-600 hover:text-white border border-neutral-800' : 'text-[#d4af37] border border-[#d4af37]/20 hover:bg-[#d4af37]/10'}`}>
                              {isPaid ? 'Estornar' : 'Confirmar'}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Metas Laterais */}
            <div className="space-y-8">
              <div className="bg-black/40 border border-neutral-800 rounded-[3rem] p-10 space-y-8 shadow-inner">
                <h3 className="text-lg font-bold text-white font-mystical uppercase tracking-widest border-b border-neutral-800 pb-4 flex items-center">
                   <span className="mr-3 text-[#d4af37] opacity-50"><Icons.Trident /></span> Objetivos
                </h3>
                {goals.map(g => (
                  <div key={g.id} className="space-y-4">
                    <div className="flex justify-between text-[11px] font-bold uppercase tracking-tight">
                      <span className="text-neutral-400">{g.title}</span>
                      <span className="text-[#d4af37]">{((g.currentAmount/g.targetAmount)*100).toFixed(0)}%</span>
                    </div>
                    <div className="h-4 w-full bg-neutral-900 rounded-full overflow-hidden border border-neutral-800 p-1">
                      <div className="h-full bg-gradient-to-r from-[#8b0000] to-[#d4af37] rounded-full transition-all duration-1000" style={{width: `${(g.currentAmount/g.targetAmount)*100}%`}}></div>
                    </div>
                    <div className="flex justify-between text-[9px] text-neutral-600 font-bold uppercase tracking-widest">
                       <span>R$ {g.currentAmount}</span>
                       <span>R$ {g.targetAmount}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* OUTRAS ABAS (MEMBROS, ESTOQUE, PORTAL) CONTINUAM COM O MESMO CONTEXTO VISUAL */}
        {activeTab === 'members' && (
           <div className="space-y-8 animate-in slide-in-from-bottom-4">
              <div className="bg-neutral-900 border border-neutral-800 rounded-[3rem] overflow-hidden shadow-2xl">
                <table className="w-full text-left">
                  <thead className="bg-black/50 text-[11px] uppercase font-bold text-neutral-500 border-b border-neutral-800">
                    <tr>
                      <th className="px-10 py-8">Iniciado da Corrente</th>
                      <th className="px-10 py-8">Vibração (Papel)</th>
                      <th className="px-10 py-8 text-right">Comando Administrativo</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800/50">
                    {allMembers.map(m => (
                      <tr key={m.id} className="hover:bg-white/[0.03] transition-colors group">
                        <td className="px-10 py-8">
                            <div className="flex items-center space-x-5">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8b0000] to-[#d4af37] p-[1px] shadow-lg">
                                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-[12px] font-bold text-white uppercase">{m.name[0]}</div>
                                </div>
                                <div>
                                    <span className="font-bold text-white group-hover:text-[#d4af37] transition-colors block text-lg">{m.name}</span>
                                    <span className="block text-[10px] text-neutral-600 font-bold uppercase tracking-widest">{m.email}</span>
                                </div>
                            </div>
                        </td>
                        <td className="px-10 py-8">
                           <span className={`text-[9px] font-bold px-4 py-1 rounded-full border ${m.isAdmin ? 'border-[#d4af37] text-[#d4af37] bg-[#d4af37]/5' : 'border-neutral-800 text-neutral-500'}`}>
                              {m.isAdmin ? 'ADM SUPREMO' : 'INICIADO'}
                           </span>
                        </td>
                        <td className="px-10 py-8 text-right">
                          <button onClick={() => setEditingMember(m)} className="text-[#d4af37] text-[10px] font-bold uppercase tracking-widest hover:underline underline-offset-8">Acessar Perfil</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
           </div>
        )}

        {activeTab === 'inventory' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 animate-in slide-in-from-bottom-4">
             {inventory.map(item => (
                <div key={item.id} className="bg-neutral-900 border border-neutral-800 p-10 rounded-[3rem] shadow-xl space-y-8 hover:border-[#8b0000] transition-colors relative group overflow-hidden">
                   <div className="absolute top-6 right-8 text-[9px] uppercase font-bold text-neutral-700 tracking-[0.2em]">{item.category}</div>
                   <div>
                      <h4 className="text-white font-bold text-xl group-hover:text-[#d4af37] transition-colors">{item.name}</h4>
                      <p className="text-[10px] text-neutral-600 uppercase font-bold mt-2 tracking-widest">{item.unit}</p>
                   </div>
                   <div className="flex justify-between items-center bg-black/60 p-5 rounded-[2rem] border border-neutral-800/50">
                      <button onClick={() => onUpdateInventory(inventory.map(i => i.id === item.id ? {...i, quantity: Math.max(0, i.quantity - 1)} : i))} className="w-12 h-12 rounded-2xl bg-neutral-800 flex items-center justify-center hover:bg-[#8b0000] hover:text-white transition-all text-xl font-bold">-</button>
                      <span className={`text-4xl font-bold font-mystical ${item.quantity <= 5 ? 'text-red-500 animate-pulse' : 'text-white'}`}>{item.quantity}</span>
                      <button onClick={() => onUpdateInventory(inventory.map(i => i.id === item.id ? {...i, quantity: i.quantity + 1} : i))} className="w-12 h-12 rounded-2xl bg-neutral-800 flex items-center justify-center hover:bg-[#d4af37] hover:text-black transition-all text-xl font-bold">+</button>
                   </div>
                </div>
             ))}
          </div>
        )}

        {activeTab === 'portal' && (
           <div className="bg-neutral-900 border border-neutral-800 rounded-[4rem] p-24 text-center space-y-10 animate-in zoom-in-95 duration-700 shadow-2xl">
              <div className="text-[#8b0000] opacity-30 flex justify-center scale-150 mb-6"><Icons.Trident /></div>
              <h3 className="text-4xl font-bold text-white uppercase font-mystical tracking-widest">Mistérios do Sistema</h3>
              <p className="text-neutral-500 text-sm max-w-lg mx-auto italic font-serif-mystic leading-relaxed">Configurações globais de segurança, limpeza de logs de energia e backups de dados do Reino.</p>
           </div>
        )}
      </div>
    </div>
  );
};

export default AdminArea;
