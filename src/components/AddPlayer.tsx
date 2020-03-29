import React, { FunctionComponent, useState } from "react";
import { Button, Modal, TextField, CircularProgress } from "@material-ui/core";
import { playerInterface } from "../helpers";
import { usePlayersValue } from "../context";
import { firebase } from "../firebase";

export const AddPlayer: FunctionComponent<{}> = () => {
  const { players, setPlayers }: any = usePlayersValue();
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const email: any = process.env.REACT_APP_EMAIL;

  const textInputStyle = {
    width: "100%",
    margin: "1rem auto"
  };

  const userNameUnique = (username: string): boolean => {
    return players.find((player: playerInterface) => player.name === username)
      ? false
      : true;
  };
  const addPlayer = () => {
    setLoading(true);
    if (userName && userNameUnique(userName)) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          firebase
            .firestore()
            .collection("players")
            .add({
              name: userName,
              wins: 0,
              loses: 0
            })
            .then(() => {
              setLoading(false);
              setUserName("");
              setPassword("");
              setPlayers([...players]);
              setModalIsOpen(false);
              firebase.auth().signOut();
            });
        });
    }
  };

  return (
    <>
      <Button
        variant="contained"
        size="small"
        color="primary"
        data-testid="add-player-btn"
        onClick={() => setModalIsOpen(true)}
      >
        Add Player
      </Button>
      <Modal
        aria-labelledby="add-player-modal"
        aria-describedby="add a new player"
        open={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
      >
        <div className="add-player__modal">
          <h2>Add New Player</h2>
          <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            data-testid="add-player-username"
            style={textInputStyle}
            value={userName}
            onChange={e => setUserName(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="code"
            variant="outlined"
            type="password"
            data-testid="add-player-password"
            style={textInputStyle}
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Button
            className="add-player__submit-btn"
            variant="contained"
            size="medium"
            color="primary"
            onClick={() => addPlayer()}
            data-testid="add-player-submit"
          >
            {loading ? (
              <CircularProgress size={24} color="secondary" />
            ) : (
              "Add Player"
            )}
          </Button>
        </div>
      </Modal>
    </>
  );
};
