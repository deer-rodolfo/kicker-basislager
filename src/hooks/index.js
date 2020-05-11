import { useState, useEffect } from "react";
import { firebase } from "../firebase";

const playerPoints = (wins, loses) => {
  return Math.floor(wins * 3 - loses * 2);
};

const winRatio = (wins, loses) => {
  const games = wins + loses;
  return games ? Math.floor((wins / games) * 100) : 0;
};

export const usePlayers = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("players")
      .get()
      .then((snapshot) => {
        const allPlayers = snapshot.docs.map((player) => ({
          id: player.id,
          games: player.data().wins + player.data().loses,
          winRatio: winRatio(player.data().wins, player.data().loses),
          points: playerPoints(player.data().wins, player.data().loses),
          ...player.data(),
        }));
        if (JSON.stringify(allPlayers) !== JSON.stringify(players)) {
          setPlayers(allPlayers);
        }
      });
    //.catch((error) => console.log(error));
  }, [players]);

  return { players, setPlayers };
};
