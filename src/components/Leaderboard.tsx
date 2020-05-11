import React, { FunctionComponent } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Container,
} from "@material-ui/core";
import { usePlayersValue } from "../context";
import { playerInterface, Order, stableSort, getComparator } from "../helpers";
import { LeaderboardHead } from "./LeaderboardHead";

export const Leaderboard: FunctionComponent<{}> = () => {
  const { players }: any = usePlayersValue();
  const [orderBy, setOrderBy] = React.useState<keyof playerInterface>("points");
  const [order, setOrder] = React.useState<Order>("desc");

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof playerInterface
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <Container max-width="md">
      <TableContainer component={Paper} data-testid="leaderboard">
        <Table aria-label="leaderboard" className="leaderboard">
          <LeaderboardHead
            orderBy={orderBy}
            order={order}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {stableSort(players, getComparator(order, orderBy)).map(
              (player, index) => (
                <TableRow hover key={player.id}>
                  <TableCell align="center" scope="row">
                    {player.name}
                  </TableCell>
                  <TableCell align="center">{player.games}</TableCell>
                  <TableCell align="center">{player.wins}</TableCell>
                  <TableCell align="center">{player.winRatio}%</TableCell>
                  <TableCell align="center">{player.points}</TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
