import React from "react";
import { Box, TextField, Button } from "@mui/material";

function ChatMessageInputBox({ inputValue, setInputValue, addMessage }) {
	return (
		<Box sx={{ display: "flex", alignItems: "center", gap: "8px", mt: 2 }}>
			<TextField
				fullWidth
				variant="outlined"
				placeholder="메시지를 입력하세요"
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						addMessage();
					}
				}}
			/>
			<Button
				variant="contained"
				onClick={addMessage}
				sx={{
					marginLeft: "8px",
					backgroundColor: "#007f73",
					fontWeight: "bold",
					height: "56px",
					"&:hover": {
						backgroundColor: "#00695c",
					},
				}}
			>
				전송
			</Button>
		</Box>
	);
}

export default ChatMessageInputBox;
