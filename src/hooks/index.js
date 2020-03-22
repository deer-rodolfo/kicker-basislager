import { useState, useEffect } from "react";
import { firebase } from "../firebase";

export const usePlayers = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("players")
      .get()
      .then(snapshot => {
        const allPlayers = snapshot.docs.map(player => ({
          id: player.id,
          games: player.data().wins + player.data().loses,
          ...player.data()
        }));
        if (JSON.stringify(allPlayers) !== JSON.stringify(players)) {
          setPlayers(allPlayers);
        }
      })
      .catch(error => console.log(error));
  }, [players]);

  return { players, setPlayers };
};
