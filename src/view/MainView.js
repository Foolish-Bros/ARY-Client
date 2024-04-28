import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText, TextField, Button, Divider, Avatar, ListItemAvatar, Select, MenuItem, FormControl, InputLabel, Box, Rating, LinearProgress } from '@mui/material';
import styles from "./MainView.module.css"; // CSS 모듈 임포트

import Chat from "../component/Chat";


function MainView() {

  // 선택된 사이트를 관리하기 위한 state
  const [selectedSite, setSelectedSite] = useState('');

  // 사용 가능한 사이트 목록
  const sites = [
    { value: 'coupang', label: '쿠팡' },
    { value: 'shopping_naver', label: '네이버 쇼핑' },
    { value: 'site3', label: '지마켓' },
  ];

  // 사이트 선택 변경 핸들러
  const handleSiteChange = (event) => {
    setSelectedSite(event.target.value)
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


  // 현재 선택된 채팅 목록을 추적하는 상태 추가
  const [selectedItem, setSelectedItem] = useState(null);

  // "맨투맨" 항목이 선택되었을 때 호출될 함수
  const handleManToManClick = () => {
    setSelectedItem('맨투맨'); // 선택된 항목 상태를 '맨투맨'으로 설정
    openSidebar(); // 사이드바 열기
  };


  // 디버깅용
  useEffect(() => {
    console.log(selectedSite);
  }, [selectedSite])


  return (
    <div>
      <AppBar position="fixed" sx={{ width: `calc(100% - 200px)`, ml: '200px' }}>
        <Toolbar className={styles.toolBar}>
          <Typography variant="h6">
            ALL REVIEW YOUNG
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" anchor="left"
        sx={{
          width: 200,
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column', // Drawer 내부를 column 방향으로 정렬
          '& .MuiDrawer-paper': {
            width: 200,
            boxSizing: 'border-box',
            backgroundColor: '#E3E3E3', // Drawer의 배경색 설정
          },
        }}>
        <List className={styles.drawerList} sx={{ overflow: 'auto' }}>
          <ListItem button className={styles.listItemButton}>
            <ListItemText primary="새로운 채팅" className={styles.listItemTextCenter} />
          </ListItem>

          <Divider className={styles.divider} />

          {/* 채팅 목록을 여기에 동적으로 추가 */}
          <ListItem button onClick={handleManToManClick}>
            <ListItemText primary="맨투맨" />
          </ListItem>
          <ListItem button >
            <ListItemText primary="운동화" />
          </ListItem>
          <ListItem button >
            <ListItemText primary="애견 간식" />
          </ListItem>
        </List>
        <Divider className={styles.divider} />
        <Box sx={{
          bgcolor: '#E3E3E3',
          mt: 'auto', // 상단 컨텐츠에 자동 마진을 줘서 하단에 고정시킴
        }}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>KCS</Avatar>
            </ListItemAvatar>
            <ListItemText primary="김창식" />
          </ListItem>
        </Box>
      </Drawer>

      <main style={{ flexGrow: 1, height: '100vh', overflow: 'auto' }}>

        <div>
          {/* 조건부 렌더링: 선택된 항목이 '맨투맨'일 때만 Chat 컴포넌트 렌더링 */}
          {selectedItem === '맨투맨' && <Chat/>}
        </div>

        <div className={`${styles.chatInput} ${isSidebarOpen ? styles.bottomChatInput : ''}`}>

        
          {/* 조건부 렌더링: 어떤 리스트 항목도 선택되지 않았을 때만 지원 사이트 드롭다운 렌더링 */}
          {selectedItem === null && (
            <FormControl variant="outlined" className={styles.siteSelectArea}>
              <InputLabel id="site-select-label" className={styles.siteSelectLabel}>지원 사이트</InputLabel>
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
          )}


          <TextField
            label={isSidebarOpen ? "입력하세요" : "검색 또는 URL 입력"}
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

      </main>

      {/* 사이드바가 열려있으면 사이드바 컴포넌트를 렌더링 */}
      {isSidebarOpen && (
        <Drawer
          variant="temporary"
          anchor="right"
          open={isSidebarOpen}
          onClose={closeSidebar}
          sx={{
            '& .MuiDrawer-paper': { width: '300px' },
          }}
          ModalProps={{
            BackdropProps: {
              invisible: true
            }
          }}
        >
          <Box sx={{ padding: 2 }}>
            <Typography variant="h5" gutterBottom textAlign={"center"} sx={{ fontWeight: 'bold' }}>
              맨투맨 리뷰 분석
            </Typography>
            <Typography variant="h6" textAlign={"center"} marginTop={'20px'} sx={{ fontWeight: 'bold' }}>
              평균 별점
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
              <Typography variant="body2" sx={{ mr: 2 }}>
                3.75점
              </Typography>
              <Rating name="read-only" value={3.75} readOnly precision={0.25} />
            </Box>
            <Typography variant="h6" textAlign={"center"} sx={{ mt: 2, fontWeight: 'bold' }}>
              긍/부정 비율
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <Typography variant="body2" textAlign={"center"} sx={{ width: '40%', pr: 1 }}>
                긍정 (75%)
              </Typography>
              <LinearProgress variant="determinate" value={75} sx={{ width: '60%', height: 10, borderRadius: 5 }} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <Typography variant="body2" textAlign={"center"} sx={{ width: '40%', pr: 1 }}>
                부정 (25%)
              </Typography>
              <LinearProgress variant="determinate" value={25} color="secondary" sx={{ width: '60%', height: 10, borderRadius: 5 }} />
            </Box>

            {/* 리뷰 내용 추가 */}
            <Box sx={{ mt: 6 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                리뷰 보기
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                poma****님 19.05.24.
              </Typography>
              <Typography variant="body2">
                가격대비 좋은 것 같네요.
              </Typography>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" >
                luna****님 20.03.15.
              </Typography>
              <Typography variant="body2">
                디자인이 너무 마음에 들어요!
              </Typography>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" >
                sora****님 21.07.09.
              </Typography>
              <Typography variant="body2">
                맨투맨 색상이 사진과 다른 거 같아요..
              </Typography>
            </Box>
            {/* 더보기 버튼 추가 */}
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
              <Button variant="contained"
                sx={{
                  backgroundColor: '#007F73',
                  '&:hover': {
                    backgroundColor: '#00695c'
                  }
                }}
              >더보기</Button>
            </Box>

          </Box>
        </Drawer>
      )}
    </div>
  );
}

export default MainView;