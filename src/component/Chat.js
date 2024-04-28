import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';

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

  return (
    <Box sx={{ padding: '16px', marginLeft: '240px', marginTop: '80px', width: 'calc(100% - 400px)', height: 'calc(100vh - 300px)', overflowY: 'auto',}}>
      {messages.map((message) => (
        <Box
          key={message.id}
          sx={messageStyle(message.sender)}
        >
          <Typography variant="caption" sx={{ fontWeight: 'bold', color: message.sender === 'user' ? '#1976d2' : '#388e3c' }}>
            {message.sender === 'user' ? '사용자' : 'ARY'}
          </Typography>
          <Typography variant="body1" style={{ color: 'black' }}>{message.text}</Typography>
        </Box>
      ))}
    </Box>
  );
}

export default Chat;