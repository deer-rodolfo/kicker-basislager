import React, { FunctionComponent } from "react";
import { Header } from "./components/layout/Header";
import { Leaderboard } from "./components/Leaderboard";
import { PlayersProvider } from "./context";
import "./App.scss";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";

const mainWhite = "#fdfdfd";
const theme = createMuiTheme({
  typography: {
    fontFamily: ["Open-Sans", "sans-serif"].join(","),
    fontSize: 15,
    fontWeightLight: 500,
  },
  palette: {
    primary: {
      main: "#26d07c",
      contrastText: "#fff",
    },
    secondary: {
      main: "#fff",
      contrastText: "#101820",
    },
  },
  overrides: {
    MuiTableSortLabel: {
      root: {
        "&:hover": {
          color: mainWhite,
        },
      },
      active: {
        color: mainWhite + "!important",
        fontWeight: "bold",
      },
      icon: {
        color: mainWhite + "!important",
      },
    },
  },
});

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
