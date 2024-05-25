import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, Button, Tooltip } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { keyframes, styled } from '@mui/material';

// 오른쪽 사이드바 컴포넌트 임포트
import ReviewAnalysis from "../component/ReviewAnalysis";
import ReviewItem from "../component/ReviewItem";
import ReadMoreReview from './ReadMoreReviewBtn';

//채팅 메시지 컴포넌트 임포트
import ChatMessage from './ChatMessage';
//채팅 메시지 입력 컴포넌트 임포트
import ChatMessageInputBox from './ChatMessageInputBox';


//사이드바 오픈 버튼 애니메이션 효과
const arrowAnimation = keyframes`
  0% { transform: translateX(0); }
  50% { transform: translateX(5px); }
  100% { transform: translateX(0); }
`;

//결과 분석 사이드바 애니메이션
const fadeIn = keyframes`
 from {
   opacity: 0;
   transform: translateX(20px);
 }
 to {
   opacity: 1;
   transform: translateX(0);
 }
`;

//결과 분석 사이드바 애니메이션
const fadeOut = keyframes`
 from {
   opacity: 1;
   transform: translateX(0);
 }
 to {
   opacity: 0;
   transform: translateX(20px);
 }
`;


// 타이핑 애니메이션 효과 정의
const typingAnimation = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

// 애니메이션이 적용된 메시지 스타일 컴포넌트
const AnimatedMessage = styled('div')(({ theme, animate }) => ({
  ...(animate && {
    animation: `${typingAnimation} 0.5s ease`
  })
}));

function Chat() {
  const [messages, setMessages] = useState([]);

  // 기존 메시지 로딩
  useEffect(() => {
    // API 호출을 통해 메시지를 가져오는 코드를 여기에 작성
    const initialMessages = [
      // 애니메이션 적용: false
      { id: 0, sender: 'user', text: 'https://www.coupang.com/vp/products/7945128164?itemId=22552512026&vendorItemId=89594440513&sourceType=CATEGORY&categoryId=502895&isAddedCart= 분석해주세요!' },
      { id: 1, sender: 'bot', text: '리뷰를 분석 중입니다... 분석이 완료되었습니다!' },
      { id: 2, sender: 'user', text: '오늘 날씨 어때요?' },
      { id: 3, sender: 'bot', text: '오늘은 맑고 따뜻합니다!' },
      // 임시 채팅 데이터 15개 추가
      /*
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
    ];
    setMessages(initialMessages);
  }, []);

  //사이드바 오픈 확인용
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  //오른쪽 사이드바 리뷰 저장용 변수
  const [reviews, setReviews] = useState([
    { id: 1, username: "poma****", date: "19.05.24.", content: "가격대비 좋은 것 같네요." },
    { id: 2, username: "luna****", date: "20.03.15.", content: "디자인이 너무 마음에 들어요!" },
    { id: 3, username: "sora****", date: "21.07.09.", content: "맨투맨 색상이 사진과 다른 거 같아요.." }
  ]);


  //사이드바 열림 상태 변경
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  //리뷰 더 불러오기
  const loadMoreReviews = () => {
    const newReviews = [
      { id: reviews.length + 1, username: reviews.length + 1, date: '20.04.17', content: `리뷰 내용 ${reviews.length + 1}` },
      { id: reviews.length + 2, username: reviews.length + 2, date: '22.06.02', content: `리뷰 내용 ${reviews.length + 2}` },
      { id: reviews.length + 3, username: reviews.length + 3, date: '18.02.22', content: `리뷰 내용 ${reviews.length + 3}` }
    ];
    setReviews([...reviews, ...newReviews]);
  };


  // 입력 필드 상태 관리
  const [inputValue, setInputValue] = useState('');

  // 메시지 추가 함수
  const addMessage = () => {
    if (inputValue.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: 'user',
        text: inputValue,
        animate: true,
      };

      setMessages([...messages, newMessage]);
      setInputValue('');
    }
  };


  return (
    <Box sx={{ display: 'flex' }}>
      {/* 채팅 메시지 박스와 입력 박스를 포함하는 컨테이너 */}
      <Box sx={{ display: 'flex', flexDirection: 'column', padding: '16px', marginLeft: '250px', marginTop: '80px', width: 'calc(100% - 400px)' }}>
        {/* 채팅 메시지 박스 */}
        <Box sx={{ height: 'calc(100vh - 250px)', overflowY: 'auto' }}>
        {console.log(messages)}
          {messages.map((message) => (
            <AnimatedMessage key={message.id} animate={message.animate}>
              <ChatMessage message={message} animate={message.animate}/>
            </AnimatedMessage>
          ))}
        </Box>
        {/* 채팅 메시지 입력 박스 */}
        <ChatMessageInputBox
          inputValue={inputValue}
          setInputValue={setInputValue}
          addMessage={addMessage}
        />
      </Box>

      <Box sx={{ position: 'relative', mt: '80px', mx: '15px', borderLeft: isSidebarOpen ? '0.1px solid #e3e3e3' : 'none' }}>
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
          <Box sx={{
            width: '300px',
            height: 'calc(100vh - 100px)',
            overflowY: 'hidden',
            animation: `${isSidebarOpen ? fadeIn : fadeOut} 0.5s forwards`
          }}>
            <ReviewAnalysis />
            {/* 썸네일 이미지 추가 */}
            <Box sx={{ textAlign: 'center', mt: 5 }}>
              <img src="/logo192.png" alt="썸네일 이미지" style={{ width: '100px', height: '100px' }} />
            </Box>
            <Box sx={{ maxHeight: 'calc(100vh - 600px)', overflowY: 'auto' }}>
              {reviews.map((review) => (
                <ReviewItem key={review.id} username={review.username} date={review.date} content={review.content} />
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
