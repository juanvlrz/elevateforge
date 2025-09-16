
import React, { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { players as initialPlayers, matches, VOTING_START_DATE } from './constants';
import type { Player, ValorantMap } from './types';
import { supabase } from './lib/supabaseClient';

// Lazy-load section components to split code and improve initial load time.
// The JavaScript for each tab will only be fetched when the user navigates to it.
const VotingSection = lazy(() => import('./components/VotingSection').then(module => ({ default: module.VotingSection })));
const BracketSection = lazy(() => import('./components/BracketSection').then(module => ({ default: module.BracketSection })));
const MapVetoSection = lazy(() => import('./components/MapVetoSection').then(module => ({ default: module.MapVetoSection })));
const StreamSection = lazy(() => import('./components/StreamSection').then(module => ({ default: module.StreamSection })));
const ScheduleSection = lazy(() => import('./components/ScheduleSection').then(module => ({ default: module.ScheduleSection })));

type Tab = 'vote' | 'bracket' | 'live';

const App: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [hasVoted, setHasVoted] = useState(false);
  const [totalVotes, setTotalVotes] = useState(0);
  const [valorantMaps, setValorantMaps] = useState<ValorantMap[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>('vote');
  const [displayTab, setDisplayTab] = useState<Tab>('vote');
  const [isAnimating, setIsAnimating] = useState(false);
  const [isContentLoaded, setIsContentLoaded] = useState(false); // For initial load animation
  const [backendError, setBackendError] = useState<string | null>(null);
  const [isVotingOpen, setIsVotingOpen] = useState(() => new Date() >= new Date(VOTING_START_DATE));
  const [isLoadingPlayers, setIsLoadingPlayers] = useState(true);

  // Effect for managing voting timer
  useEffect(() => {
    // If voting is already open when the component mounts, do nothing.
    if (isVotingOpen) {
      return;
    }

    // Set up a timer to check when voting should open.
    const timerId = setInterval(() => {
      if (new Date() >= new Date(VOTING_START_DATE)) {
        setIsVotingOpen(true);
        clearInterval(timerId); // Stop the timer once voting is open.
      }
    }, 1000);

    // Clean up the timer if the component unmounts before voting opens.
    return () => clearInterval(timerId);
  }, [isVotingOpen]); // This effect depends on isVotingOpen to avoid setting a new timer after it opens.

  useEffect(() => {
    // Trigger initial content animation
    const timer = setTimeout(() => {
      setIsContentLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);


  useEffect(() => {
    // Fetch map data from Valorant API
    const fetchMaps = async () => {
      try {
        const response = await fetch('https://valorant-api.com/v1/maps');
        const data = await response.json();
        if (data.status === 200) {
          setValorantMaps(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch Valorant maps:", error);
      }
    };
    fetchMaps();

    // Check local storage to see if user has already voted
    if (localStorage.getItem('elevate-forge-voted')) {
      setHasVoted(true);
    }

    // Fetch initial player data from Supabase, but merge with local data
    const fetchPlayers = async () => {
        try {
            const { data, error } = await supabase
                .from('players')
                .select('id, votes'); // Fetch only dynamic data
            
            if (error) {
                throw error;
            }
            
            // FIX: Explicitly type playersFromDB to prevent it from being inferred as `never[]`
            // when `data` is null. This resolves errors on `p.id` and `dbPlayer.votes`.
            const playersFromDB: Pick<Player, 'id' | 'votes'>[] = data || [];

            // Merge local static data with dynamic votes from the database
            const mergedPlayers = initialPlayers.map(localPlayer => {
                const dbPlayer = playersFromDB.find(p => p.id === localPlayer.id);
                return {
                    ...localPlayer,
                    votes: dbPlayer ? dbPlayer.votes : 0, // Use DB votes, fallback to 0
                };
            });

            setPlayers(mergedPlayers);
            setTotalVotes(mergedPlayers.reduce((sum, p) => sum + p.votes, 0));

        } catch (error: any) {
            console.error("Error fetching players. Full error object:", error);
            if (error.message) {
              console.error("Error message:", error.message);
            }
            
            let errorMessage = 'Não foi possível buscar os dados dos jogadores. Os dados exibidos podem estar desatualizados.';
            
            if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
                errorMessage = 'Erro de rede ao buscar jogadores. Isso pode ser um problema de conexão com a internet ou uma configuração de CORS incorreta no Supabase. Por favor, verifique se a URL deste site está liberada nas configurações de CORS do seu projeto Supabase.';
            } else if (error.message) {
                errorMessage = `Erro do Supabase: ${error.message}. Verifique as permissões da sua tabela (RLS).`;
            }
        
            setBackendError(errorMessage);
            
            console.warn("Falling back to initial player data due to fetch error.");
            // Fallback uses local data with 0 votes
            const fallbackPlayers = initialPlayers.map(p => ({...p, votes: 0}));
            setPlayers(fallbackPlayers);
            setTotalVotes(0);
        } finally {
            setIsLoadingPlayers(false);
        }
    };
    
    fetchPlayers();

    // Set up Supabase realtime subscription
    const channel = supabase
        .channel('player_votes')
        .on(
            'postgres_changes',
            { event: 'UPDATE', schema: 'public', table: 'players' },
            (payload) => {
                const updatedPlayerFromDB = payload.new as Player;
                setPlayers(currentPlayers => {
                    // Update only the votes, preserving local static data (name, avatar, etc.)
                    const newPlayers = currentPlayers.map(p =>
                        p.id === updatedPlayerFromDB.id 
                            ? { ...p, votes: updatedPlayerFromDB.votes } 
                            : p
                    );
                    const newTotalVotes = newPlayers.reduce((sum, player) => sum + player.votes, 0);
                    setTotalVotes(newTotalVotes);
                    return newPlayers;
                });
            }
        )
        .subscribe((status, err) => {
            if (err) {
                console.error('Supabase subscription error:', err);
                setBackendError('A conexão em tempo real falhou. As atualizações de votos não serão exibidas ao vivo.');
            }
        });

    return () => {
        supabase.removeChannel(channel);
    };
    
  }, []);

  const handleVote = useCallback(async (playerId: number) => {
    if (hasVoted || !isVotingOpen) return;

    const originalPlayers = players;
    const originalTotalVotes = totalVotes;

    // Optimistic Update: Update UI immediately for a better user experience.
    setHasVoted(true);
    localStorage.setItem('elevate-forge-voted', 'true');
    
    const newPlayers = players.map(p => 
      p.id === playerId ? { ...p, votes: p.votes + 1 } : p
    );
    setPlayers(newPlayers);
    setTotalVotes(originalTotalVotes + 1);

    const { error } = await supabase.functions.invoke('vote', {
        body: { playerId },
    });

    if (error) {
        console.error("Error invoking vote function. Full error object:", error);
        
        // Revert UI state because the vote failed.
        setHasVoted(false);
        localStorage.removeItem('elevate-forge-voted');
        setPlayers(originalPlayers);
        setTotalVotes(originalTotalVotes);
        
        let alertMessage = 'Ocorreu um erro ao registrar seu voto. Tente novamente.';
        
        // The error object from supabase.functions.invoke is a FunctionsError.
        // If it's a FunctionsHttpError, the original Response is in the `context` property.
        // We must asynchronously parse the response body to get our custom error message.
        if (error.name === 'FunctionsHttpError') {
            try {
                // The context contains the raw fetch Response.
                const errorBody = await (error as any).context.json();
                if (errorBody && typeof errorBody.error === 'string') {
                    alertMessage = errorBody.error;
                }
            } catch (e) {
                console.error("Could not parse JSON from error response:", e);
                // Fallback to the generic message if parsing fails.
                alertMessage = `Erro na função de voto: ${error.message}`;
            }
        } else if (error.name === 'FunctionsRelayError') {
             alertMessage = 'Erro de rede ao contatar a função. Verifique sua conexão com a internet.';
        }
        else {
            // For other unexpected errors.
            alertMessage = `Erro na função de voto: ${error.message}`;
        }
        
        alert(alertMessage);
    }
    // If there's no error, the optimistic update is confirmed. The realtime subscription 
    // will eventually sync the definitive state from the server.
  }, [hasVoted, players, totalVotes, isVotingOpen]);

  const handleTabChange = useCallback((newTab: Tab) => {
    if (newTab !== activeTab && !isAnimating) {
      setActiveTab(newTab);
      setIsAnimating(true);
    }
  }, [activeTab, isAnimating]);

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setDisplayTab(activeTab);
        setIsAnimating(false);
      }, 500); // This should match the transition duration
      return () => clearTimeout(timer);
    }
  }, [isAnimating, activeTab]);

  const renderContent = () => {
    switch (displayTab) {
      case 'vote':
        return <VotingSection players={players} handleVote={handleVote} hasVoted={hasVoted} totalVotes={totalVotes} backendError={backendError} isVotingOpen={isVotingOpen} isLoadingPlayers={isLoadingPlayers} />;
      case 'bracket':
        return <BracketSection matches={matches} />;
      case 'live':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-12">
              <MapVetoSection matches={matches} valorantMaps={valorantMaps} />
            </div>
            <div className="lg:col-span-1 space-y-8">
              <StreamSection />
              <ScheduleSection matches={matches} />
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  
  const suspenseFallback = (
    <div 
        className="flex flex-col items-center justify-center min-h-[50vh]"
        aria-live="polite" 
        aria-busy="true"
    >
        <div 
            className="w-12 h-12 border-4 border-solid rounded-full animate-spin"
            style={{ borderColor: 'var(--color-border)', borderTopColor: 'var(--color-primary)' }}
            role="status"
        >
            <span className="sr-only">Carregando...</span>
        </div>
        <p className="mt-4 font-heading text-lg text-text-secondary tracking-wider">
            Preparando conteúdo...
        </p>
    </div>
  );

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="border-b border-border-primary">
          <nav className="-mb-px flex space-x-2" aria-label="Tabs">
             {['vote', 'live', 'bracket'].map(tab => (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab as Tab)}
                  className={`relative font-heading font-semibold text-lg uppercase tracking-wider py-4 px-6 transition-colors duration-300 group outline-none ${
                    activeTab === tab
                      ? 'text-primary'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <span className="relative z-10">
                    {tab === 'vote' && 'Votação'}
                    {tab === 'live' && 'Ao Vivo'}
                    {tab === 'bracket' && 'Chave'}
                  </span>
                  {activeTab === tab && (
                    <span 
                      className="absolute bottom-0 left-0 w-full h-1 bg-primary"
                      style={{
                        boxShadow: '0 0 20px var(--color-primary-glow), 0 0 10px var(--color-primary)',
                        clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 0 100%)'
                      }}
                    ></span>
                  )}
                </button>
             ))}
          </nav>
        </div>
        
        <div className={`mt-12 transition-all duration-500 ease-out ${
            (!isContentLoaded || isAnimating) ? 'opacity-0 translate-y-5' : 'opacity-100 translate-y-0'
          }`}>
          <Suspense fallback={suspenseFallback}>
            {renderContent()}
          </Suspense>
        </div>

      </main>
      <Footer />
    </div>
  );
};

export default App;
