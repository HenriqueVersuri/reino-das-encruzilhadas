
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import AdminArea from './components/AdminArea';
import AuthArea from './components/AuthArea';
import CalendarArea from './components/CalendarArea';
import MemberArea from './components/MemberArea';
import { View, Entity, SpiritualEvent, Announcement, User, FinancialGoal, Donation, Payment, InventoryItem } from './types';
import { Icons, ENTITIES_LIST, INITIAL_EVENTS } from './constants';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>(View.HOME);
  
  const [entities, setEntities] = useState<Entity[]>(() => {
    const saved = localStorage.getItem('reino_entities');
    return saved ? JSON.parse(saved) : ENTITIES_LIST;
  });

  const [events, setEvents] = useState<SpiritualEvent[]>(() => {
    const saved = localStorage.getItem('reino_events');
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });

  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    const saved = localStorage.getItem('reino_announcements');
    return saved ? JSON.parse(saved) : [{ id: '1', text: 'Vibrações positivas no portal.', priority: 'low', active: true }];
  });

  const [allUsers, setAllUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('reino_all_users');
    const u = saved ? JSON.parse(saved) : [];
    if (u.length === 0) {
      return [
        { id: 'admin-1', name: 'Guardião Supremo', email: 'versurih@gmail.com', isAdmin: true, isMember: true }
      ];
    }
    return u;
  });

  const [goals, setGoals] = useState<FinancialGoal[]>(() => {
    const saved = localStorage.getItem('reino_goals');
    return saved ? JSON.parse(saved) : [
      { id: 'g1', title: 'Manutenção do Congá', targetAmount: 3000, currentAmount: 2100, deadline: '2025-12-31' },
      { id: 'g2', title: 'Reforma do Telhado', targetAmount: 15000, currentAmount: 5200, deadline: '2025-08-15' }
    ];
  });

  const [donations, setDonations] = useState<Donation[]>(() => {
    const saved = localStorage.getItem('reino_donations');
    const d = saved ? JSON.parse(saved) : [];
    if (d.length === 0) {
        return [
            { id: 'd1', memberId: 'm-1', memberName: 'Mário Silva', amount: 350, date: '2025-05-01', purpose: 'Oferta' },
            { id: 'd2', memberId: 'm-2', memberName: 'Lúcia Ferreira', amount: 450, date: '2025-05-05', purpose: 'Agradecimento' },
            { id: 'd3', memberId: 'm-3', memberName: 'Roberto Santos', amount: 200, date: '2025-05-08', purpose: 'Velas' },
        ];
    }
    return d;
  });

  const [payments, setPayments] = useState<Payment[]>(() => {
    const saved = localStorage.getItem('reino_payments');
    return saved ? JSON.parse(saved) : [];
  });

  const [inventory, setInventory] = useState<InventoryItem[]>(() => {
    const saved = localStorage.getItem('reino_inventory');
    return saved ? JSON.parse(saved) : [
      { id: 'i1', name: 'Vela 7 Dias Branca', quantity: 28, unit: 'un', category: 'Velas' },
      { id: 'i2', name: 'Vela 7 Dias Bicolor', quantity: 15, unit: 'un', category: 'Velas' },
      { id: 'i3', name: 'Arruda Fresca', quantity: 10, unit: 'maços', category: 'Ervas' },
      { id: 'i4', name: 'Marafo', quantity: 12, unit: 'litros', category: 'Bebidas' }
    ];
  });

  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('reino_user');
    const u = saved ? JSON.parse(saved) : null;
    // Forçar Admin se for o email de exemplo
    if (u && u.email === 'versurih@gmail.com') u.isAdmin = true;
    return u;
  });

  useEffect(() => {
    const currentMonth = '05/2025';
    const missingPayments = allUsers.filter(u => 
        !payments.some(p => p.memberId === u.id && p.month === currentMonth)
    ).map(u => ({
        id: `pay-${u.id}-${Date.now()}`,
        memberId: u.id,
        memberName: u.name,
        amount: 100,
        month: currentMonth,
        status: 'pendente' as const
    }));
    if (missingPayments.length > 0) setPayments(prev => [...prev, ...missingPayments]);
  }, [allUsers.length]);

  useEffect(() => {
    localStorage.setItem('reino_all_users', JSON.stringify(allUsers));
    localStorage.setItem('reino_user', JSON.stringify(user));
    localStorage.setItem('reino_donations', JSON.stringify(donations));
    localStorage.setItem('reino_payments', JSON.stringify(payments));
    localStorage.setItem('reino_inventory', JSON.stringify(inventory));
    localStorage.setItem('reino_goals', JSON.stringify(goals));
  }, [allUsers, user, donations, payments, inventory, goals]);

  const handleUpdateAllMembers = (newList: User[]) => {
    setAllUsers(newList);
    if (user) {
      const current = newList.find(m => m.id === user.id);
      if (current) setUser(current);
    }
  };

  const renderContent = () => {
    switch (activeView) {
      case View.HOME:
        return (
          <div className="px-6 py-12 max-w-6xl mx-auto text-center space-y-12">
            <div className="inline-flex items-center justify-center p-6 rounded-full border border-[#d4af37]/30 bg-[#8b0000]/10 text-[#d4af37] animate-pulse">
              <Icons.Trident />
            </div>
            <h2 className="text-5xl md:text-7xl font-bold tracking-[0.2em] text-white uppercase font-mystical">REINO DAS <br/><span className="text-[#d4af37]">ENCRUZILHADAS</span></h2>
            <div className="flex flex-wrap justify-center gap-6 pt-12">
              <button onClick={() => setActiveView(user ? View.MEMBERS : View.AUTH)} className="px-10 py-4 bg-transparent border border-[#d4af37]/30 text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/5">Santuário</button>
            </div>
          </div>
        );
      case View.CALENDAR: return <CalendarArea events={events} />;
      case View.AUTH: return <AuthArea onLogin={setUser} />;
      case View.MEMBERS: return user ? <MemberArea user={user} onUpdateUser={setUser} /> : <AuthArea onLogin={setUser} />;
      case View.ADMIN: return (
        <AdminArea 
          entities={entities} onUpdateEntities={setEntities}
          events={events} onUpdateEvents={setEvents}
          announcements={announcements} onUpdateAnnouncements={setAnnouncements}
          allMembers={allUsers} onUpdateMembers={handleUpdateAllMembers}
          goals={goals} onUpdateGoals={setGoals}
          donations={donations} onUpdateDonations={setDonations}
          payments={payments} onUpdatePayments={setPayments}
          inventory={inventory} onUpdateInventory={setInventory}
        />
      );
      default: return null;
    }
  };

  return (
    <Layout activeView={activeView} onNavigate={setActiveView} user={user} onLogout={() => setUser(null)}>
      {renderContent()}
    </Layout>
  );
};

export default App;
