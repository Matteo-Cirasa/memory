import { Grid, Button, Text } from "@mantine/core";
import { getConfig } from "../engine/config";
import { GameStatusType } from "../map";

type ToolbarProps = {
    gamestatus: GameStatusType;
    onReset: () => void;
    onExit: () => void;
};

export default function Toolbar({ gamestatus, onReset, onExit }: ToolbarProps) {
    const config = getConfig();
    const ptlow = gamestatus.moves * config.ptError;
    const ptcheck = gamestatus.ids.length * config.ptCheck;
    const point = ptcheck - ptlow;
    const activePairs = gamestatus.ids.length / 2;

    return (
        <Grid 
            className="toolbar-header" 
            columns={12}
            style={{ minHeight: 80, color: 'white' }} // Imposta altezza minima e colore del testo
        >
            <Grid.Col span={6}>
                <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                    <Text size="sm" style={{ marginRight: 20 }}>Coppie: {activePairs} / {config.cardLevel}</Text>
                    <Text size="sm" style={{ marginRight: 20 }}>Mosse: {gamestatus.moves}</Text>
                    <Text size="sm">Punteggio: {point}</Text>
                </div>
            </Grid.Col>
            <Grid.Col span={6}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height: '100%' }}>
                    <Button 
                        className="toolbar-button" 
                        onClick={onReset}
                        style={{ marginLeft: 10 }}
                    >
                        Reset
                    </Button>
                    <Button 
                        className="toolbar-button" 
                        onClick={onExit}
                        style={{ marginLeft: 10 }}
                    >
                        Esci
                    </Button>
                </div>
            </Grid.Col>
        </Grid>
    );
}
