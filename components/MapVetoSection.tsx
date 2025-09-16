
import React, { useState } from 'react';
import type { Match, ValorantMap } from '../types.ts';
import { BanIcon } from './icons/BanIcon.tsx';

interface MapVetoSectionProps {
  matches: Match[];
  valorantMaps: ValorantMap[];
}

const BannedMapCard: React.FC<{ ban: { mapName?: string; teamName?: string }, imageUrl: string }> = ({ ban, imageUrl }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative aspect-[16/10] group overflow-hidden rounded-lg bg-bg-secondary border border-border-primary/20">
      {/* Skeleton Layer: Visible while loading, has pulse animation */}
      <div className={`absolute inset-0 w-full h-full bg-bg-primary animate-pulse transition-opacity duration-500 ${isLoaded ? 'opacity-0' : 'opacity-100'}`} />

      {/* Content Layer: Fades in when loaded */}
      <div className={`relative w-full h-full transition-opacity duration-500 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <img 
          src={imageUrl} 
          alt={ban.mapName || 'Mapa banido'}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
          onLoad={() => setIsLoaded(true)}
          loading="lazy"
        />
        
        <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
          <BanIcon className="w-10 h-10 lg:w-12 lg:h-12 text-primary drop-shadow-[0_0_8px_var(--color-primary)] transition-transform duration-300 group-hover:scale-110" />
        </div>
        <div className="absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-black/80 to-transparent text-center">
          <p className="font-bold text-xs sm:text-sm uppercase tracking-wider text-white" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.7)' }}>
            {ban.mapName}
          </p>
          <p className="text-[0.6rem] sm:text-xs uppercase text-text-secondary tracking-wider">
            Banido por {ban.teamName}
          </p>
        </div>
      </div>
    </div>
  );
};

const PickedMapCard: React.FC<{ pick: { mapName?: string; teamName?: string; type: string }, match: Match, lqImageUrl: string, hqImageUrl: string }> = ({ pick, match, lqImageUrl, hqImageUrl }) => {
    const [isLqLoaded, setIsLqLoaded] = useState(false);
    const [isHqLoaded, setIsHqLoaded] = useState(false);
    
    const pickedByTeam = pick.type === 'decider' ? 'Decisivo' : pick.teamName;

    const sideLogEntry = match.vetoLog.find(l => l.type === 'side' && l.mapName === pick.mapName);
    let attackingTeam = 'A definir';
    let defendingTeam = 'A definir';

    if (sideLogEntry) {
        if (sideLogEntry.side === 'Attacker') {
            attackingTeam = sideLogEntry.teamName!;
            defendingTeam = sideLogEntry.teamName === match.teamAName ? match.teamBName : match.teamAName;
        } else { // Defender
            defendingTeam = sideLogEntry.teamName!;
            attackingTeam = sideLogEntry.teamName === match.teamAName ? match.teamBName : match.teamAName;
        }
    }

    const isDecider = pick.type === 'decider';
    const isPick = pick.type === 'pick';

    const cardClasses = [
        'card',
        'flex',
        'flex-col',
        'p-0',
        'overflow-hidden',
        'h-full',
        'transition-all duration-300',
        isHqLoaded && isDecider ? 'decider-glow' : '',
        isHqLoaded && isPick ? 'pulsate-glow' : '',
    ].filter(Boolean).join(' ');

    return (
        <div className={cardClasses}>
            <div className="relative w-full aspect-video bg-bg-secondary">
              {/* Skeleton Layer: visible until LQ image is loaded */}
              <div className={`absolute inset-0 w-full h-full bg-bg-primary animate-pulse transition-opacity duration-300 ${isLqLoaded ? 'opacity-0' : 'opacity-100'}`} />

              {/* Low Quality Image: Acts as a blurred background placeholder */}
              <img 
                src={lqImageUrl}
                alt="" // Decorative
                aria-hidden="true"
                onLoad={() => setIsLqLoaded(true)}
                className={`absolute inset-0 w-full h-full object-cover filter blur-sm transition-opacity duration-500 ${isLqLoaded ? 'opacity-100' : 'opacity-0'}`}
              />

              {/* High Quality Image: Fades in on top when loaded */}
              <img 
                src={hqImageUrl}
                alt={pick.mapName || 'Mapa escolhido'}
                onLoad={() => setIsHqLoaded(true)}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${isHqLoaded ? 'opacity-100' : 'opacity-0'}`}
                loading="lazy"
              />

              {/* Overlay content: Fades in with the LQ image for fast feedback */}
              <div className={`absolute inset-0 transition-opacity duration-500 ${isLqLoaded ? 'opacity-100' : 'opacity-0'}`}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-3">
                  <h4 className="font-heading font-extrabold text-2xl uppercase text-white tracking-wider" style={{textShadow: '0 2px 4px rgba(0,0,0,0.8)'}}>{pick.mapName}</h4>
                </div>
              </div>
            </div>
            <div className={`p-4 bg-bg-primary/50 text-left flex-grow transition-opacity duration-500 ${isLqLoaded ? 'opacity-100' : 'opacity-0'}`}>
                <div className="text-sm uppercase font-semibold text-text-primary space-y-2">
                    <div className="flex justify-between items-center text-text-secondary">
                        <span className="font-medium">ESCOLHA</span>
                        <span className="text-text-primary font-bold text-right">{pickedByTeam}</span>
                    </div>
                     <div className="flex justify-between items-center text-text-secondary">
                        <span className="font-medium">ATACANTE</span>
                        <span className="text-text-primary font-bold text-right">{attackingTeam}</span>
                    </div>
                    <div className="flex justify-between items-center text-text-secondary">
                        <span className="font-medium">DEFENSOR</span>
                        <span className="text-text-primary font-bold text-right">{defendingTeam}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};


