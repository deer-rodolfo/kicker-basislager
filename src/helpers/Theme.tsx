import { createMuiTheme } from "@material-ui/core";

const mainWhite = "#fdfdfd";
export const Theme = createMuiTheme({
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
    MuiChip: {
      root: {
        color: mainWhite,
        backgroundColor: "#26d07c",
      },
      deleteIcon: {
        color: mainWhite,
      },
    },
  },
});
