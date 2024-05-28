import React, { useEffect, useState } from "react";
import {
	Drawer,
	List,
	ListItem,
	ListItemText,
	Divider,
	Box,
	IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"; // Import CloseIcon
import styles from "../view/Sidebar.module.css"; // CSS 모듈 임포트
import { useLocation } from "react-router-dom";

//프로필 컴포넌트 임포트
import Profile from "./Profile";

import axios from "../axios";
import { useCookies } from "react-cookie";

const Sidebar = () => {
	const location = useLocation();
	const [username, setUsername] = useState("");
	const [selectedItem, setSelectedItem] = useState(null);
	const [hoveredItem, setHoveredItem] = useState(null);
	const [chatItems, setChatItems] = useState([]);
	const [lastQuestionItems, setlastQuestionItems] = useState([]);
	const [itemData, setItemData] = useState([]); // id와 reviewId를 저장할 상태

	//쿠키
	const [cookies, setCookies, removeCookie] = useCookies(['token']);

	useEffect(() => {
		const token = cookies.token;
		axios
			.get("/member/results", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				if (res.data.success) {
					const chatItems = res.data.data.map(item => item.title || '');
					const lastQuestionItems = res.data.data.map(item => {
                        const questions = item.questionList;
                        return questions.length > 0 ? questions[questions.length - 1].question : '';
                    });
					const itemData = res.data.data.map(item => ({
						id: item.id,
						reviewId: item.reviewId
					}));
					setChatItems(chatItems);
					setlastQuestionItems(lastQuestionItems);
					setItemData(itemData); // id와 reviewId를 저장

					// username 저장
					if (res.data.data.length > 0 && res.data.data[0].member) {
						setUsername(res.data.data[0].member.name);
					}

				} else {
					alert("초기 데이터 설정에서 오류가 발생하였습니다.");
				}
			})
			.catch((err) => {
				console.log(err);
			});

	}, [cookies.token]);

	const clickHandler = (index, text) => {
		if (text === "") {
			window.location.href = "/";
		} else {
			const resultId = itemData[index].id;
			if(resultId){
				window.location.href = `/result?id=${resultId}`;
			}
		}
	};

	const deleteHandler = (index) => {
		const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
		if (confirmDelete) {
			const resultId = itemData[index].id; //리뷰 아이디와 구별을 위해 id를 결과 아이디로 사용
			axios
				.delete("/result/delete", { data: { resultId } })
				.then((res) => {
					if (res.data.success) {
						setChatItems((prevItems) => prevItems.filter((_, i) => i !== index));
						setlastQuestionItems((prevItems) => prevItems.filter((_, i) => i !== index));
						setItemData((prevItems) => prevItems.filter((_, i) => i !== index)); // 삭제 시 itemData도 업데이트
					} else {
						alert("삭제에 실패하였습니다.");
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}
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
					onClick={() => clickHandler(index, text)}
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
				<Profile username={username} />
			</Box>
		</Drawer>
	);
};

export default Sidebar;
