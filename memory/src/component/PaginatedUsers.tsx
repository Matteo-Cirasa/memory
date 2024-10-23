import { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { UserData } from '../map';
import { Container, Table, Button, Loader, Text, Group, Avatar, ScrollArea } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setSelectedGameTitle, setSelectedDifficulty } from '../redux/sessionSlice';

// Define the GraphQL query
const GET_USERS = gql`
  query GetUsers($offset: Int!, $limit: Int!) {
    allUsers(offset: $offset, limit: $limit) {
      id
      name
      avatar
      date
    }
  }
`;

function PaginatedUsers() {
  // Hook per accedere al dispatcher e allo stato di Redux
  const dispatch = useDispatch();
  const selectedTitle = useSelector((state: RootState) => state.counter.selectedGameTitle);
  const selectedDifficulty = useSelector((state: RootState) => state.counter.selectedDifficulty);

  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);

  const { loading, error, data } = useQuery(GET_USERS, {
    variables: {
      offset,
      limit,
    },
  });

  useEffect(() => {
    const savedDifficulty = localStorage.getItem('selectedDifficulty');
    if (savedDifficulty) {
      dispatch(setSelectedDifficulty(parseInt(savedDifficulty)));
    }
  }, [dispatch]);

  if (loading) return <Loader />;
  if (error) return <Text>Error: {error.message}</Text>;

  const rows = data.allUsers.map(({ id, name, avatar, date }: UserData) => (
    <Table.Tr key={id}>
      <Table.Td>
        <Group gap="sm">
          <Avatar size={26} src={avatar} radius={26} />
          <Text size="sm" fw={500}>{name}</Text>
        </Group>
      </Table.Td>
      <Table.Td>{date}</Table.Td>
      <Table.Td>{selectedDifficulty}</Table.Td>
      <Table.Td>{selectedTitle}</Table.Td> {/* Mostra il titolo selezionato */}
    </Table.Tr>
  ));

  const handleNext = () => setOffset((prev) => prev + limit);
  const handlePrevious = () => setOffset((prev) => Math.max(prev - limit, 0));

  return (
    <Container>
      <ScrollArea>
        <Table miw={800} verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Utente</Table.Th>
              <Table.Th>Data</Table.Th>
              <Table.Th>Difficoltà</Table.Th>
              <Table.Th>Titolo Gioco</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </ScrollArea>
      <Group mt="md">
        <Button onClick={handlePrevious} disabled={offset === 0}>
          Precedente
        </Button>
        <Button onClick={handleNext} ml="sm">
          Prossima
        </Button>
      </Group>
    </Container>
  );
}

export default PaginatedUsers;
