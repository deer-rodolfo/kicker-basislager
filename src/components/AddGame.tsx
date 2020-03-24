import React, { FunctionComponent, useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Button, Modal, TextField } from "@material-ui/core";
import { playerInterface } from "../helpers";
import { usePlayersValue } from "../context";
import { firebase } from "../firebase";

export const AddGame: FunctionComponent<{}> = () => {
  const { players, setPlayers }: any = usePlayersValue();
  const [winningTeam, setWinningTeam] = useState<playerInterface[]>([]);
  const [losingTeam, setLosingTeam] = useState<playerInterface[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const email: any = process.env.REACT_APP_EMAIL;

  const autoCompleteStyle = {
    width: "100%",
    margin: "1rem auto"
  };

  const addWin = (player: playerInterface) => {
    firebase
      .firestore()
      .collection("players")
      .doc(player.id)
      .update({
        wins: player.wins + 1
      })
      .then(() => setPlayers([...players]));
  };

  const addLoss = (player: playerInterface) => {
    firebase
      .firestore()
      .collection("players")
      .doc(player.id)
      .update({
        loses: player.loses + 1
      })
      .then(() => setPlayers([...players]));
  };

  const addGame = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        winningTeam.map(player => addWin(player));
        losingTeam.map(player => addLoss(player));
        setPassword("");
        setWinningTeam([]);
        setLosingTeam([]);
        setModalIsOpen(false);
      });
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
            renderInput={params => (
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
            renderInput={params => (
              <TextField {...params} label="Player" variant="outlined" />
            )}
          />
          <TextField
            id="outlined-basic"
            label="code"
            variant="outlined"
            type="password"
            data-testid="add-player-password"
            style={autoCompleteStyle}
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            size="small"
            color="primary"
            onClick={() => addGame()}
            data-testid="add-game-submit"
          >
            Add Game
          </Button>
        </div>
      </Modal>
    </>
  );
};
