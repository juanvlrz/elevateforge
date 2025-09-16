
import React from 'react';
import type { Player } from '../types.ts';
import { TwitterIcon } from './icons/TwitterIcon.tsx';

const AnimatedProgressBar: React.FC<{ percentage: number }> = ({ percentage }) => {
  return (
    <div className="w-full bg-black/30 rounded-full h-2.5 overflow-hidden border border-border-primary/50">
      <div 
        className="h-full rounded-full transition-all duration-500 ease-out relative"
        style={{ 
          width: `${percentage}%`,
          backgroundImage: 'linear-gradient(to right, #7B031C, var(--color-primary))',
          boxShadow: '0 0 10px var(--color-primary-glow)' 
        }}
      >
        <div className="absolute top-0 left-0 h-full w-full bg-white/20 opacity-0 animate-[sheen_2s_infinite]" style={{ clipPath: 'polygon(10% 0, 40% 0, 30% 100%, 0% 100%)' }}></div>
      </div>
       <style>{`
        @keyframes sheen {
          0% { transform: translateX(-100%) skewX(-20deg); opacity: 0; }
          30% { transform: translateX(-100%) skewX(-20deg); opacity: 0.8; }
          70% { transform: translateX(200%) skewX(-20deg); opacity: 0.8; }
          100% { transform: translateX(200%) skewX(-20deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

// FIX: Define PlayerCardProps interface to resolve 'Cannot find name' error.
interface PlayerCardProps {
  player: Player;
  onVote: (playerId: number) => void;
  hasVoted: boolean;
  totalVotes: number;
  isVotingOpen: boolean;
}

const teamStyles: Record<Player['team'], { badge: string; avatarBorderHover: string }> = {
    A: { 
        badge: 'border-primary text-primary bg-primary/10',
        avatarBorderHover: 'group-hover:bg-primary',
    },
    B: {
        badge: 'border-secondary text-secondary bg-secondary/10',
        avatarBorderHover: 'group-hover:bg-secondary',
    },
    C: {
        badge: 'border-purple-400 text-purple-400 bg-purple-400/10',
        avatarBorderHover: 'group-hover:bg-purple-400',
    },
    D: {
        badge: 'border-yellow-400 text-yellow-400 bg-yellow-400/10',
        avatarBorderHover: 'group-hover:bg-yellow-400',
    },
};

export const PlayerCard: React.FC<PlayerCardProps> = ({ player, onVote, hasVoted, totalVotes, isVotingOpen }) => {
  const votePercentage = totalVotes > 0 ? (player.votes / totalVotes) * 100 : 0;
  const buttonText = !isVotingOpen ? 'Aguarde' : hasVoted ? 'Votado' : 'Votar';

  return (
    <div className="card group p-5">
      <div className="flex flex-col items-center text-center">
        <div className="relative w-28 h-28">
          {/* Background hexagon for border effect */}
          <div 
            className={`absolute inset-0 bg-border-primary/30 transition-colors duration-300 ${teamStyles[player.team].avatarBorderHover}`}
            style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
          ></div>
          
          {/* Foreground hexagon for image */}
          <div 
            className="absolute inset-[2px] bg-bg-secondary overflow-hidden" 
            style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
          >
            <img 
              src={player.avatarUrl} 
              alt={player.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              loading="lazy"
              width="112"
              height="112"
            />
          </div>
        </div>

        <div className="flex items-baseline justify-center gap-2 mt-4">
          <h3 className="text-xl font-bold text-text-primary capitalize font-heading tracking-wide">
            {player.name}
          </h3>
          <span className={`px-2 py-0.5 text-xs font-bold font-heading rounded-full border ${teamStyles[player.team].badge}`}>
            {player.team}
          </span>
        </div>
        <a 
          href={player.twitter} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-text-muted hover:text-primary transition-colors duration-200 mt-1"
          aria-label={`Twitter de ${player.name}`}
        >
          <TwitterIcon className="w-5 h-5" />
        </a>

        <div className="w-full mt-6">
          <div className="flex justify-between text-sm text-text-secondary mb-1 font-medium">
            <span>{player.votes.toLocaleString()} Votos</span>
            <span>{votePercentage.toFixed(1)}%</span>
          </div>
          <AnimatedProgressBar percentage={votePercentage} />
        </div>

        <button
          onClick={() => onVote(player.id)}
          disabled={hasVoted || !isVotingOpen}
          className="mt-6 relative w-full px-4 py-2.5 text-base font-bold text-white rounded-lg transition-all duration-300
                     bg-gradient-to-br from-primary to-[#B30529]
                     enabled:hover:shadow-[0_0_15px_var(--color-primary-glow)]
                     enabled:hover:brightness-110
                     enabled:active:scale-95
                     disabled:bg-gradient-to-br disabled:from-text-muted disabled:to-gray-600 disabled:cursor-not-allowed disabled:opacity-60
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg-secondary focus:ring-primary
                     font-heading uppercase tracking-wider"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};