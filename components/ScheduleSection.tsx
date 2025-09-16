import React from 'react';
import type { Match } from '../types.ts';

interface ScheduleSectionProps {
  matches: Match[];
}

export const ScheduleSection: React.FC<ScheduleSectionProps> = ({ matches }) => {
  return (
    <section className="card p-6">
      <h2 className="font-heading text-2xl font-bold mb-4 text-text-primary uppercase tracking-wider">Agenda</h2>
      <div className="space-y-4">
        {matches.map((match) => (
          <div key={match.id} className="bg-bg-primary p-4 rounded-lg border border-border-primary transition-all duration-300 hover:border-primary/80">
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-primary font-heading tracking-widest">{match.day} &middot; {match.time} BRT</span>
              <span className="text-xs font-bold text-text-primary bg-bg-secondary px-2 py-1 rounded">{match.format}</span>
            </div>
            <div className="mt-3 text-center">
              <p className="text-lg font-semibold leading-relaxed font-heading tracking-wide">
                <span className="text-text-primary block sm:inline">{match.teamAName}</span>
                <span className="text-text-secondary mx-2 text-sm my-1 sm:my-0 block sm:inline">VS</span>
                <span className="text-text-primary block sm:inline">{match.teamBName}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};