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

const chatItems = ["맨투맨", "운동화", "애견 간식"];
const lastQuestionItems = [
  "사이즈가 넉넉한 편인가요?",
  "배송은 얼마나 걸리나요?",
  "포함된 알레르기 성분 알려주세요 특히 소고기 포함되는지 알고 싶어요",
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
      <div key={index}>
        <ListItem
          button
          onClick={() => clickHandler(text)}
          selected={selectedItem === text}
          sx={{
            width: "95%",
            marginLeft: "5px",
            "&:hover": {
              backgroundColor: "lightgray", // 회색 배경색 적용
              borderRadius: "5px",
            },
          }}
        >
          <ListItemText
            primary={
              <>
                <div
                  style={{
                    width: "100%",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                >
                  {text}
                </div>
                {lastQuestionItems[index] &&
                lastQuestionItems[index].length > 20 ? (
                  <Box
                    component="span"
                    sx={{
                      marginLeft: "16px",
                      marginRight: "16px", // marginRight 추가
                      color: "gray",
                      fontSize: "12px",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {lastQuestionItems[index].slice(0, 20) + "..."}
                  </Box>
                ) : (
                  <Box
                    component="span"
                    sx={{
                      marginLeft: "16px",
                      color: "gray",
                      fontSize: "12px",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {lastQuestionItems[index]}
                  </Box>
                )}
              </>
            }
          />
        </ListItem>
      </div>
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
          marginTop: "64px",
          boxSizing: "border-box",
          backgroundColor: "white",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "90%",
        }}
      >
        <ListItem
          button
          onClick={() => clickHandler("")}
          sx={{
            display: "flex",
            justifyContent: "space-between", // Align items horizontally
            alignItems: "center", // Align items vertically
            backgroundColor: "#007F73",
            borderRadius: "20px",
            width: "190px",

            height: "45px", // 고정된 높이 설정
            mx: "auto",
            mt: 1,
            "&:hover": {
              backgroundColor: "#007F73",
            },
          }}
        >
          <ListItemText
            primary={
              <span style={{ fontWeight: "bold", fontSize: "18px" }}>
                새로운 채팅
              </span>
            }
            className={styles.listItemTextCenter}
          />
        </ListItem>
        {/* <Divider className={styles.divider} /> */}
        <Box
          sx={{
            marginLeft: "16px",
            color: "gray",
            fontSize: "12px",
            mt: 2,
          }}
        >
          상품 내역
        </Box>
        <Box
          sx={{
            height: "75%",
            display: "flex",
            justifyContent: "center", // 아이템들을 수직 가운데로 정렬
          }}
        >
          <List className={styles.drawerList}>{renderChatItems()}</List>
        </Box>
        <Divider className={styles.divider} />
        <Box>
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
