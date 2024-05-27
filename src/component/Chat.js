import React, { useState, useEffect, useRef } from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
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

import axios from '../axios';


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
      { id: 1, sender: 'user', text: 'https://www.coupang.com/vp/products/7945128164?itemId=22552512026&vendorItemId=89594440513&sourceType=CATEGORY&categoryId=502895&isAddedCart= 분석해주세요!' },
      { id: 2, sender: 'bot', text: '리뷰를 분석 중입니다... 분석이 완료되었습니다!' },
      { id: 3, sender: 'user', text: '오늘 날씨 어때요?' },
      { id: 4, sender: 'bot', text: '오늘은 맑고 따뜻합니다!' },
    ];
    setMessages(initialMessages);
  }, []);

  /*
  // 기존 메시지 로딩
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const id = "6649b5a5d5004d76b2c6ee40";
  
        console.log('Sending request with ID:', id); // 요청 전에 로그 추가
  
        const response = await axios.get('/result/load', {
          params: { id }
        });
  
        console.log('Received response:', response); // 응답 후에 로그 추가
  
        if (response.data.success) {
          const questionList = response.data.data.questionList;
          const initialMessages = questionList.map((data, index) => [
            {
              id: index * 2 + 1,
              sender: 'user',
              text: data.question,
            },
            {
              id: index * 2 + 2,
              sender: 'bot',
              text: data.answer,
            },
          ]).flat();
  
          setMessages(initialMessages);
        } else {
          console.error('Failed to fetch messages: ', response.data.message);
        }
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      }
    };
  
    fetchMessages();
  }, []);
 */ 

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

  //스크롤 하단 내용 보여주기용 변수
  const ReviewScrollRef = useRef(null); //Review 더보기
  const ChatMessageScrollRef = useRef(null); //채팅 메시지 증가

  useEffect(() => {
    // reviews가 업데이트될 때마다 스크롤을 하단으로 이동
    if (ReviewScrollRef.current) {
      ReviewScrollRef.current.scrollTop = ReviewScrollRef.current.scrollHeight;
    }
  }, [reviews]);

  useEffect(() => {
    // 채팅 메시지가 업데이트될 때마다 스크롤을 하단으로 이동
    if (ChatMessageScrollRef.current) {
      setTimeout(() => {
        ChatMessageScrollRef.current.scrollTop = ChatMessageScrollRef.current.scrollHeight;
      }, 80); // setTimeout으로 다음 이벤트 루프까지 기다림
    }
  }, [messages]);


  return (
    <Box sx={{ display: 'flex' }}>
      {/* 채팅 메시지 박스와 입력 박스를 포함하는 컨테이너 */}
      <Box sx={{ display: 'flex', flexDirection: 'column', padding: '16px', marginLeft: '250px', marginTop: '80px', width: 'calc(100% - 400px)' }}>
        {/* 채팅 메시지 박스 */}
        <Box sx={{ height: 'calc(100vh - 250px)', overflowY: 'auto' }}
          ref={ChatMessageScrollRef}
        >
          {messages.map((message) => (
            <AnimatedMessage key={message.id} animate={message.animate}>
              <ChatMessage message={message} animate={message.animate} />
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
              <img src="/logo192.png" alt="썸네일 이미지" style={{ width: '150px', height: '150px' }} />
            </Box>
            <Box sx={{ maxHeight: 'calc(100vh - 600px)', overflowY: 'auto' }}
              ref={ReviewScrollRef} // ref를 Box 컴포넌트에 연결
            >
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
