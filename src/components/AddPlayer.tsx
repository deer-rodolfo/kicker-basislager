import React, { FunctionComponent, useState } from "react";
import { Button, Modal, TextField, CircularProgress } from "@material-ui/core";
import { playerInterface } from "../helpers";
import { usePlayersValue } from "../context";
import { CodeField } from "./CodeField";
import { firebase } from "../firebase";

export const AddPlayer: FunctionComponent<{}> = () => {
  const { players, setPlayers }: any = usePlayersValue();
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [codeAccepted, setCodeAccepted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [nameError, setNameError] = useState<boolean>(false);
  const [codeError, setCodeError] = useState<boolean>(false);

  const textInputStyle = {
    width: "100%",
    margin: "1rem auto",
  };

  const userNameUnique = (username: string): boolean => {
    return players.find(
      (player: playerInterface) =>
        player.name.toLowerCase() === username.toLowerCase()
    )
      ? false
      : true;
  };
  const addPlayer = () => {
    userName && userNameUnique(userName)
      ? setNameError(false)
      : setNameError(true);
    codeAccepted ? setCodeError(false) : setCodeError(true);
    if (!nameError && codeAccepted) {
      setLoading(true);
      firebase
        .firestore()
        .collection("players")
        .add({
          name: userName,
          wins: 0,
          loses: 0,
        })
        .then(() => {
          setUserName("");
          setCodeAccepted(false);
          setPlayers([...players]);
          setModalIsOpen(false);
          setLoading(false);
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
            error={nameError}
            helperText={nameError ? "You need a cool name!" : ""}
            style={textInputStyle}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <CodeField
            inputStyle={textInputStyle}
            codeError={codeError}
            setCodeError={setCodeError}
            setCodeAccepted={setCodeAccepted}
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
