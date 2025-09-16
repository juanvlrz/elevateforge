import type { Player, Match } from './types.ts';

// Data de início da votação (ISO 8601 com fuso horário)
// 'AAAA-MM-DDTHH:mm:ss-HH:mm' (UTC-3 para Horário de Brasília)
export const VOTING_START_DATE = '2025-09-18T00:00:00-03:00';

// Single source of truth for team names to ensure consistency
export const TEAM_NAMES = {
  A: 'TIME A',
  B: 'TIME B',
  C: 'TIME C',
  D: 'TIME D',
};

const playersWithAvatars = [
  // TEAM A
  { name: 'znajder', twitter: 'https://twitter.com/znajdervlr', avatarUrl: 'https://media.valorant-api.com/agents/add6443a-41bd-e414-f6ad-e58d267f4e95/displayicon.png' }, // Jett
  { name: 'royal', twitter: 'https://twitter.com/RoyalBRNA', avatarUrl: 'https://media.valorant-api.com/agents/a3bfb853-43b2-7238-a4f1-ad90e9e46bcc/displayicon.png' }, // Reyna
  { name: 'akshinho', twitter: 'https://twitter.com/akshinho', avatarUrl: 'https://media.valorant-api.com/agents/f94c3b30-42be-e959-889c-5aa313dba261/displayicon.png' }, // Raze
  { name: 'Theuzvlrr', twitter: 'https://twitter.com/Theuzvlrr', avatarUrl: 'https://media.valorant-api.com/agents/eb93336a-449b-9c1b-0a54-a891f7921d69/displayicon.png' }, // Phoenix
  { name: 'Trsv', twitter: 'https://twitter.com/trvsvlr', avatarUrl: 'https://media.valorant-api.com/agents/7f94d92c-4234-0a36-9646-3a87eb8b5c89/displayicon.png' }, // Yoru
  
  // TEAM B
  { name: 'cxioziN', twitter: 'https://twitter.com/caiozinvlr', avatarUrl: 'https://media.valorant-api.com/agents/8e253930-4c05-31dd-1b6c-968525494517/displayicon.png' }, // Omen
  { name: 'chadu717', twitter: 'https://twitter.com/_chadu', avatarUrl: 'https://media.valorant-api.com/agents/9f0d8ba9-4140-b941-57d3-a7ad57c6b417/displayicon.png' }, // Brimstone
  { name: 'shiyande', twitter: 'https://twitter.com/shiyandevlr', avatarUrl: 'https://media.valorant-api.com/agents/707eab51-4836-f488-046a-cda6bf494859/displayicon.png' }, // Viper
  { name: 'jao ferinha', twitter: 'https://twitter.com/joaozoldyck_', avatarUrl: 'https://media.valorant-api.com/agents/569fdd95-4d10-43ab-ca70-79becc718b46/displayicon.png' }, // Sage
  { name: 'dErk', twitter: 'https://twitter.com/Derkvlr', avatarUrl: 'https://media.valorant-api.com/agents/117ed9e3-49f3-6512-3ccf-0cada7e3823b/displayicon.png' }, // Cypher
  
  // TEAM C
  { name: 'Yasuzinn', twitter: 'https://twitter.com/yasuzinn_', avatarUrl: 'https://media.valorant-api.com/agents/320b2a48-4d9b-a075-30f1-1f93a9b638fa/displayicon.png' }, // Sova
  { name: 'mxnor7', twitter: 'https://twitter.com/mxnor7', avatarUrl: 'https://media.valorant-api.com/agents/1e58de9c-4950-5125-93e9-a0aee9f98746/displayicon.png' }, // Killjoy
  { name: 'yanz', twitter: 'https://twitter.com/yanzxd99', avatarUrl: 'https://media.valorant-api.com/agents/6f2a04ca-43e0-be17-7f36-b3908627744d/displayicon.png' }, // Skye
  { name: 'pinelli', twitter: 'https://twitter.com/pinellivlr', avatarUrl: 'https://media.valorant-api.com/agents/601dbbe7-43ce-be57-2a40-4abd24953621/displayicon.png' }, // KAY/O
  { name: 'rozca', twitter: 'https://twitter.com/rozca_', avatarUrl: 'https://media.valorant-api.com/agents/22697a3d-45bf-8dd7-4fec-84a9e28c69d7/displayicon.png' }, // Chamber
  
  // TEAM D
  { name: 'Tabzin', twitter: 'https://twitter.com/tabzinvlr', avatarUrl: 'https://media.valorant-api.com/agents/0e38b510-41a8-5780-5e8f-568b2a4f2d6c/displayicon.png' }, // Iso
  { name: 'Hellboy', twitter: 'https://twitter.com/fpshellboy', avatarUrl: 'https://media.valorant-api.com/agents/dade69b4-4f5a-8528-247b-219e5a1facd6/displayicon.png' }, // Fade
  { name: 'Lzz', twitter: 'https://twitter.com/lrg99fps', avatarUrl: 'https://media.valorant-api.com/agents/95b78ed7-4637-86d9-7e41-71ba8c293152/displayicon.png' }, // Harbor
  { name: 'Catty', twitter: 'https://twitter.com/satorucatty', avatarUrl: 'https://media.valorant-api.com/agents/e370fa57-4757-3604-3648-499e1f642d3f/displayicon.png' }, // Gekko
  { name: 'nezK', twitter: 'https://twitter.com/nezekAs', avatarUrl: 'https://media.valorant-api.com/agents/cc8b64c8-4b25-4ff9-6e7f-37b4da43d235/displayicon.png' }, // Deadlock
];

