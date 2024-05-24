import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import styles from "../view/MainView.module.css";
import logoImg from "../resource/logo.svg";

function Header() {
  return (
    <AppBar
      position="fixed"
      sx={{ width: `calc(100%)`, ml: "250px", boxShadow: "none" }}
    >
      <Toolbar className={styles.toolBar} sx={{ justifyContent: "left" }}>
        <img
          src={logoImg}
          alt="Logo"
          style={{
            width: "230px",
            height: "auto",
          }}
        />
      </Toolbar>
    </AppBar>
  );
}

export default Header;
