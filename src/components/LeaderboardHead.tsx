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
    id: keyof playerInterface;
    label: string;
  }

  const headCells: HeadCell[] = [
    { id: "name", label: "Username" },
    { id: "games", label: "Games" },
    { id: "wins", label: "Wins" },
    { id: "winRatio", label: "Win-Ratio" },
    { id: "points", label: "Points" },
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
          <TableCell key={headCell.id} align="center">
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
