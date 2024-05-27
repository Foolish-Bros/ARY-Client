import React from 'react';
import { Box, Typography, Rating, LinearProgress } from '@mui/material';

// 제목 컴포넌트
const ReviewAnalysisTitle = () => (
  <Typography
    variant="h5"
    gutterBottom
    textAlign="center"
    sx={{ fontWeight: "bold" }}
  >
    맨투맨
    <br/>
    리뷰 분석
  </Typography>
);

// 평균 별점 컴포넌트
const AverageRating = ({ rating }) => (
  <Box sx={{ textAlign: "center", mt: 2 }}>
    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
      평균 별점
    </Typography>
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mt: 1,
      }}
    >
      <Typography variant="body2" sx={{ mr: 2 }}>
        {rating}점
      </Typography>
      <Rating name="read-only" value={rating} readOnly precision={0.25} />
    </Box>
  </Box>
);

// 긍/부정 비율 컴포넌트
const SentimentRatio = ({ positivePercentage, negativePercentage }) => (
  <>
    <Typography
      variant="h6"
      textAlign="center"
      sx={{ mt: 2, fontWeight: "bold" }}
    >
      긍/부정 비율
    </Typography>
    <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
      <Typography
        variant="body2"
        textAlign="center"
        sx={{ width: "40%", pr: 1 }}
      >
        긍정 ({positivePercentage}%)
      </Typography>
      <LinearProgress
        variant="determinate"
        value={positivePercentage}
        sx={{ width: "60%", height: 10, borderRadius: 5 }}
      />
    </Box>
    <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
      <Typography
        variant="body2"
        textAlign="center"
        sx={{ width: "40%", pr: 1 }}
      >
        부정 ({negativePercentage}%)
      </Typography>
      <LinearProgress
        variant="determinate"
        value={negativePercentage}
        color="secondary"
        sx={{ width: "60%", height: 10, borderRadius: 5 }}
      />
    </Box>
  </>
);

// 메인 컴포넌트
const ReviewAnalysis = () => {
  const averageRating = 3.75;
  const positivePercentage = 75;
  const negativePercentage = 25;

  return (
    <Box sx={{ padding: 2 }}>
      <ReviewAnalysisTitle />
      <AverageRating rating={averageRating} />
      <SentimentRatio
        positivePercentage={positivePercentage}
        negativePercentage={negativePercentage}
      />
    </Box>
  );
};

export default ReviewAnalysis;