import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Avatar,
  ListItemAvatar,
  Box,
} from "@mui/material";
import styles from "../view/Sidebar.module.css"; // CSS 모듈 임포트
import { useLocation } from "react-router-dom";

const chatItems = [
  "맨투맨",
  "운동화",
  "애견 간식",
  "맨투맨",
  "운동화",
  "애견 간식",
  "맨투맨",
  "운동화",
  "애견 간식",
  "맨투맨",
  "운동화",
  "애견 간식",
  "맨투맨",
  "운동화",
  "애견 간식",
  "맨투맨",
  "운동화",
  "애견 간식",
  "맨투맨",
  "운동화",
  "애견 간식",
];

const Sidebar = () => {
  const location = useLocation();
  const [selectedItem, setSelectedItem] = useState(null);

  const clickHandler = (text) => {
    if (text === "") {
      window.location.href = "/";
    } else {
      setSelectedItem(text);
      window.location.href = "/result";
    }
  };

  const renderChatItems = () =>
    chatItems.map((text, index) => (
      <ListItem
        button
        key={index}
        onClick={() => clickHandler(text)}
        selected={selectedItem === text}
        sx={{ padding: "10px 16px" }}
      >
        <ListItemText primary={text} />
      </ListItem>
    ));

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 250,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        "& .MuiDrawer-paper": {
          width: 250,
          boxSizing: "border-box",
          backgroundColor: "#E3E3E3",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <ListItem
          button
          onClick={() => clickHandler("")}
          sx={{
            backgroundColor: "#000",
            borderRadius: "10px",
            width: "190px",
            mx: "auto",
            mt: 1,
            "&:hover": {
              backgroundColor: "#7B7A78",
            },
          }}
        >
          <ListItemText
            primary="새로운 채팅"
            className={styles.listItemTextCenter}
          />
        </ListItem>
        <Divider className={styles.divider} />
        <Box sx={{ height: "75%", overflow: "auto" }}>
          <List className={styles.drawerList}>{renderChatItems()}</List>
        </Box>
        <Divider className={styles.divider} />
        <Box
          sx={{
            bgcolor: "#E3E3E3",
            mt: "auto",
          }}
        >
          <ListItem>
            <ListItemAvatar>
              <Avatar>KCS</Avatar>
            </ListItemAvatar>
            <ListItemText primary="김창식" />
          </ListItem>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
