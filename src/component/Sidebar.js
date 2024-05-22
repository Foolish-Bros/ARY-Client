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
import styles from "../view/MainView.module.css"; // CSS 모듈 임포트
import { useLocation } from "react-router-dom";


function Sidebar() {
  const location = useLocation();

  // 현재 선택된 채팅 목록을 추적하는 상태 추가
  const [selectedItem, setSelectedItem] = useState(null);

  const clickHandler = (text) => {
    setSelectedItem(text);
    window.location.href = "/result";
  };

  // 채팅 목록 데이터를 배열로 관리
  const chatItems = [
    { text: "맨투맨" },
    { text: "운동화" },
    { text: "애견 간식" },
    { text: "맨투맨" },
    { text: "운동화" },
    { text: "애견 간식" },
    { text: "맨투맨" },
    { text: "운동화" },
    { text: "애견 간식" },
    { text: "맨투맨" },
    { text: "운동화" },
    { text: "애견 간식" },
    { text: "맨투맨" },
    { text: "운동화" },
    { text: "애견 간식" },
    { text: "맨투맨" },
    { text: "운동화" },
    { text: "애견 간식" },
    { text: "맨투맨" },
    { text: "운동화" },
    { text: "애견 간식" },
    { text: "맨투맨" },
    { text: "운동화" },
    { text: "애견 간식" },
    
  ];

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 250,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column", // Drawer 내부를 column 방향으로 정렬
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
          sx={{
            backgroundColor: "#000",
            borderRadius: "10px",
            width: "190px",
            mx: "auto",
            mt: 1, // 상단 여백 추가
            '&:hover': {
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
        {/* 채팅 목록을 여기에 동적으로 추가 */}
        <Box sx={{ height: "75%", overflow: "auto" }}>
          <List className={styles.drawerList}>
            {chatItems.map((item, index) => (
              <ListItem
                button
                key={index}
                onClick={() => clickHandler(item.text)}
                selected={selectedItem === item.text}
                sx={{ padding: '10px 16px' }}
              >
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
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
}
export default Sidebar;
