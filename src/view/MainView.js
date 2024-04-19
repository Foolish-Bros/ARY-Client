import React from "react";
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText, TextField, Button, Divider, Avatar, ListItemAvatar } from '@material-ui/core';
import styles from "./MainView.module.css"; // CSS 모듈 임포트

function MainView() {
  return (
    <div className={styles.MainView}>
      <AppBar className={styles.appBar}>
        <Toolbar>
          <Typography variant="h6">
            ALL-REVIEW-YOUNG
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" anchor="left" className={styles.drawer}>
        <List>
          <ListItem button className={styles.listItemButton}>
            <ListItemText primary="새로운 채팅" className={styles.listItemTextCenter} />
          </ListItem>
          <Divider className={styles.divider} />
          {/* 채팅 목록을 여기에 동적으로 추가 */}
          <ListItem button>
            <ListItemText primary="코딩을" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="미리미리 하는 습관을" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="생활화 합시다." />
          </ListItem>

          <Divider className={styles.divider} />
          <ListItem className={styles.profile}>
            <ListItemAvatar>
              <Avatar>KCS</Avatar>
            </ListItemAvatar>
            <ListItemText primary="김창식" />
          </ListItem>
        </List>
      </Drawer>
      <main className={styles.content}>
        <div className={styles.chatInput}>
          <TextField
            label="메시지 입력"
            variant="outlined"
            fullWidth
            className={styles.inputField}
          />
          <Button
            variant="contained"
            className={styles.sendButton}
          >
            전송
          </Button>
        </div>
        {/* 여기에 채팅 내역을 표시하는 컴포넌트를 추가 */}
      </main>
    </div>
  );
}

export default MainView;