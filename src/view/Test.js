import React from "react";
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText, TextField, Button, makeStyles, Divider, Avatar, ListItemAvatar } from '@material-ui/core';
//import styles from "./Test.module.css";

/* 원래는 이런 식으로 짜야 함
function Test() {
	return (
		<div>
			<p className={styles.hello}> This is test page</p>
		</div>
	);
}
*/


const drawerWidth = 240;

const useStyles = makeStyles({
  drawer: {
    width: drawerWidth,
    backgroundColor: '#E3E3E3',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    backgroundColor: '#5BAE70',
  },
  content: {
    marginTop: '64px',
    padding: '16px',
    marginLeft: drawerWidth,
  },
  chatInput: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '20px',
  },
  inputField: {
    marginRight: '8px',
  },
  divider: {
    backgroundColor: '#000',
    height: '1px',
    margin: '8px 0',
  },
  listItemTextCenter: {
    textAlign: 'center',
    color: '#FFF',
  },
  listItemBlack: {
    backgroundColor: '#000',
  },
  profile: {
    marginTop: 'auto',
  },
  sendButton: {
	color: 'white',
    backgroundColor: '#007F73',
    '&:hover': {
      backgroundColor: '#00695c',
    },
  },
});

function Test() {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6">
            ALL-REVIEW-YOUNG
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" anchor="left" classes={{ paper: classes.drawer }}>
        <List>
          <ListItem button className={classes.listItemBlack}>
            <ListItemText primary="새로운 채팅" classes={{ primary: classes.listItemTextCenter }} />
          </ListItem>
          <Divider className={classes.divider} />
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

          <Divider className={classes.divider} />
          <ListItem className={classes.profile}>
            <ListItemAvatar>
              <Avatar>KCS</Avatar>
            </ListItemAvatar>
            <ListItemText primary="김창식" />
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.chatInput}>
          <TextField
            label="메시지 입력"
            variant="outlined"
            fullWidth
            className={classes.inputField}
          />
          <Button
            variant="contained"
            className={classes.sendButton}
          >
            전송
          </Button>
        </div>
        {/* 여기에 채팅 내역을 표시하는 컴포넌트를 추가 */}
      </main>
    </div>
  );
}

export default Test;