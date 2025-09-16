import React from 'react';
import type { Player } from '../types.ts';
import { PlayerCard } from './PlayerCard.tsx';
import { Countdown } from './Countdown.tsx';
import { VOTING_START_DATE, TEAM_NAMES } from '../constants.ts';
import { PlayerCardSkeleton } from './PlayerCardSkeleton.tsx';

interface VotingSectionProps {
  players: Player[];
  handleVote: (playerId: number) => void;
  hasVoted: boolean;
  totalVotes: number;
  backendError?: string | null;
  isVotingOpen: boolean;
  isLoadingPlayers: boolean;
}

export const VotingSection: React.FC<VotingSectionProps> = ({ players, handleVote, hasVoted, totalVotes, backendError, isVotingOpen, isLoadingPlayers }) => {
  const sortedPlayers = [...players].sort((a, b) => b.votes - a.votes);
  const teams: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D'];

  return (
    <section>
      <div className="text-center mb-16">
        <h1 className="font-heading text-4xl font-bold tracking-wider text-text-primary sm:text-5xl lg:text-6xl uppercase title-line">
          Jogador do Torneio
        </h1>
        <p className="mt-8 text-lg leading-8 text-text-secondary max-w-2xl mx-auto">
          Vote no MVP das finais da Elevate Forge! Seu voto decide quem será a lenda.
        </p>
        {hasVoted && (
            <p className="mt-4 text-md text-primary font-semibold font-heading tracking-wider">SEU VOTO FOI REGISTRADO. OBRIGADO!</p>
        )}
      </div>

      {!isVotingOpen && (
        <div className="mb-16">
          <Countdown targetDate={VOTING_START_DATE} />
        </div>
      )}

      {backendError && (
        <div className="mb-8 p-4 bg-primary/10 border border-primary/30 text-center card">
          <p className="font-semibold text-primary/90 font-heading">AVISO DE CONEXÃO</p>
          <p className="text-primary/80 mt-1">{backendError}</p>
        </div>
      )}

      <div className="space-y-20">
        {teams.map(team => (
          <div key={team}>
            <div className="mb-8 pl-4 py-2 border-l-4 border-primary" style={{ borderImage: 'linear-gradient(to top, var(--color-primary), transparent) 1' }}>
                <h2 className="font-heading text-3xl font-bold text-text-primary tracking-widest uppercase">{TEAM_NAMES[team]}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {isLoadingPlayers
                ? Array.from({ length: 5 }).map((_, index) => <PlayerCardSkeleton key={`${team}-${index}`} />)
                : [...sortedPlayers]
                  .filter(player => player.team === team)
                  .map((player) => (
                  <PlayerCard 
                    key={player.id} 
                    player={player} 
                    onVote={handleVote} 
                    hasVoted={hasVoted}
                    totalVotes={totalVotes}
                    isVotingOpen={isVotingOpen}
                  />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};