const MatchVetoDisplay: React.FC<{ match: Match; valorantMaps: ValorantMap[] }> = ({ match, valorantMaps }) => {
  const bans = match.vetoLog.filter(log => log.type === 'ban');
  const picks = match.vetoLog.filter(log => log.type === 'pick' || log.type === 'decider');

  return (
    <div className="card p-6 lg:p-8">
      {/* Match Title */}
      <h3 className="font-heading text-2xl lg:text-3xl font-bold text-center mb-10 uppercase tracking-widest text-text-primary">
        <span>{match.teamAName}</span>
        <span className="text-primary mx-4 text-xl font-light">VS</span>
        <span>{match.teamBName}</span>
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
        {/* Picked Maps Section */}
        <div className="md:col-span-8">
          <h4 className="font-heading text-lg font-semibold text-text-secondary uppercase tracking-wider mb-4 border-b-2 border-border-primary pb-2">Mapas da Série</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
           {picks.map((pick, index) => {
              const map = valorantMaps.find(m => m.displayName.toLowerCase() === pick.mapName!.toLowerCase());
              const lqImageUrl = map?.listViewIcon ?? map?.displayIcon ?? 'https://placehold.co/200x100/10161E/94A3B8?text=Mapa';
              const hqImageUrl = map?.splash ?? 'https://placehold.co/400x200/10161E/94A3B8?text=Mapa';

              return (
                <PickedMapCard 
                    key={index}
                    pick={pick}
                    match={match}
                    lqImageUrl={lqImageUrl}
                    hqImageUrl={hqImageUrl}
                />
              );
           })}
          </div>
        </div>
        
        {/* Banned Maps Section */}
        <div className="md:col-span-4">
          <h4 className="font-heading text-lg font-semibold text-text-secondary uppercase tracking-wider mb-4 border-b-2 border-border-primary pb-2">Vetos</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-2 gap-4">
            {bans.map((ban, index) => {
              const map = valorantMaps.find(m => m.displayName.toLowerCase() === ban.mapName!.toLowerCase());
              const imageUrl = map?.listViewIcon ?? map?.displayIcon ?? 'https://placehold.co/200x100/10161E/94A3B8?text=Mapa';
              return (
                <BannedMapCard 
                    key={index} 
                    ban={ban} 
                    imageUrl={imageUrl}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export const MapVetoSection: React.FC<MapVetoSectionProps> = ({ matches, valorantMaps }) => {
  return (
    <section>
      <div className="text-center mb-12">
        <h2 className="font-heading text-3xl lg:text-4xl font-bold text-text-primary uppercase title-line">Veto de Mapas</h2>
        <p className="mt-8 text-text-secondary max-w-2xl mx-auto">Siga o processo de seleção de mapas para as semifinais.</p>
      </div>
      <div className="space-y-12">
        {matches.map((match) => (
          (match.vetoLog && match.vetoLog.length > 0) &&
          <MatchVetoDisplay key={match.id} match={match} valorantMaps={valorantMaps} />
        ))}
      </div>
    </section>
  );
};