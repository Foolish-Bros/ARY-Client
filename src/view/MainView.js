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
    { value: "11번가", label: "11번가" },
    { value: "옥션", label: "옥션" },
  ];

  // 사이트 선택 변경 핸들러
  const handleSiteChange = (event) => {
    setSelectedSite(event.target.value);
  };

  // 사이드바 열림 상태를 관리하는 state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
    </div>
  );
}

export default MainView;
