import { useEffect, useState } from "react";
import { getConfig } from "../engine/config";
import { CardProp } from "../map";
import { Grid } from "@mantine/core";
import Sounds from '../sounds';

type statusType = {
  current: string,
  last: string,
};

export default function Card({ discovery, id, value, selected, locked, onClick }: CardProp) {
  const cnf = getConfig();
  const [status, setStatus] = useState<statusType>({
    current: 'inactive',
    last: '',
  });

  const img = cnf.path + value + cnf.ext;
  const backCard = cnf.path + cnf.backCard + cnf.ext;
  const source = status.current !== 'inactive' ? img : backCard;
  const cardClass = `card card-` + status.current + (discovery ? ' discovery-in' : '');

  // Gestire l'animazione della carta quando viene selezionata o deselezionata
  useEffect(() => {
    if (!selected && (status.current === 'active' || status.current === 'inactive-on')) {
      setStatus({ ...status, current: 'error-engine', last: 'active' });
      Sounds.error.play(); // Suono di errore
    }
  }, [selected]);

  useEffect(() => {
    if (discovery) {
      setStatus({ ...status, current: 'discovery', last: 'active' });
      Sounds.success.play(); // Suono di successo
    }
  }, [discovery]);

  // Gestisce le transizioni di stato dopo che un'animazione è completata
  const onAnimationController = () => {
    if (status.current === 'inactive-on') {
      setStatus({
        current: 'active',
        last: 'inactive',
      });
      onClick();
    } else if (status.current === 'inactive-off') {
      setStatus({
        current: 'inactive',
        last: 'active',
      });
    } else if (status.current === 'active-off') {
      setStatus({
        current: 'inactive',
        last: 'active-off',
      });
    } else if (status.current === 'error') {
      setStatus({
        current: status.last,
        last: status.current,
      });
    } else if (status.current === 'error-engine') {
      setStatus({
        current: 'inactive-off',
        last: status.current,
      });
    } else if (status.current === 'discovery') {
      setStatus({
        current: 'active',
        last: 'discovery',
      });
    }
  };

  // Gestisce l'evento di clic sulla carta
  const onClickProxy = () => {
    if (locked) {
      return;
    }
    Sounds.cardClic.play(); // Suono di clic
    if (status.current === 'active' || status.current === 'discovery') {
      setStatus({
        current: 'error',
        last: status.current,
      });
      return;
    } else if (status.current === 'inactive') {
      setStatus({
        current: 'inactive-on',
        last: status.current,
      });
    } else if (status.current === 'inactive-on') {
      setStatus({
        current: 'inactive',
        last: status.current,
      });
    }
  };

  return (
    <Grid.Col span={{ base: 2, sm: 2, md: 2, lg: 2}}>
      <div className={cardClass} onClick={onClickProxy} onAnimationEnd={onAnimationController}>
        <img src={source} alt={'backCard'} />
      </div>
    </Grid.Col>
  );
}
