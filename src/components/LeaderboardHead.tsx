import React from "react";
import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@material-ui/core";
import { playerInterface, Order } from "../helpers";

interface LeaderboardHeadProps {
  order: Order;
  orderBy: string;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof playerInterface
  ) => void;
}

export function LeaderboardHead(props: LeaderboardHeadProps) {
  const { order, orderBy, onRequestSort } = props;
  interface HeadCell {
    disablePadding: boolean;
    id: keyof playerInterface;
    label: string;
    numeric: boolean;
  }

  const headCells: HeadCell[] = [
    { id: "name", numeric: false, disablePadding: true, label: "Username" },
    { id: "games", numeric: true, disablePadding: false, label: "Games" },
    { id: "wins", numeric: true, disablePadding: false, label: "Wins" },
    {
      id: "winRatio",
      numeric: false,
      disablePadding: false,
      label: "Win-Ratio",
    },
    { id: "points", numeric: false, disablePadding: false, label: "Points" },
  ];

  const createSortHandler = (property: keyof playerInterface) => (
    event: React.MouseEvent<unknown>
  ) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell align="center">
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
