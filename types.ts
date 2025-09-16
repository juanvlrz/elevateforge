export interface ValorantMap {
  uuid: string;
  displayName: string;
  splash: string;
  displayIcon?: string;
  listViewIcon?: string;
}

export interface Player {
  id: number;
  name: string;
  twitter: string;
  avatarUrl: string;
  votes: number;
  team: 'A' | 'B' | 'C' | 'D';
}

export type VetoLogType = 'ban' | 'pick' | 'side' | 'decider';

export interface VetoLogEntry {
  type: VetoLogType;
  teamName?: string;
  mapName?: string;
  side?: 'Attacker' | 'Defender';
  text: string;
}

export interface Match {
  id: number;
  day: string;
  time: string;
  teamA: string;
  teamB: string;
  teamAName: string;
  teamBName: string;
  format: string;
  vetoLog: VetoLogEntry[];
}