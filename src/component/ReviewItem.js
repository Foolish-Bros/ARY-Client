import React from "react";
import { Box, Typography } from "@mui/material"

// 개별 리뷰 항목을 위한 컴포넌트
const ReviewItem = ({ id, username, date, content }) => (
    <Box sx={{ mt: 2, mx: 2 }}>
        <Typography variant="body2">{username}님 {date}</Typography>
        <Typography variant="body2">{content}</Typography>
    </Box>
);

export default ReviewItem;