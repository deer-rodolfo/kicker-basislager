import React, { FunctionComponent } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
} from "@material-ui/core";
import { usePlayersValue } from "../context";
import { playerInterface } from "../helpers";

export const Leaderboard: FunctionComponent<{}> = () => {
  const { players }: any = usePlayersValue();

  const playerPoints = (player: playerInterface): number => {
    return Math.floor(player.wins * 3 - player.loses * 2);
  };

  const winRatio = (player: playerInterface): number => {
    return player.games ? Math.floor((player.wins / player.games) * 100) : 0;
  };

  const sortCompare = (a: playerInterface, b: playerInterface): number => {
    const pointsA = playerPoints(a);
    const pointsB = playerPoints(b);

    let comparison = 0;
    if (pointsA > pointsB) {
      comparison = -1;
    } else if (pointsA < pointsB) {
      comparison = 1;
    }
    return comparison;
  };

  const sortedPlayers = [...players];
  sortedPlayers.sort(sortCompare);

  return (
    <Container max-width="md">
      <TableContainer component={Paper} data-testid="leaderboard">
        <Table aria-label="leaderboard" className="leaderboard">
          <TableHead>
            <TableRow>
              <TableCell align="center">Username</TableCell>
              <TableCell align="center">Games</TableCell>
              <TableCell align="center">Wins</TableCell>
              <TableCell align="center">Win-Ratio</TableCell>
              <TableCell align="center">Points</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedPlayers.map((player: playerInterface) => (
              <TableRow key={player.id}>
                <TableCell align="center" scope="row">
                  {player.name}
                </TableCell>
                <TableCell align="center">{player.games}</TableCell>
                <TableCell align="center">{player.wins}</TableCell>
                <TableCell align="center">{winRatio(player)}%</TableCell>
                <TableCell align="center">{playerPoints(player)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
