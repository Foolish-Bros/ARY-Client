import React from "react";
import { Box, Typography } from "@mui/material";

// 개별 리뷰 항목을 위한 컴포넌트
const ReviewItem = ({ username, rate, date, content }) => {
	const newDate = new Date(date);

	// 연, 월, 일 추출
	const year = newDate.getFullYear();
	const month = newDate.getMonth() + 1; // 0부터 시작하기 때문에 1을 더함
	const day = newDate.getDate();

	// 추출한 날짜를 변수에 저장
	const extractedDate = `${year}-${month.toString().padStart(2, "0")}-${day
		.toString()
		.padStart(2, "0")}`;

	return (
		<Box sx={{ mt: 2, mx: 2 }}>
			<Typography variant="body2">
				별점: {rate} || {extractedDate}
			</Typography>
			<span>------------------</span>
			<Typography variant="body2">{content}</Typography>
			<br />
			<br />
		</Box>
	);
};

export default ReviewItem;
