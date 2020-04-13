import React, { FunctionComponent, useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { CodeField } from "./CodeField";
import { Button, Modal, TextField, CircularProgress } from "@material-ui/core";
import { playerInterface } from "../helpers";
import { usePlayersValue } from "../context";
import { firebase } from "../firebase";

export const AddGame: FunctionComponent<{}> = () => {
  const { players, setPlayers }: any = usePlayersValue();
  const [winningTeam, setWinningTeam] = useState<playerInterface[]>([]);
  const [losingTeam, setLosingTeam] = useState<playerInterface[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [codeAccepted, setCodeAccepted] = useState<boolean>(false);

  const autoCompleteStyle = {
    width: "100%",
    margin: "1rem auto",
  };

  const updatePlayer = (
    batch: any,
    db: any,
    player: playerInterface,
    win: boolean
  ) => {
    const playerRef = db.collection("players").doc(player.id);
    batch.update(
      playerRef,
      win
        ? {
            wins: player.wins + 1,
          }
        : {
            loses: player.loses + 1,
          }
    );
  };

  const addGame = () => {
    if (codeAccepted) {
      setLoading(true);
      const db = firebase.firestore();
      const batch = db.batch();
      winningTeam.map((player) => updatePlayer(batch, db, player, true));
      losingTeam.map((player) => updatePlayer(batch, db, player, false));
      batch.commit().then(() => {
        setWinningTeam([]);
        setLosingTeam([]);
        setPlayers([...players]);
        setLoading(false);
        setModalIsOpen(false);
      });
    }
  };

  return (
    <>
      <Button
        variant="contained"
        size="small"
        color="primary"
        data-testid="add-game-btn"
        onClick={() => setModalIsOpen(true)}
      >
        Add Game
      </Button>
      <Modal
        aria-labelledby="add-game-modal"
        aria-describedby="add game and the scores for players actualize"
        open={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
      >
        <div className="add-game__modal">
          <h2>Add New Game</h2>
          <h3>Winners</h3>
          <Autocomplete
            id="winner-team"
            freeSolo
            multiple
            filterSelectedOptions
            options={players}
            value={winningTeam}
            onChange={(e, selectedTeam) => setWinningTeam(selectedTeam)}
            getOptionLabel={(option: playerInterface) => option.name}
            style={autoCompleteStyle}
            renderInput={(params) => (
              <TextField {...params} label="Player" variant="outlined" />
            )}
          />
          <h3>Losers</h3>
          <Autocomplete
            id="loser-team"
            freeSolo
            multiple
            filterSelectedOptions
            options={players}
            value={losingTeam}
            onChange={(e, selectedTeam) => setLosingTeam(selectedTeam)}
            getOptionLabel={(option: playerInterface) => option.name}
            style={autoCompleteStyle}
            renderInput={(params) => (
              <TextField {...params} label="Player" variant="outlined" />
            )}
          />
          <CodeField
            inputStyle={autoCompleteStyle}
            setCodeAccepted={setCodeAccepted}
          />
          <Button
            variant="contained"
            size="small"
            color="primary"
            onClick={() => addGame()}
            data-testid="add-game-submit"
          >
            {loading ? (
              <CircularProgress size={24} color="secondary" />
            ) : (
              "Add Game"
            )}
          </Button>
        </div>
      </Modal>
    </>
  );
};
