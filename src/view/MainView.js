import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  Divider,
  Avatar,
  ListItemAvatar,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Rating,
  LinearProgress,
} from "@mui/material";
import styles from "./MainView.module.css"; // CSS 모듈 임포트
import { useLocation } from "react-router-dom";

function MainView() {
  const location = useLocation();
  // 선택된 사이트를 관리하기 위한 state
  const [selectedSite, setSelectedSite] = useState("");

  // 사용 가능한 사이트 목록
  const sites = [
    { value: "coupang", label: "쿠팡" },
    { value: "shopping_naver", label: "네이버 쇼핑" },
    { value: "site3", label: "지마켓" },
  ];

  // 사이트 선택 변경 핸들러
  const handleSiteChange = (event) => {
    setSelectedSite(event.target.value);
  };

  // 사이드바 열림 상태를 관리하는 state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 사이드바를 여는 함수
  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  // 사이드바를 닫는 함수
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // 디버깅용
  useEffect(() => {
    console.log(selectedSite);
  }, [selectedSite]);

  return (
    <div>
      <main style={{ flexGrow: 1, height: "100vh", overflow: "auto" }}>
        <div
          className={`${styles.chatInput} ${
            isSidebarOpen ? styles.bottomChatInput : ""
          }`}
        >
          {/* 조건부 렌더링: 어떤 리스트 항목도 선택되지 않았을 때만 지원 사이트 드롭다운 렌더링 */}
          {
            <FormControl variant="outlined" className={styles.siteSelectArea}>
              <InputLabel
                id="site-select-label"
                className={styles.siteSelectLabel}
              >
                지원 사이트
              </InputLabel>
              <Select
                labelId="site-select-label"
                id="site-select"
                value={selectedSite}
                onChange={handleSiteChange}
                label="지원 사이트"
              >
                {sites.map((site) => (
                  <MenuItem key={site.value} value={site.value}>
                    {site.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          }

          <TextField
            label={isSidebarOpen ? "입력하세요" : "검색 또는 URL 입력"}
            variant="outlined"
            fullWidth
            className={styles.inputField}
          />
          <Button variant="contained" className={styles.sendButton}>
            전송
          </Button>
        </div>
      </main>

      {/* 사이드바가 열려있으면 사이드바 컴포넌트를 렌더링 */}
      {isSidebarOpen && (
        <Drawer
          variant="temporary"
          anchor="right"
          open={isSidebarOpen}
          onClose={closeSidebar}
          sx={{
            "& .MuiDrawer-paper": { width: "300px" },
          }}
          ModalProps={{
            BackdropProps: {
              invisible: true,
            },
          }}
        >
          <Box sx={{ padding: 2 }}>
            <Typography
              variant="h5"
              gutterBottom
              textAlign={"center"}
              sx={{ fontWeight: "bold" }}
            >
              맨투맨 리뷰 분석
            </Typography>
            <Typography
              variant="h6"
              textAlign={"center"}
              marginTop={"20px"}
              sx={{ fontWeight: "bold" }}
            >
              평균 별점
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mt: 2,
              }}
            >
              <Typography variant="body2" sx={{ mr: 2 }}>
                3.75점
              </Typography>
              <Rating name="read-only" value={3.75} readOnly precision={0.25} />
            </Box>
            <Typography
              variant="h6"
              textAlign={"center"}
              sx={{ mt: 2, fontWeight: "bold" }}
            >
              긍/부정 비율
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
              <Typography
                variant="body2"
                textAlign={"center"}
                sx={{ width: "40%", pr: 1 }}
              >
                긍정 (75%)
              </Typography>
              <LinearProgress
                variant="determinate"
                value={75}
                sx={{ width: "60%", height: 10, borderRadius: 5 }}
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
              <Typography
                variant="body2"
                textAlign={"center"}
                sx={{ width: "40%", pr: 1 }}
              >
                부정 (25%)
              </Typography>
              <LinearProgress
                variant="determinate"
                value={25}
                color="secondary"
                sx={{ width: "60%", height: 10, borderRadius: 5 }}
              />
            </Box>

            {/* 리뷰 내용 추가 */}
            <Box sx={{ mt: 6 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                리뷰 보기
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                poma****님 19.05.24.
              </Typography>
              <Typography variant="body2">가격대비 좋은 것 같네요.</Typography>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2">luna****님 20.03.15.</Typography>
              <Typography variant="body2">
                디자인이 너무 마음에 들어요!
              </Typography>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2">sora****님 21.07.09.</Typography>
              <Typography variant="body2">
                맨투맨 색상이 사진과 다른 거 같아요..
              </Typography>
            </Box>
            {/* 더보기 버튼 추가 */}
            <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#007F73",
                  "&:hover": {
                    backgroundColor: "#00695c",
                  },
                }}
              >
                더보기
              </Button>
            </Box>
          </Box>
        </Drawer>
      )}
    </div>
  );
}

export default MainView;
