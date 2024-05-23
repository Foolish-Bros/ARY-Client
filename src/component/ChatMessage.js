// ChatMessage.js
import React from 'react';
import { Box, Typography } from '@mui/material';

const messageStyle = (sender) => ({
  margin: '8px',
  padding: '16px',
  borderRadius: '8px',
  backgroundColor: 'transparent',
  color: sender === 'user' ? '#1976d2' : '#388e3c',
  border: `1px solid ${sender === 'user' ? '#90caf9' : '#c5e1a5'}`,
  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
  textAlign: 'left',
  display: 'flex',
  flexDirection: 'column',
});

const ChatMessage = ({ message }) => {
  return (
    <Box sx={messageStyle(message.sender)}>
      <Typography variant="caption" sx={{ fontWeight: 'bold', color: message.sender === 'user' ? '#1976d2' : '#388e3c' }}>
        {message.sender === 'user' ? '사용자' : 'ARY'}
      </Typography>
      <Typography variant="body1" style={{ color: 'black' }}>{message.text}</Typography>
    </Box>
  );
};

export default ChatMessage;
