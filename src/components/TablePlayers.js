import React from "react";
// import { usePlayers } from "../hooks";

export const TablePlayers = () => {
  // const { players } = usePlayers();

  return players.map(player => <p key={player.playerId}>{player.name}</p>);
};

// For debuging
const players = [
  {
    playerId: "1",
    name: "Rodolfo",
    wins: 0,
    loses: 5,
    game: 5
  },
  {
    playerId: "2",
    name: "Mihai",
    wins: 3,
    loses: 2,
    game: 5
  },
  {
    playerId: "3",
    name: "Marcus",
    wins: 3,
    loses: 2,
    game: 5
  },
  {
    playerId: "4",
    name: "Fried",
    wins: 4,
    loses: 1,
    game: 5
  }
];
