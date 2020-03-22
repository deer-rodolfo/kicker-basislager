import React, { createContext, useContext, ReactNode } from "react";
import { usePlayers } from "../hooks";

type Props = {
  children: ReactNode;
};

export const PlayersContext = createContext({});
export const PlayersProvider = ({ children }: Props) => {
  const { players, setPlayers } = usePlayers();

  return (
    <PlayersContext.Provider value={{ players, setPlayers }}>
      {children}
    </PlayersContext.Provider>
  );
};

export const usePlayersValue = () => useContext(PlayersContext);
