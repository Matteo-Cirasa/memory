type CardProp = {
    id: number,
    selected: boolean,
    onClick: () => void,
    value: string,
    locked: boolean,
    discovery: boolean,
}

type CardDataProps = {
    id: number,
    selected: boolean,
    inactive: boolean,
    discovery: boolean,
    status: string,
    value: string,
}

type ConfigType = {
    path: string,
    ext: string,
    backCard: string,
    cardLevel: number,
    ptError: number,
    ptCheck: number,
}

type GameStatusType = {
    score: number,
    moves: number,
    last: null | CardDataProps,
    current: null | CardDataProps,
    ids: number[],
    locked: boolean,
    gameOver: boolean,
}

type AppRouterType = {
    onChangeRoute: (route: EngineCtrlType) => void,
    engine: EngineCtrlType,
}

type CardDataImage = {
    src: string,
    preview: string,
    cover: string;
}

type CardData = {
    imageSrc: string,
    title: string,
    description: string,
    src: string,
    cover: string,
    titleDashboard: string,
    color: string,
    misc: string,
    images: CardDataImage,
    pk: string,
    decks: number[],
    publishDate: string,
    selectedDeck: number,
    backCard: string,
    id: string,
    difficulty: string,
};

type UserData = {
    id: string;
    name: string;
    avatar: string;
    date: string;
};

type EngineCtrlType = {
    route: string;
    active: CardData | null;
}

export type {
    CardProp,
    CardDataProps,
    ConfigType,
    GameStatusType,
    AppRouterType,
    CardData,
    EngineCtrlType,
    CardDataImage,
    UserData,
}