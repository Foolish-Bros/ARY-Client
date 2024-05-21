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

  // "맨투맨" 항목이 선택되었을 때 호출될 함수
  const handleManToManClick = () => {
    setSelectedItem("맨투맨"); // 선택된 항목 상태를 '맨투맨'으로 설정
    window.location.href = "/result";
  };
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 200,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column", // Drawer 내부를 column 방향으로 정렬
        "& .MuiDrawer-paper": {
          width: 200,
          boxSizing: "border-box",
          backgroundColor: "#E3E3E3", // Drawer의 배경색 설정
        },
      }}
    >
      <List className={styles.drawerList} sx={{ overflow: "auto" }}>
        <ListItem button className={styles.listItemButton}>
          <ListItemText
            primary="새로운 채팅"
            className={styles.listItemTextCenter}
          />
        </ListItem>

        <Divider className={styles.divider} />

        {/* 채팅 목록을 여기에 동적으로 추가 */}
        <ListItem button onClick={handleManToManClick}>
          <ListItemText primary="맨투맨" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="운동화" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="애견 간식" />
        </ListItem>
      </List>
      <Divider className={styles.divider} />
      <Box
        sx={{
          bgcolor: "#E3E3E3",
          mt: "auto", // 상단 컨텐츠에 자동 마진을 줘서 하단에 고정시킴
        }}
      >
        <ListItem>
          <ListItemAvatar>
            <Avatar>KCS</Avatar>
          </ListItemAvatar>
          <ListItemText primary="김창식" />
        </ListItem>
      </Box>
    </Drawer>
  );
}

export default Sidebar;
