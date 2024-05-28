import React from "react";
import { Box, Button } from "@mui/material";

const ReadMoreReview = ({ onClick, text }) => {
	return (
		<Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
			<Button
				variant="contained"
				onClick={onClick}
				sx={{
					fontWeight: "bold",
					backgroundColor: "#007F73",
					"&:hover": {
						backgroundColor: "#00695c",
					},
				}}
			>
				{text}
			</Button>
		</Box>
	);
};

export default ReadMoreReview;