export const players: Player[] = playersWithAvatars.map((p, index) => ({
  id: index + 1,
  name: p.name,
  twitter: p.twitter,
  avatarUrl: p.avatarUrl,
  votes: 0,
  team: 
    index < 5 ? 'A' :
    index < 10 ? 'B' :
    index < 15 ? 'C' : 'D',
}));

export const matches: Match[] = [
  {
    id: 1,
    day: "Quarta",
    time: "19:00",
    teamA: "TIME A",
    teamB: "TIME C",
    teamAName: TEAM_NAMES.A,
    teamBName: TEAM_NAMES.C,
    format: "BO3",
    vetoLog: [
      { type: 'ban', teamName: TEAM_NAMES.C, mapName: 'Lotus', text: `${TEAM_NAMES.C} bane Lotus` },
      { type: 'ban', teamName: TEAM_NAMES.A, mapName: 'Bind', text: `${TEAM_NAMES.A} bane Bind` },
      { type: 'pick', teamName: TEAM_NAMES.C, mapName: 'Ascent', text: `${TEAM_NAMES.C} escolhe Ascent` },
      { type: 'pick', teamName: TEAM_NAMES.A, mapName: 'Abyss', text: `${TEAM_NAMES.A} escolhe Abyss` },
      { type: 'ban', teamName: TEAM_NAMES.C, mapName: 'Sunset', text: `${TEAM_NAMES.C} bane Sunset` },
      { type: 'ban', teamName: TEAM_NAMES.A, mapName: 'Corrode', text: `${TEAM_NAMES.A} bane Corrode` },
      { type: 'decider', mapName: 'Haven', text: 'Haven é o mapa decisivo' },
      { type: 'side', teamName: TEAM_NAMES.A, mapName: 'Ascent', side: 'Attacker', text: `${TEAM_NAMES.A} começa Atacante na Ascent` },
      { type: 'side', teamName: TEAM_NAMES.C, mapName: 'Abyss', side: 'Defender', text: `${TEAM_NAMES.C} começa Defensor na Abyss` },
      { type: 'side', teamName: TEAM_NAMES.A, mapName: 'Haven', side: 'Attacker', text: `${TEAM_NAMES.A} começa Atacante na Haven` },
    ],
  },
  {
    id: 2,
    day: "Quarta",
    time: "21:00",
    teamA: "TIME B",
    teamB: "TIME D",
    teamAName: TEAM_NAMES.B,
    teamBName: TEAM_NAMES.D,
    format: "BO3",
    vetoLog: [
      { type: 'ban', teamName: TEAM_NAMES.D, mapName: 'Abyss', text: `${TEAM_NAMES.D} bane Abyss` },
      { type: 'ban', teamName: TEAM_NAMES.B, mapName: 'Haven', text: `${TEAM_NAMES.B} bane Haven` },
      { type: 'pick', teamName: TEAM_NAMES.D, mapName: 'Bind', text: `${TEAM_NAMES.D} escolhe Bind` },
      { type: 'pick', teamName: TEAM_NAMES.B, mapName: 'Corrode', text: `${TEAM_NAMES.B} escolhe Corrode` },
      { type: 'ban', teamName: TEAM_NAMES.D, mapName: 'Sunset', text: `${TEAM_NAMES.D} bane Sunset` },
      { type: 'ban', teamName: TEAM_NAMES.B, mapName: 'Ascent', text: `${TEAM_NAMES.B} bane Ascent` },
      { type: 'decider', mapName: 'Lotus', text: 'Lotus é o mapa decisivo' },
      { type: 'side', teamName: TEAM_NAMES.B, mapName: 'Bind', side: 'Attacker', text: `${TEAM_NAMES.B} começa Atacante na Bind` },
      { type: 'side', teamName: TEAM_NAMES.D, mapName: 'Corrode', side: 'Defender', text: `${TEAM_NAMES.D} começa Defensor na Corrode` },
      { type: 'side', teamName: TEAM_NAMES.D, mapName: 'Lotus', side: 'Defender', text: `${TEAM_NAMES.D} começa Defensor na Lotus` },
    ],
  },
  {
    id: 3,
    day: "Sábado",
    time: "15:00",
    teamA: "Vencedor SF1",
    teamB: "Vencedor SF2",
    teamAName: "Vencedor SF1",
    teamBName: "Vencedor SF2",
    format: "BO5",
    vetoLog: [],
  },
];