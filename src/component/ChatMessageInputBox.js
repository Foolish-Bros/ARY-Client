import React from 'react';
import { Box, TextField, Button } from '@mui/material';

function ChatMessageInputBox({ inputValue, setInputValue, addMessage }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="메시지를 입력하세요"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            addMessage();
          }
        }}
      />
      <Button variant="contained" color="primary" onClick={addMessage} sx={{ marginLeft: '8px' }}>
        전송
      </Button>
    </Box>
  );
}

export default ChatMessageInputBox;