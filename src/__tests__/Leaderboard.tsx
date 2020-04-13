import React from "react";
import { render, cleanup } from "@testing-library/react";
import { Leaderboard } from "../components/Leaderboard";

beforeEach(cleanup);

jest.mock("../context", () => ({
  usePlayersValue: jest.fn(() => ({
    players: [
      {
        id: "1",
        name: "Rodolfo",
        wins: 1,
        loses: 1,
        games: 2
      },
      {
        id: "2",
        name: "Mihai",
        wins: 3,
        loses: 1,
        games: 2
      },
      {
        id: "3",
        name: "Mihai",
        wins: 3,
        loses: 3,
        games: 2
      }
    ]
  }))
}));

describe("<Leaderboard />", () => {
  describe("Success", () => {
    it("renders Leaderboard", () => {
      const { queryByTestId } = render(<Leaderboard />);
      expect(queryByTestId("leaderboard")).toBeTruthy();
    });
  });
});
