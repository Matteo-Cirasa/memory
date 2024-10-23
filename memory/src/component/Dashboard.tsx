import { useState } from 'react';
import { AppRouterType, CardData } from '../map';
import { setConfig } from '../engine/config';
import { Container, Button, Text, Box, Grid, Image, ButtonGroup } from '@mantine/core';
import { srci } from '../engine/core';
import { useDispatch } from 'react-redux';

const getTopPlayers = () => {
  // Funzione per ottenere i top 5 giocatori e i loro punteggi
  return [
    { name: 'Giocatore1', score: 140 },
    { name: 'Giocatore2', score: 120 },
    { name: 'Giocatore3', score: 100 },
    { name: 'Giocatore4', score: 80 },
    { name: 'Giocatore5', score: 60 }
  ];
};

const Dashboard = ({ onChangeRoute, engine }: AppRouterType) => {
  //Hook per accedere al dispatcher di Redux
  const dispatch = useDispatch();

  // Estrazione delle informazioni del gioco attivo
  const game = engine.active as CardData;
  const mm = [game.decks[0], game.decks[game.decks.length - 1]];

  // Stato locale per la difficoltà selezionata
  const [selectedDifficulty, setSelectedDifficultyState] = useState<number>(mm[0]);

  // Funzione per aggiornare la difficoltà selezionata
  const setSelectedDifficulty = (difficulty: number) => {
    // Aggiorna lo stato locale
    setSelectedDifficultyState(difficulty);
    // Dispatch l'azione per aggiornare la difficoltà nello stato globale
    dispatch(setSelectedDifficulty(difficulty));
  };

  // Funzione chiamata quando l'utente clicca sul pulsante "Inizia"
  const handleCardClick = () => {
    // Verifica che una difficoltà sia stata selezionata
    if (selectedDifficulty === null) return;

    // Configura il gioco con i parametri selezionati
    setConfig({
      ext: '.png',
      path: game.images.src,
      backCard: game?.backCard,
      cardLevel: selectedDifficulty,
      ptCheck: 10,
      ptError: 2,
    });

    // Cambia la rotta a "memory" passando i dati selezionati
    onChangeRoute({
      active: { ...game, selectedDeck: selectedDifficulty, images: game.images },
      route: 'memory',
    });
  };

  // Ottieni i top 5 giocatori
  const topPlayers = getTopPlayers();

  return (
    <>
      <div
        className="background-fake"
        style={{ backgroundImage: `url(${srci("cover", game?.images)})` }}
      ></div>
      <Container className="background-hover">
        <Grid>
          <Grid.Col span={{ base: 6, sm: 6, md: 4, lg: 3 }} className="card-preview-cont">
            <Image
              className="card-preview"
              src={srci('preview', game?.images)}
              alt={game?.title}
            />
            <Text mt="xs" size="xs">Carte mazzo da {mm[0]} a {mm[1]}</Text>
            <Text mb="xs" size="xs">{game?.publishDate}</Text>
            <Text size="xs">Seleziona il deck</Text>
            <ButtonGroup>
              {game?.decks.map(deck => (
                <Button
                  fullWidth
                  size="compact-xs"
                  variant={selectedDifficulty === deck ? 'filled' : 'outline'}
                  color={selectedDifficulty === deck ? 'cyan' : 'grey'}
                  key={deck}
                  onClick={() => setSelectedDifficulty(deck)}
                >
                  {deck} carte
                </Button>
              ))}
            </ButtonGroup>
            <Button
              size="md"
              fullWidth
              mt="sm"
              onClick={handleCardClick}
            >
              Inizia
            </Button>
            <Button
              variant='transparent'
              size="compact-xs"
              fullWidth
              mt="xs"
              onClick={() => onChangeRoute({
                active: engine.active,
                route: 'welcome',
              })}
            >
              Torna alla Welcome
            </Button>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6, md: 8, lg: 9 }}>
            <Box className="background-vspace">
              <Text className="partite-giocate">Partite giocate: 0</Text>
            </Box>
            <Box className="background-vspace2">
              <Text className="dashTitle" size="xl">{game?.title}</Text>
              <Text size="sm">{game?.description}</Text>
            </Box>
            <Box className="background-vspace2">
              <Text size="lg">Classifica Top 5 Giocatori</Text>
              <ul>
                {topPlayers.map((player, index) => (
                  <li key={index}>
                    <Text size="sm">{index + 1}. {player.name} - {player.score} punti</Text>
                  </li>
                ))}
              </ul>
            </Box>
          </Grid.Col>
        </Grid>
      </Container>
    </>
  );
};

export default Dashboard;
