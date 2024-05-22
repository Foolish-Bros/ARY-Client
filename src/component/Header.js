import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import styles from "../view/MainView.module.css";

function Header() {
  return (
    <AppBar position="fixed" sx={{ width: `calc(100% - 250px)`, ml: "250px" }}>
      <Toolbar className={styles.toolBar}>
        <Typography variant="h6">ALL REVIEW YOUNG</Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
