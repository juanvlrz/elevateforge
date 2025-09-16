import React from 'react';
import { TwitchIcon } from './icons/TwitchIcon.tsx';
import { CalendarIcon } from './icons/CalendarIcon.tsx';

const TWITCH_CHANNEL = 'zactatic';
const STREAM_START_DATE = '17 de Setembro de 2025';
const STREAM_START_TIME = '19:00 (BRT)';
const THUMBNAIL_URL = 'https://i.imgur.com/BFN1vsO.jpeg';

export const StreamSection: React.FC = () => {
  return (
    <section className="card p-4 flex flex-col">
      <h2 className="font-heading text-xl font-bold mb-3 text-text-primary uppercase tracking-wider">Transmissão</h2>
      
      <div className="relative aspect-video bg-black overflow-hidden rounded-lg border border-border-primary group">
        <img src={THUMBNAIL_URL} alt="Arte promocional da transmissão Elevate Forge" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 to-transparent">
            <p className="font-heading text-lg font-bold text-white">Aguardando a transmissão</p>
            <div className="flex items-center gap-2 mt-1 text-sm text-text-secondary">
              <CalendarIcon className="w-4 h-4 text-primary" />
              <p className="font-medium">{STREAM_START_DATE} <span className="text-primary">{STREAM_START_TIME}</span></p>
            </div>
        </div>
      </div>

      <div className="mt-4">
        <a 
            href={`https://www.twitch.tv/${TWITCH_CHANNEL}`}
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold text-white rounded-lg transition-all duration-300
                       bg-gradient-to-br from-[#9147FF] to-[#6441A5]
                       hover:shadow-[0_0_15px_rgba(145,71,255,0.5)]
                       hover:brightness-110
                       active:scale-95
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg-secondary focus:ring-[#9147FF]
                       font-heading uppercase tracking-wider"
        >
            <TwitchIcon className="h-5 w-5" />
            <span>Acessar Canal</span>
        </a>
      </div>
    </section>
  );
};