import { useState, createContext } from "react";

interface AppContextInterface {
    settings: {
        gameOptions: GameOptionsInterface;
        handleSettings?: (key: string, value: string) => void;
    };
}

interface GameOptionsInterface {
    amount: string;
    category: string;
    difficulty: string;
    type: string;
}

const defaultGameOptions: GameOptionsInterface = {
    amount: "5",
    category: "0",
    difficulty: "easy",
    type: "multiple",
};

const defaultState: AppContextInterface = {
    settings: {
        gameOptions: defaultGameOptions,
    },
};

const AppContext: React.Context<AppContextInterface> =
    createContext<AppContextInterface>(defaultState);

export const AppProvider: React.FC<{ children?: React.ReactNode }> = ({
    children,
}): JSX.Element => {
    const [gameOptions, setGameOptions] =
        useState<GameOptionsInterface>(defaultGameOptions);

    const handleSettings = (key: string, value: string) => {
        setGameOptions((prevGameOptions) => ({
            ...prevGameOptions,
            [key]: value,
        }));
    };

    const value = {
        settings: {
            gameOptions,
            handleSettings,
        },
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
