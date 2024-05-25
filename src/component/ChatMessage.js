import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

// 스타일 함수 업데이트
const messageStyle = (sender) => ({
  margin: '10px 0',
  padding: '14px 24px',
  borderRadius: '24px',
  backgroundColor: sender === 'user' ? '#5bae70' : '#ebebeb', // 사용자는 메인 색상, ARY는 회색 배경
  color: sender === 'user' ? 'white' : 'black', // 사용자는 흰색 글씨, ARY는 검은 글씨
  border: 'none',
  boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
  textAlign: 'left',
  flexDirection: 'column',
  alignSelf: sender === 'user' ? 'flex-start' : 'flex-end',
  wordWrap: 'break-word', // 긴 텍스트 처리
});

const ChatMessage = ({ message, animate }) => {
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0); // index를 상태로 관리

  useEffect(() => {
    if (animate) {
      setDisplayText(''); // 애니메이션 시작 시 displayText 초기화
      setIndex(0); // index 초기화
    } else {
      // animate가 false일 경우, 전체 메시지를 바로 표시
      setDisplayText(message.text);
    }
  }, [message.text]); // message.text가 변경될 때만 이 로직을 실행

  useEffect(() => {
    if (animate && index < message.text.length) {
      const timer = setTimeout(() => {
        setDisplayText((prev) => prev + message.text.charAt(index));
        setIndex(index + 1);
      }, 75); // 75ms는 타이핑 속도
      return () => clearTimeout(timer);
    }
  }, [animate, index, message.text]); // animate, index, message.text가 변경될 때마다 이 로직을 실행

  return (
    <Box sx={messageStyle(message.sender)}>
      <Typography variant="caption" sx={{ fontWeight: 'bold', marginBottom: '4px' }}>
        {message.sender === 'user' ? '사용자' : 'ARY'}
      </Typography>
      <Typography variant="body2" style={{ fontWeight: 'bold' }}>
        {displayText}
      </Typography>
    </Box>
  );
};

export default ChatMessage;
