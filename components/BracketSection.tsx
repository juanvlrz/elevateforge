import React from 'react';
import type { Match } from '../types.ts';
import { TrophyIcon } from './icons/TrophyIcon.tsx';

interface BracketSectionProps {
  matches: Match[];
}

const Matchup: React.FC<{ teamA: string; teamB: string; isFinal?: boolean }> = ({ teamA, teamB, isFinal = false }) => (
  <div className={`card w-full ${isFinal ? 'h-24' : 'h-32'}`}>
    <div className="h-1/2 p-3 flex items-center border-b border-border-primary">
      <p className="font-semibold text-text-primary font-heading tracking-wide">{teamA}</p>
    </div>
    <div className="h-1/2 p-3 flex items-center">
      <p className="font-semibold text-text-primary font-heading tracking-wide">{teamB}</p>
    </div>
  </div>
);

const Connector: React.FC<{ heightClass: string; hasTop: boolean; hasBottom: boolean }> = ({ heightClass, hasTop, hasBottom }) => (
  <div className={`flex items-center w-full ${heightClass}`}>
    <div className={`w-1/2 h-full flex items-center`}>
      <div className={`w-full h-1/2 flex flex-col justify-between`}>
        {hasTop && <div className="border-b border-r border-text-muted h-full rounded-br-lg"></div>}
        {hasBottom && <div className="border-t border-r border-text-muted h-full rounded-tr-lg"></div>}
      </div>
    </div>
    <div className="w-1/2 h-[2px] bg-text-muted"></div>
  </div>
);

export const BracketSection: React.FC<BracketSectionProps> = ({ matches }) => {
  const semiFinal1 = matches[0];
  const semiFinal2 = matches[1];

  return (
    <section>
      <div className="text-center mb-16">
        <h1 className="font-heading text-4xl font-bold tracking-wider text-text-primary sm:text-5xl lg:text-6xl uppercase title-line">
          Chave do Torneio
        </h1>
        <p className="mt-8 text-lg leading-8 text-text-secondary max-w-3xl mx-auto">
          Acompanhe o caminho para a vitória na chave de eliminação única da Elevate Forge.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row justify-center items-center lg:items-stretch text-text-primary w-full max-w-6xl mx-auto space-y-8 lg:space-y-0 lg:space-x-4">
        
        {/* Semifinals Column */}
        <div className="w-full lg:w-1/4 flex flex-col items-center">
          <h3 className="font-heading text-xl font-bold text-center text-primary mb-6 uppercase tracking-wider">Semifinais</h3>
          <div className="flex flex-col justify-between h-full w-full max-w-xs space-y-16">
             <Matchup teamA={semiFinal1.teamAName} teamB={semiFinal1.teamBName} />
             <Matchup teamA={semiFinal2.teamAName} teamB={semiFinal2.teamBName} />
          </div>
        </div>

        {/* Connectors to Final */}
        <div className="w-full lg:w-1/6 hidden lg:flex flex-col items-center justify-around">
            <Connector heightClass="h-1/2" hasTop={false} hasBottom={true} />
            <Connector heightClass="h-1/2" hasTop={true} hasBottom={false} />
        </div>
        
        {/* Final Column */}
        <div className="w-full lg:w-1/4 flex flex-col items-center">
            <h3 className="font-heading text-xl font-bold text-center text-primary mb-6 uppercase tracking-wider">Final</h3>
            <div className="flex items-center h-full w-full max-w-xs">
                <Matchup teamA="Vencedor SF1" teamB="Vencedor SF2" isFinal />
            </div>
        </div>
        
        {/* Connector to Champion */}
        <div className="w-full lg:w-1/6 hidden lg:flex items-center">
            <div className="w-full h-[2px] bg-text-muted"></div>
        </div>

        {/* Champion Column */}
        <div className="w-full lg:w-1/4 flex flex-col items-center">
            <h3 className="font-heading text-xl font-bold text-center text-primary mb-6 uppercase tracking-wider">Campeão</h3>
            <div className="flex items-center h-full w-full max-w-xs">
                <div className="card relative flex flex-col items-center justify-center w-full h-32 p-4 border-primary/50">
                    <TrophyIcon className="w-12 h-12 text-primary mb-2" style={{filter: 'drop-shadow(0 0 10px var(--color-primary-glow))'}} />
                    <p className="font-heading text-lg font-bold">A ser definido</p>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};