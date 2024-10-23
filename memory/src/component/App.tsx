import { useState } from 'react';
import Ranking from './Ranking';
import GameOver from './GameOver';
import Welcome from './Welcome';
import Dashboard from './Dashboard';
import Memory from './Memory';
import { EngineCtrlType } from '../map';
import '@mantine/core/styles.css';

function Game() {
    const [mode, setMode] = useState<EngineCtrlType>({ route: 'welcome', active: null });
    const [nickname, setNickname] = useState<string | undefined>(undefined);
    const [score, setScore] = useState<number | undefined>(undefined);

// Funzione per gestire i cambiamenti di rotta
const handleRouteChange = (args: { active: any; route: string; nickname?: string; score?: number }) => {
    if (args.route === 'ranking') {
      setNickname(args.nickname);
      setScore(args.score);
    }
    setMode({ ...args, active: args.active });
  };
  
    return (
        <>
            {mode.route === 'welcome' && <Welcome onChangeRoute={handleRouteChange} engine={mode} />}
            {mode.route === 'memory' && <Memory onChangeRoute={handleRouteChange} engine={mode} />}
            {mode.route === 'gameover' && <GameOver onChangeRoute={handleRouteChange} engine={mode} result={mode.result} score={score ?? 0} />}
            {mode.route === 'ranking' && <Ranking onChangeRoute={handleRouteChange} engine={mode} nickname={nickname} score={score} />}
            {mode.route === 'dashboard' && <Dashboard onChangeRoute={handleRouteChange} engine={mode} />}
        </>
    );
}

export default Game;