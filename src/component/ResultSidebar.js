import React, { useState } from "react";
import {
  Typography,
  Drawer,
  Button,
  Box,
  Rating,
  LinearProgress,
} from "@mui/material";


function ResultSidebar() {
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

  // 개별 리뷰 항목을 위한 컴포넌트
  const ReviewItem = ({ username, date, content }) => (
    <Box sx={{ mt: 2 }}>
      <Typography variant="body2">{username}님 {date}</Typography>
      <Typography variant="body2">{content}</Typography>
    </Box>
  );

  return (

    <div>
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
            {/* ReviewItem 컴포넌트를 사용 */}
            <ReviewItem username="poma****" date="19.05.24." content="가격대비 좋은 것 같네요." />
            <ReviewItem username="luna****" date="20.03.15." content="디자인이 너무 마음에 들어요!" />
            <ReviewItem username="sora****" date="21.07.09." content="맨투맨 색상이 사진과 다른 거 같아요.." />
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




export default ResultSidebar;