import React, { useState, useEffect, useRef } from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { keyframes, styled } from "@mui/material";

// 오른쪽 사이드바 컴포넌트 임포트
import ReviewAnalysis from "../component/ReviewAnalysis";
import ReviewItem from "../component/ReviewItem";
import ReadMoreReview from "./ReadMoreReviewBtn";

//채팅 메시지 컴포넌트 임포트
import ChatMessage from "./ChatMessage";
//채팅 메시지 입력 컴포넌트 임포트
import ChatMessageInputBox from "./ChatMessageInputBox";

import axios from "../axios";
import { useLocation, useSearchParams } from "react-router-dom";
import { useCookies } from "react-cookie";

//사이드바 오픈 버튼 애니메이션 효과
const arrowAnimation = keyframes`
  0% { transform: translateX(0); }
  50% { transform: translateX(5px); }
  100% { transform: translateX(0); }
`;

//결과 분석 사이드바 애니메이션
const fadeIn = keyframes`
 from {
   opacity: 0;
   transform: translateX(20px);
 }
 to {
   opacity: 1;
   transform: translateX(0);
 }
`;

//결과 분석 사이드바 애니메이션
const fadeOut = keyframes`
 from {
   opacity: 1;
   transform: translateX(0);
 }
 to {
   opacity: 0;
   transform: translateX(20px);
 }
`;

// 타이핑 애니메이션 효과 정의
const typingAnimation = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

// 애니메이션이 적용된 메시지 스타일 컴포넌트
const AnimatedMessage = styled("div")(({ theme, animate }) => ({
	...(animate && {
		animation: `${typingAnimation} 0.5s ease`,
	}),
}));

