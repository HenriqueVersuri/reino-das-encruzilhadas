
import React from 'react';
import { SpiritualEvent } from '../types';
import { Icons } from '../constants';

interface CalendarAreaProps {
  events: SpiritualEvent[];
}

const CalendarArea: React.FC<CalendarAreaProps> = ({ events }) => {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-12">
      <header className="text-center space-y-4">
        <h2 className="text-4xl font-bold text-white uppercase tracking-[0.2em] font-mystical">Agenda do <span className="text-[#d4af37]">Reino</span></h2>
        <p className="text-neutral-500 max-w-xl mx-auto font-serif-mystic italic">Sincronize sua energia com os rituais e trabalhos da nossa casa.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Calendar Grid */}
        <div className="lg:col-span-2 bg-neutral-900 border border-[#d4af37]/20 rounded-3xl p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-white uppercase tracking-widest">Maio 2025</h3>
            <div className="flex space-x-2">
              <button className="p-2 border border-neutral-800 rounded-lg hover:text-[#d4af37]">←</button>
              <button className="p-2 border border-neutral-800 rounded-lg hover:text-[#d4af37]">→</button>
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-2">
            {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'].map(d => (
              <div key={d} className="text-center text-[10px] uppercase font-bold text-neutral-600 mb-2">{d}</div>
            ))}
            {days.map(day => {
              const hasEvent = events.some(e => e.date === `2025-05-${day < 10 ? '0'+day : day}`);
              return (
                <div 
                  key={day} 
                  className={`aspect-square border border-neutral-800/50 rounded-lg p-1 flex flex-col items-center justify-center transition-all hover:border-[#d4af37]/50 cursor-pointer ${hasEvent ? 'bg-[#8b0000]/10 border-[#8b0000]/30' : ''}`}
                >
                  <span className={`text-xs ${hasEvent ? 'text-[#d4af37] font-bold' : 'text-neutral-500'}`}>{day}</span>
                  {hasEvent && <div className="w-1 h-1 bg-[#8b0000] rounded-full mt-1"></div>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Event List */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-white uppercase tracking-widest flex items-center">
            <span className="text-[#8b0000] mr-2"><Icons.Calendar /></span>
            Próximas Datas
          </h3>
          <div className="space-y-4">
            {events.map(event => (
              <div key={event.id} className="p-5 bg-black border border-neutral-800 rounded-2xl hover:border-[#d4af37]/50 transition-all group">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] uppercase font-bold bg-[#8b0000]/20 text-[#d4af37] px-2 py-0.5 rounded border border-[#d4af37]/20">
                    {event.type}
                  </span>
                  <span className="text-[10px] text-neutral-500 font-bold">{new Date(event.date).toLocaleDateString('pt-BR')}</span>
                </div>
                <h4 className="text-lg font-bold text-white group-hover:text-[#d4af37] transition-colors">{event.title}</h4>
                <p className="text-xs text-neutral-500 mt-2 leading-relaxed">{event.description}</p>
                <button className="mt-4 text-[10px] uppercase font-bold text-[#8b0000] hover:text-[#d4af37] transition-colors">Solicitar Presença →</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarArea;
