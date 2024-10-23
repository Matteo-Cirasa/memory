import { useEffect, useState } from 'react';
import { Container, Card, Text, Button, Grid, Image } from '@mantine/core';
import { AppRouterType, CardData } from '../map';
import { srci } from '../engine/core';
import { useDispatch } from 'react-redux';
import { setSelectedGameTitle } from '../redux/sessionSlice';

// Recupera i dati delle card dal file JSON
const fetchCardData = async () => {
  const response = await fetch("/data/data.json");
  const json = await response.json();
  return json.games as CardData[];
};

const WelcomeHeader = () => (
  <Container className="welcome-header" m="lg">
  </Container>
);

type CardItemType = {
  preview: string,
  title: string,
  misc: string,
  pk: string,
  onButtonClick: () => void,
}

const CardItem = ({ preview, misc, title, onButtonClick }: CardItemType) => {
  return (
    <Card className="welcome-card" shadow="sm" radius="lg" withBorder>
      <Card.Section>
        <Image src={preview} height={160} alt={title} />
      </Card.Section>
      <Text size="lg" className="card-title-game">{title}</Text>
      <Text size="sm" mb="md">{misc}</Text>
      <Button color="red" size="xs" radius="lg" onClick={onButtonClick}>
        Avvia
      </Button>
    </Card>
  );
};

const Welcome = ({ onChangeRoute }: AppRouterType) => {
  const [cardData, setCardData] = useState<CardData[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchCardData();
      setCardData(data);
    };

    loadData();
  }, []);

  const handleButtonClick = (index: number) => {
    const selectedGame = cardData[index];
    const { title } = selectedGame;

    // Usa Redux per salvare il titolo del gioco selezionato
    dispatch(setSelectedGameTitle(title));

    onChangeRoute({
      active: selectedGame,
      route: 'dashboard',
    });
  };

  return (
    <>
      <WelcomeHeader />
      <Container fluid className="card-container">
        <Grid gutter="md">
          {cardData.map((card, index) => (
            <Grid.Col key={card.pk} span={{ base: 12, sm: 4, md: 3, lg: 3 }} style={{ display: 'flex', justifyContent: 'center' }}>
              <CardItem
                pk={card.pk}
                title={card.title}
                misc={card.misc}
                preview={srci("game-preview", card.images)} // Recupera l'immagine di anteprima
                onButtonClick={() => handleButtonClick(index)} // Passa l'indice della card selezionata
              />
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Welcome;