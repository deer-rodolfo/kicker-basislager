import React, { FunctionComponent } from "react";
import { AddPlayer } from "../AddPlayer";
import { AddGame } from "../AddGame";
import { AppBar, Toolbar } from "@material-ui/core";
import BasisLogo from "../../assets/basislager-logo.svg";

export const Header: FunctionComponent<{}> = () => {
  return (
    <header data-testid="header">
      <AppBar color="secondary" position="fixed">
        <Toolbar className="header-nav">
          <a
            href="https://www.basislager.co/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={BasisLogo} alt="Basislager Coworking Space logo" />
          </a>
          <AddGame />
          <AddPlayer />
        </Toolbar>
      </AppBar>
    </header>
  );
};