function Chat() {
	const location = useLocation();
	const [idParams, setIdParams] = useSearchParams();
	const [cookies, setCookies, removeCookies] = useCookies([
		"token",
		"crawl",
		"resultId",
		"reviewId",
	]);
	const token = cookies.token;
	let site;
	let url;
	if (location.state) {
		site = location.state.site;
		url = location.state.url;
	}
	const [messages, setMessages] = useState(["token"]);

	//로딩되었는지 확인하는 용도
	const [isLoaded, setIsLoaded] = useState(false);

	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	// 오른쪽 사이드바 리뷰 관련
	let reviewId = "";
	const [title, setTitle] = useState("");
	const [totalRate, setTotalRate] = useState("");
	const [reviews, setReviews] = useState([]);
	const [thumbnail, setThumbnail] = useState("");
	const [times, setTimes] = useState(1);

	// 결과 관련
	let resultId = "";

	// 기존 메시지 로딩
	useEffect(() => {
		// API 호출을 통해 메시지를 가져오는 코드를 여기에 작성
		const initialMessages = [
			// 애니메이션 적용: false
			{
				id: 1,
				sender: "user",
				text: "https://www.coupang.com/vp/products/7945128164?itemId=22552512026&vendorItemId=89594440513&sourceType=CATEGORY&categoryId=502895&isAddedCart= 분석해주세요!",
			},
			{
				id: 2,
				sender: "bot",
				text: "리뷰를 분석 중입니다... 분석이 완료되었습니다!",
			},
			{ id: 3, sender: "user", text: "오늘 날씨 어때요?" },
			{ id: 4, sender: "bot", text: "오늘은 맑고 따뜻합니다!" },
		];
		setMessages(initialMessages);
	}, []);

	// MainView를 통해 들어온 경우(크롤링 검색을 한 경우)
	useEffect(async () => {
		async function loadReviews(id) {
			const res = await axios
				.get("/review/load", {
					params: { id: id },
				})
				.catch((err) => {
					console.log(err);
				});

			if (res.data.success) {
				setIsLoaded(true);
				reviewId = res.data.data.id;
				setTitle(res.data.data.title);
				setTotalRate(res.data.data.totalRate);
				setReviews(res.data.data.reviews);
				setThumbnail(res.data.data.thumbnail);
			}
		}

		async function loadResult(id) {
			const res = await axios
				.get("/result/load", {
					params: { id: id },
				})
				.catch((err) => {
					console.log(err);
				});

			if (res.data.success) {
				// TODO: message logic 채워넣어야됌
				reviewId = res.data.data.reviewId;
			}
		}
		async function crawling() {
			removeCookies("reviewId");
			removeCookies("resultId");
			const res = await axios.post(
				"/review/crawling",
				{
					url: url,
					type: site,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (res.data.success) {
				alert("크롤링 완료!");
				console.log(res);
				setIsLoaded(true);
				reviewId = res.data.data.id;
				setTitle(res.data.data.title);
				setTotalRate(res.data.data.totalRate);
				setReviews(res.data.data.reviews);
				setThumbnail(res.data.data.thumbnail);

				axios
					.post(
						"/result/create",
						{
							reviewId: reviewId,
						},
						{
							headers: {
								Authorization: `Bearer ${token}`,
							},
						}
					)
					.then((res) => {
						if (res.data.success) {
							resultId = res.data.data.id;
							removeCookies("crawl");
							setCookies("reviewId", reviewId, {
								path: "/result",
								secure: "/",
								domain: "localhost",
								sameSite: "strict",
								expires: new Date(Date.now() + 3600000),
							});
							setCookies("resultId", resultId, {
								path: "/result",
								secure: "/",
								domain: "localhost",
								sameSite: "strict",
								expires: new Date(Date.now() + 3600000),
							});
						}
					})
					.catch((res) => {
						console.log(res);
					});
			}
		}
		if (idParams) {
			removeCookies("resultId");
			removeCookies("reviewId");
			resultId = idParams.get("id");
			await loadResult(resultId);
			loadReviews(reviewId);
		} else {
			if (cookies.crawl === "yes") {
				crawling();
			} else {
				resultId = cookies.resultId;
				loadReviews(cookies.reviewId);
				loadResult(cookies.resultId);
			}
		}
	}, []);

	// // 이미 한번 크롤링하고 새로고침하는 경우
	// useEffect(() => {
	// 	async function loadReviews() {
	// 		const res = await axios
	// 			.get("/review/load", {
	// 				params: { id: cookies.reviewId },
	// 			})
	// 			.catch((err) => {
	// 				console.log(err);
	// 			});

	// 		if (res.data.success) {
	// 			setIsLoaded(true);
	// 			id = res.data.data.id;
	// 			setTitle(res.data.data.title);
	// 			setTotalRate(res.data.data.totalRate);
	// 			setReviews(res.data.data.reviews);
	// 			setThumbnail(res.data.data.thumbnail);
	// 		}
	// 	}

	// 	async function loadResult() {
	// 		const res = await axios
	// 			.get("/result/load", {
	// 				params: { id: cookies.resultId },
	// 			})
	// 			.catch((err) => {
	// 				console.log(err);
	// 			});
	// 		console.log(res);
	// 		if (res.data.success) {
	// 			// TODO: message logic 채워넣어야됌
	// 			alert("called");
	// 		}
	// 	}

	// 	if (cookies.reviewId && cookies.resultId) {
	// 		alert("refresh");
	// 		loadReviews();
	// 		loadResult();
	// 	}
	// }, []);

	// 기존 메시지 로딩
	// useEffect(() => {
	//   const fetchMessages = async () => {
	//     try {
	//       const id = "6649b5a5d5004d76b2c6ee40";

	//       console.log('Sending request with ID:', id); // 요청 전에 로그 추가

	//       const response = await axios.get('/result/load', {
	//         params: { id }
	//       });

	//       console.log('Received response:', response); // 응답 후에 로그 추가

	//       if (response.data.success) {
	//         const questionList = response.data.data.questionList;
	//         const initialMessages = questionList.map((data, index) => [
	//           {
	//             id: index * 2 + 1,
	//             sender: 'user',
	//             text: data.question,
	//           },
	//           {
	//             id: index * 2 + 2,
	//             sender: 'bot',
	//             text: data.answer,
	//           },
	//         ]).flat();

	//         setMessages(initialMessages);
	//       } else {
	//         console.error('Failed to fetch messages: ', response.data.message);
	//       }
	//     } catch (error) {
	//       console.error('Failed to fetch messages:', error);
	//     }
	//   };

	//   fetchMessages();
	// }, []);

	//사이드바 오픈 확인용

	//사이드바 열림 상태 변경

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	//리뷰 더 불러오기
	const loadMoreReviews = async () => {
		const res = await axios.post("/review/crawling/more", {
			id: reviewId,
			times: times + 1,
		});

		if (res.data.success) {
			alert("크롤링 완료!");
			setReviews(res.data.data.reviews);
			setTimes(times + 1);
		}
	};

	// 입력 필드 상태 관리
	const [inputValue, setInputValue] = useState("");

	// 메시지 추가 함수
	const addMessage = () => {
		if (inputValue.trim()) {
			const newMessage = {
				id: messages.length + 1,
				sender: "user",
				text: inputValue,
				animate: true,
			};

			setMessages([...messages, newMessage]);
			setInputValue("");
		}
	};

	//스크롤 하단 내용 보여주기용 변수
	const ReviewScrollRef = useRef(null); //Review 더보기
	const ChatMessageScrollRef = useRef(null); //채팅 메시지 증가

	useEffect(() => {
		// reviews가 업데이트될 때마다 스크롤을 하단으로 이동
		if (ReviewScrollRef.current) {
			ReviewScrollRef.current.scrollTop = ReviewScrollRef.current.scrollHeight;
		}
	}, [reviews]);

	useEffect(() => {
		// 채팅 메시지가 업데이트될 때마다 스크롤을 하단으로 이동
		if (ChatMessageScrollRef.current) {
			setTimeout(() => {
				ChatMessageScrollRef.current.scrollTop =
					ChatMessageScrollRef.current.scrollHeight;
			}, 80); // setTimeout으로 다음 이벤트 루프까지 기다림
		}
	}, [messages, isLoaded]);

	return isLoaded || cookies.crawl !== "yes" ? (
		<Box sx={{ display: "flex" }}>
			{/* 채팅 메시지 박스와 입력 박스를 포함하는 컨테이너 */}
			<Box
				sx={
					isSidebarOpen
						? {
								display: "flex",
								flexDirection: "column",
								padding: "16px",
								marginLeft: "250px",
								marginTop: "80px",
								width: "calc(100% - 620px)",
						  }
						: {
								display: "flex",
								flexDirection: "column",
								padding: "16px",
								marginLeft: "250px",
								marginTop: "80px",
								width: "100%",
						  }
				}
			>
				{/* 채팅 메시지 박스 */}
				<Box
					sx={{ height: "calc(100vh - 250px)", overflowY: "auto" }}
					fullWidth
					ref={ChatMessageScrollRef}
				>
					{messages.map((message, idx) => (
						<AnimatedMessage key={idx} animate={message.animate}>
							<ChatMessage message={message} animate={message.animate} />
						</AnimatedMessage>
					))}
				</Box>
				{/* 채팅 메시지 입력 박스 */}
				<ChatMessageInputBox
					inputValue={inputValue}
					setInputValue={setInputValue}
					addMessage={addMessage}
				/>
			</Box>

			<Box
				sx={{
					position: "relative",
					mt: "80px",
					mx: "15px",
					borderLeft: isSidebarOpen ? "0.1px solid #e3e3e3" : "none",
					overflowY: "scroll",
				}}
			>
				<Tooltip
					title={isSidebarOpen ? "결과 분석 닫기" : "결과 분석 열기"}
					placement="left"
				>
					<IconButton
						onClick={toggleSidebar}
						sx={{
							position: "fixed",
							top: "90px",
							right: "15px",
							zIndex: 1300,
							"&:hover .MuiSvgIcon-root": {
								animation: `${arrowAnimation} 1s infinite`,
							},
						}}
					>
						{isSidebarOpen ? <ChevronRightIcon /> : <ChevronLeftIcon />}
					</IconButton>
				</Tooltip>
				{isSidebarOpen && (
					<Box
						sx={{
							width: "300px",
							height: "calc(100vh - 100px)",
							overflowX: "hidden",
							overflowY: "scoll",
							animation: `${isSidebarOpen ? fadeIn : fadeOut} 0.5s forwards`,
						}}
					>
						<ReviewAnalysis title={title} totalRate={Number(totalRate)} />
						{/* 썸네일 이미지 추가 */}
						<Box sx={{ textAlign: "center", mt: 5 }}>
							<img
								src={thumbnail}
								alt="썸네일 이미지"
								style={{ width: "150px", height: "150px" }}
							/>
						</Box>
						<Box
							sx={{ height: "auto" }}
							// ref를 Box 컴포넌트에 연결
							ref={ReviewScrollRef}
						>
							{reviews.map((review, idx) => (
								<ReviewItem
									key={idx}
									rate={review.rate}
									date={review.date}
									content={review.content}
								/>
							))}
							{/* 리뷰 더보기 버튼 추가 */}
							<ReadMoreReview onClick={loadMoreReviews} />
						</Box>
					</Box>
				)}
			</Box>
		</Box>
	) : (
		<div
			style={{
				paddingLeft: "250px",
				paddingTop: "64px",
				justifyContent: "center",
				alignItems: "center",
				fontSize: "50px",
				width: "100vh",
				height: "100vh",
				fontWeight: "bold",
			}}
		>
			<p>Loading...</p>
		</div>
	);
}

export default Chat;
