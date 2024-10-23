import{ useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { Button, Text, TextInput, Box } from '@mantine/core';
import { EngineCtrlType } from '../map';

interface GameOverProps {
  onChangeRoute: (route: { active: any; route: string; nickname?: string; score?: number }) => void;
  engine: EngineCtrlType;
  result: 'win' | 'lose' | null;
  score: number;
}

const GameOver = ({ onChangeRoute, engine, result, score }: GameOverProps) => {
  const [showConfetti, setShowConfetti] = useState(true);
  const [showResult, setShowResult] = useState(false);
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    const confettiTimer = setTimeout(() => {
      setShowConfetti(false);
      setShowResult(true);
    }, 3000);

    return () => clearTimeout(confettiTimer);
  }, [engine.active]);

  const handleSubmit = () => {
    if (nickname.trim() === '') {
      alert('Inserisci il tuo nickname');
      return;
    }

    onChangeRoute({
      active: engine.active,
      route: 'ranking',
      nickname: nickname,
      score: score,
    });
  };

  return (
    <div className="game-over-overlay">
      {showConfetti && result === 'win' && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}
      <Box className={`game-over-content ${showResult ? 'fade-in' : 'fade-out'}`}>
        {showResult && (
          <>
            {result === 'win' ? (
              <>
                <Text size="xl">Congratulazioni!</Text>
                <Text size="lg">Punteggio: {score}</Text>
              </>
            ) : (
              <Text size="xl">Game Over</Text>
            )}
            <TextInput
              label="Inserisci il tuo nickname"
              value={nickname}
              onChange={(event) => setNickname(event.currentTarget.value)}
              placeholder="Nickname"
              mt="md"
            />
            <Button mt="md" onClick={handleSubmit}>
              Invia e vedi la classifica
            </Button>
          </>
        )}
      </Box>
    </div>
  );
};

export default GameOver;
