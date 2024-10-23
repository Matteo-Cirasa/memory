import { Container, Button, Text, Stack, Center, Box } from '@mantine/core';
import PaginatedUsers from './PaginatedUsers';

type RankingProps= {
  onChangeRoute: (route: { active: any; route: string }) => void;
  engine: { active: any };
  nickname?: string;
  score?: number;
}

const Ranking = ({ onChangeRoute, engine, nickname, score }: RankingProps) => {
  return (
    <Container size="sm" style={{ padding: '20px' }}>
      <Center>
        <Stack align="center">
          <Box p="lg">
            <Text size="xl" mb="md">
              Classifica
            </Text>
            {nickname && score !== undefined ? (
              <Stack>
                 <Text size="md">
                  Nickname: {nickname}
                </Text>
                <Text size="md">
                  Punteggio: {score}
                </Text>
              </Stack>
            ) : (
              <Text size="sm" >
              </Text>
            )}
          </Box>

          <Button
            onClick={() => onChangeRoute({ active: engine.active, route: 'welcome' })}
            color="blue"
            size="md"
          >
            Torna alla home
          </Button>
          <PaginatedUsers/>
        </Stack>
      </Center>
    </Container>
  );
};

export default Ranking;
