import React, { useState } from "react";
import {
	Drawer,
	List,
	ListItem,
	ListItemText,
	Divider,
	Avatar,
	ListItemAvatar,
	Box,
	IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"; // Import CloseIcon
import styles from "../view/Sidebar.module.css"; // CSS 모듈 임포트
import { useLocation } from "react-router-dom";

const initialChatItems = ["맨투맨", "운동화", "애견 간식"];
const initialLastQuestionItems = [
	"사이즈가 넉넉한 편인가요?",
	"배송은 얼마나 걸리나요?",
	"포함된 알레르기 성분 알려주세요 특히 소고기 포함되는지 알고 싶어요",
];

const Sidebar = () => {
	const location = useLocation();
	const [selectedItem, setSelectedItem] = useState(null);
	const [hoveredItem, setHoveredItem] = useState(null);
	const [chatItems, setChatItems] = useState(initialChatItems);
	const [lastQuestionItems, setLastQuestionItems] = useState(
		initialLastQuestionItems
	);

	const clickHandler = (text) => {
		if (text === "") {
			window.location.href = "/";
		} else {
			setSelectedItem(text);
			window.location.href = "/result";
		}
	};

	const deleteHandler = (index) => {
		setChatItems((prevItems) => prevItems.filter((_, i) => i !== index));
		setLastQuestionItems((prevItems) =>
			prevItems.filter((_, i) => i !== index)
		);
	};

	const renderChatItems = () =>
		chatItems.map((text, index) => (
			<div
				key={index}
				onMouseEnter={() => setHoveredItem(index)}
				onMouseLeave={() => setHoveredItem(null)}
			>
				<ListItem
					button
					onClick={() => clickHandler(text)}
					selected={selectedItem === text}
					className={styles.listItem}
					sx={{
						width: "225px",
						marginLeft: "5px",
						"&:hover": {
							backgroundColor: "lightgray",
							borderRadius: "5px",
						},
					}}
				>
					<ListItemText
						primary={
							<Box
								sx={{
									display: "flex",
									alignItems: "center",
									width: "100%",
								}}
							>
								<div
									style={{
										overflow: "hidden",
										whiteSpace: "nowrap",
										textOverflow: "ellipsis",
										flex: 1, // Allow this to take up remaining space
									}}
								>
									{text}
								</div>
								{hoveredItem === index && (
									<IconButton
										className={styles.deleteButton}
										onClick={(e) => {
											e.stopPropagation(); // Prevent the item click handler from triggering
											deleteHandler(index);
										}}
										size="small"
									>
										<CloseIcon
											sx={{ fontSize: "20px" }} // Set custom font size
										/>
									</IconButton>
								)}
							</Box>
						}
						secondary={
							lastQuestionItems[index] &&
							lastQuestionItems[index].length > 20 ? (
								<Box
									component="span"
									sx={{
										color: "gray",
										fontSize: "12px",
										overflow: "hidden",
										whiteSpace: "nowrap",
										textOverflow: "ellipsis",
									}}
								>
									{lastQuestionItems[index].slice(0, 20) + "..."}
								</Box>
							) : (
								<Box
									component="span"
									sx={{
										color: "gray",
										fontSize: "12px",
										overflow: "hidden",
										whiteSpace: "nowrap",
										textOverflow: "ellipsis",
									}}
								>
									{lastQuestionItems[index]}
								</Box>
							)
						}
					/>
				</ListItem>
			</div>
		));

	return (
		<Drawer
			variant="permanent"
			anchor="left"
			sx={{
				width: 250,
				flexShrink: 0,
				display: "flex",
				flexDirection: "column",
				"& .MuiDrawer-paper": {
					width: 250,
					marginTop: "64px",
					boxSizing: "border-box",
					backgroundColor: "white",
				},
			}}
		>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					height: "90%",
				}}
			>
				<ListItem
					button
					onClick={() => clickHandler("")}
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						backgroundColor: "#007F73",
						borderRadius: "20px",
						width: "190px",
						height: "45px",
						mx: "auto",
						mt: 1,
						"&:hover": {
							backgroundColor: "#007F73",
						},
					}}
				>
					<ListItemText
						primary={
							<span style={{ fontWeight: "bold", fontSize: "18px" }}>
								새로운 채팅
							</span>
						}
						className={styles.listItemTextCenter}
					/>
				</ListItem>
				<Box
					sx={{
						marginLeft: "16px",
						color: "gray",
						fontSize: "12px",
						mt: 2,
					}}
				>
					상품 내역
				</Box>
				<Box
					sx={{
						height: "75%",
						display: "flex",
						justifyContent: "center",
					}}
				>
					<List className={styles.drawerList}>{renderChatItems()}</List>
				</Box>
				<Divider className={styles.divider} />
				<Box>
					<ListItem>
						<ListItemAvatar>
							<Avatar>KCS</Avatar>
						</ListItemAvatar>
						<ListItemText primary="김창식" />
					</ListItem>
				</Box>
			</Box>
		</Drawer>
	);
};

export default Sidebar;
