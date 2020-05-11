import React, { FunctionComponent } from "react";
import { Header } from "./components/layout/Header";
import { Leaderboard } from "./components/Leaderboard";
import { PlayersProvider } from "./context";
import "./App.scss";
import { ThemeProvider } from "@material-ui/core";
import { theme } from "./helpers";

const App: FunctionComponent<{}> = () => {
  return (
    <PlayersProvider>
      <ThemeProvider theme={theme}>
        <Header />
        <Leaderboard />
      </ThemeProvider>
    </PlayersProvider>
  );
};

export default App;
