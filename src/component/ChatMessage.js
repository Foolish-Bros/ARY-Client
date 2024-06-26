import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";

// 스타일 함수 업데이트
const messageStyle = (sender) => ({
	margin: "10px 0",
	padding: "14px 24px",
	borderRadius: "24px",
	backgroundColor: sender === "user" ? "#5bae70" : "#ebebeb", // 사용자는 메인 색상, ARY는 회색 배경
	color: sender === "user" ? "white" : "black", // 사용자는 흰색 글씨, ARY는 검은 글씨
	border: "none",
	boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
	textAlign: "left",
	flexDirection: "column",
	alignSelf: sender === "user" ? "flex-start" : "flex-end",
	wordWrap: "break-word", // 긴 텍스트 처리
});

const ChatMessage = ({ message, animate }) => {
	const [displayText, setDisplayText] = useState("");
	const [index, setIndex] = useState(0); // index를 상태로 관리

	useEffect(() => {
		// 애니메이션 조건 추가: animate가 true이고 sender가 ARY일 때
		if (animate && message.sender === "ARY") {
			setDisplayText(""); // 애니메이션 시작 시 displayText 초기화
			setIndex(0); // index 초기화
		} else {
			// animate가 false이거나 sender가 ARY가 아닐 경우, 전체 메시지를 바로 표시
			setDisplayText(message.text);
		}
	}, [animate, message.sender, message.text]);

	useEffect(() => {
		// 애니메이션 조건 추가: animate가 true이고 sender가 ARY일 때, index 검사
		if (animate && message.sender === "ARY" && index < message.text.length) {
			const timer = setTimeout(() => {
				setDisplayText((prev) => prev + message.text.charAt(index));
				setIndex(index + 1);
			}, 5); // 5ms는 타이핑 속도
			return () => clearTimeout(timer);
		}
	}, [animate, index, message.sender, message.text]);

	const replaceNewlinesWithBreaks = (text) => {
		return text.split("\\n").map((str, index) => (
			<React.Fragment key={index}>
				{str}
				<br />
			</React.Fragment>
		));
	};

	return (
		<Box sx={messageStyle(message.sender)}>
			<Typography
				variant="caption"
				sx={{ fontWeight: "bold", marginBottom: "4px" }}
			>
				{message.sender === "user" ? "사용자" : "ARY"}
			</Typography>
			<Typography
				variant="body2"
				style={{ fontWeight: "bold", whiteSpace: "pre-line" }}
			>
				{replaceNewlinesWithBreaks(displayText)}
				{/* {displayText} */}
			</Typography>
		</Box>
	);
};

export default ChatMessage;
