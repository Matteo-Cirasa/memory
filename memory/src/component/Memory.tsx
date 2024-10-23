import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, Progress, Text } from '@mantine/core';
import { shuffle } from '../engine/core';
import Toolbar from './Toolbar';
import GameOver from './GameOver';
import { setScore, setMoves } from '../redux/sessionSlice';
import { CardDataProps, GameStatusType } from '../map';
import Card from './Card';
import Sounds from '../sounds';
import { RootState } from '../redux/store';

type MemoryProps = {
  onChangeRoute: (args: { active: any; route: string }) => void;
  engine: { active: { selectedDeck: number; images: { [key: string]: string } } };
}

function Memory({ onChangeRoute, engine }: MemoryProps) {
  const dispatch = useDispatch();
  const [cards, setCards] = useState<CardDataProps[]>([]);
  const [reset, setReset] = useState<number>(0);
  const [gs, setGameStatus] = useState<GameStatusType>({
    score: 0,
    moves: 0,
    last: null,
    current: null,
    ids: [],
    locked: false,
    gameOver: false,
  });
  const [timer, setTimer] = useState<number>(60);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [showGameOver, setShowGameOver] = useState<boolean>(false);
  const [gameResult, setGameResult] = useState<'win' | 'lose' | null>(null);
  const selectedDeck = engine.active.selectedDeck;
  const images = engine.active.images;

  const score = useSelector((state: RootState) => state.counter.score);
  const moves = useSelector((state: RootState) => state.counter.moves);


  // Funzione per fermare il timer
  const stopTimer = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  // Funzione per resettare il timer
  const resetTimer = () => {
    stopTimer();
    setTimer(60);
    const id = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          stopTimer();
          setShowGameOver(true);
          setGameResult('lose');
          Sounds.error.play();
          return 0;
        }
        if ((prev - 1) % 10 === 0) {
          Sounds.bip.play();
        }
        if (prev <= 4 && prev > 1) {
          Sounds.countdown.play();
        }
        return prev - 1;
      });
    }, 1000);
    setIntervalId(id);
  };

  useEffect(() => {
    const newCards = shuffle(selectedDeck);
    setCards(newCards);
    setGameStatus({
      score: 0,
      moves: 0,
      last: null,
      current: null,
      ids: [],
      locked: false,
      gameOver: false,
    });
    Sounds.backgroundMusic.play();
    resetTimer();

    return () => stopTimer();
  }, [reset]);

  useEffect(() => {
    if (gs.current === null || gs.last === null) {
      return;
    }

    if (gs.current.value === gs.last.value) {
      // Le carte selezionate corrispondono
      const newIds = gs.ids.concat([Number(gs.current.id), Number(gs.last.id)]);
      if (cards.length === newIds.length) {
        // Gioco vinto
        stopTimer();
        setGameResult('win');
        setShowGameOver(true);
        Sounds.victory.play();
        Sounds.gong.play();
      } else {
        const newScore = gs.score + 6; // Incrementa il punteggio
        dispatch(setScore(newScore)); // Dispatch l'azione per aggiornare il punteggio
        dispatch(setMoves(gs.moves + 1)); // Dispatch l'azione per aggiornare il numero di mosse

        setGameStatus(prevStatus => ({
          ...prevStatus,
          locked: false,
          last: null,
          current: null,
          ids: newIds,
          score: newScore,
          moves: prevStatus.moves + 1,
        }));
        resetTimer();
      }
    } else {
      Sounds.error.play();
      const newScore = gs.score - 2; // Decrementa il punteggio
      dispatch(setScore(newScore)); // Dispatch l'azione per aggiornare il punteggio
      dispatch(setMoves(gs.moves + 1)); // Dispatch l'azione per aggiornare il numero di mosse

      setGameStatus(prevStatus => ({
        ...prevStatus,
        locked: false,
        last: null,
        current: null,
        score: newScore,
        moves: prevStatus.moves + 1,
      }));
    }
  }, [gs]);

  const cardClick = (selected: CardDataProps) => {
    if (gs.last === null) {
      setGameStatus({ ...gs, last: selected });
    } else {
      setGameStatus({ ...gs, current: selected, locked: true });
    }
  };

  const point = gs.score; // Usa il punteggio calcolato in GameStatus

  return (
    <div className="memory-container">
      <Toolbar
        gamestatus={gs}
        point={point}
        onReset={() => {
          setReset(reset + 1);
          resetTimer();
        }}
        onExit={() => onChangeRoute({
          active: engine.active,
          route: 'dashboard',
        })}
      />
      <Container fluid>
        <div className="timer" style={{ color: 'white', marginBottom: '10px' }}>
          <Text size="md">Tempo rimasto: {timer} secondi</Text>
        </div>
        <Progress
          value={(timer / 60) * 100}
          color="green"
          style={{ marginBottom: '20px' }}
        />
        <Grid>
          {cards.map((card) => {
            const act = gs.ids.includes(Number(card.id));
            const crt = gs.current?.id === card.id;
            const lst = gs.last?.id === card.id;
            return (
              <Card
                key={card.id}
                id={card.id}
                value={card.value}
                selected={act || crt || lst}
                discovery={act}
                locked={gs.locked}
                onClick={() => cardClick(card)}
              />
            );
          })}
        </Grid>
        {showGameOver && (
          <GameOver
            onChangeRoute={onChangeRoute}
            engine={engine}
            result={gameResult}
            score={point}
          />
        )}
      </Container>
    </div>
  );
}

export default Memory;
