import React, { useState } from 'react';
import { Box, Typography, IconButton, Button, Tooltip } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { keyframes } from '@mui/material';

// 오른쪽 사이드바 컴포넌트 임포트
import ReviewAnalysis from "../component/ReviewAnalysis";
import ReviewItem from "../component/ReviewItem";
import ReadMoreReview from './ReadMoreReviewBtn';

//채팅 메시지 컴포넌트 임포트
import ChatMessage from './ChatMessage';


const arrowAnimation = keyframes`
  0% { transform: translateX(0); }
  50% { transform: translateX(5px); }
  100% { transform: translateX(0); }
`;


function Chat() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'user', text: 'https://www.coupang.com/vp/products/7945128164?itemId=22552512026&vendorItemId=89594440513&sourceType=CATEGORY&categoryId=502895&isAddedCart= 분석해주세요!' },
    { id: 2, sender: 'bot', text: '리뷰를 분석 중입니다...' },
    { id: 3, sender: 'bot', text: '분석이 완료되었습니다!' },
    // 임시 채팅 데이터 15개 추가
    /*{ id: 4, sender: 'user', text: '오늘 날씨 어때요?' },
    { id: 5, sender: 'bot', text: '오늘은 맑고 따뜻합니다!' },
    { id: 6, sender: 'user', text: '저녁 메뉴 추천해줘요' },
    { id: 7, sender: 'bot', text: '치킨은 어떠세요?' },
    { id: 8, sender: 'user', text: '좋아요! 어디 치킨이 맛있나요?' },
    { id: 9, sender: 'bot', text: 'OO치킨이 인기 많아요!' },
    { id: 10, sender: 'user', text: '주문해줄 수 있어요?' },
    { id: 11, sender: 'bot', text: '죄송해요, 주문 기능은 지원하지 않아요.' },
    { id: 12, sender: 'user', text: '음악 추천해주세요.' },
    { id: 13, sender: 'bot', text: '최신 팝 음악 플레이리스트를 추천드립니다!' },
    { id: 14, sender: 'user', text: '감사합니다! 또 다른 기능이 있나요?' },
    { id: 15, sender: 'bot', text: '뉴스 요약, 날씨 예보, 일정 관리 등 다양한 기능을 지원합니다.' },
    { id: 16, sender: 'user', text: '일정 관리 기능은 어떻게 사용하나요?' },
    { id: 17, sender: 'bot', text: '일정을 말씀해주시면 제가 추가해드릴게요!' },
    { id: 18, sender: 'user', text: '내일 오후 2시에 치과 예약해주세요.' },
    { id: 19, sender: 'bot', text: '내일 오후 2시에 치과 예약 완료했습니다!' },*/
  ]);

  //사이드바 오픈 확인용
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  //오른쪽 사이드바 리뷰 저장용 변수
  const [reviews, setReviews] = useState([
    { username: "poma****", date: "19.05.24.", content: "가격대비 좋은 것 같네요." },
    { username: "luna****", date: "20.03.15.", content: "디자인이 너무 마음에 들어요!" },
    { username: "sora****", date: "21.07.09.", content: "맨투맨 색상이 사진과 다른 거 같아요.." }
  ]);

  const messageStyle = (sender) => ({
    margin: '8px',
    padding: '16px',
    borderRadius: '8px',
    backgroundColor: 'transparent', // 배경색 제거
    color: sender === 'user' ? '#1976d2' : '#388e3c', // 사용자 및 봇 텍스트 색상 변경
    border: `1px solid ${sender === 'user' ? '#90caf9' : '#c5e1a5'}`, // 경계선 추가
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)', // 그림자 유지
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
  });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  //리뷰 더 보기
  const loadMoreReviews = () => {
    const newReviews = [
      { username: reviews.length + 1, date: '20.04.17', content: `리뷰 내용 ${reviews.length + 1}` },
      { username: reviews.length + 2, date: '22.06.02', content: `리뷰 내용 ${reviews.length + 2}` },
      { username: reviews.length + 3, date: '18.02.22', content: `리뷰 내용 ${reviews.length + 3}` }
    ];

    setReviews([...reviews, ...newReviews]);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Box sx={{ padding: '16px', marginLeft: '240px', marginTop: '80px', width: 'calc(100% - 400px)', height: 'calc(100vh - 300px)', overflowY: 'auto' }}>
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </Box>
      <Box sx={{ position: 'relative', mt: '80px', mx: '15px' }}>
        <Tooltip title={isSidebarOpen ? "결과 분석 닫기" : "결과 분석 열기"} placement="left">
          <IconButton
            onClick={toggleSidebar}
            sx={{
              position: 'fixed',
              top: '90px',
              right: '15px',
              zIndex: 1300,
              '&:hover .MuiSvgIcon-root': {
                animation: `${arrowAnimation} 1s infinite`,
              },
            }}
          >
            {isSidebarOpen ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </Tooltip>
        {isSidebarOpen && (
          <Box sx={{ width: '300px', backgroundColor: '#f4f4f4', height: 'calc(100vh - 100px)', overflowY: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
            <ReviewAnalysis />
            <Box sx={{ maxHeight: 'calc(100vh - 600px)', overflowY: 'auto' }}>
              {reviews.map((review) => (
                <ReviewItem username={review.username} date={review.date} content={review.content} />
              ))}
              {/* 리뷰 더보기 버튼 추가 */}
              <ReadMoreReview onClick={loadMoreReviews} />
            </Box>

          </Box>
        )}
      </Box>
    </Box>
  );
}

export default Chat;
