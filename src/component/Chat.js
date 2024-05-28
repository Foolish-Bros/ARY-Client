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
	const [idParams] = useSearchParams();
	const [cookies, setCookies, removeCookies] = useCookies([
		"token",
		"crawl",
		"resultId",
		"reviewId",
	]);
	const [baseUrl, setBaseUrl] = useState("");
	const [currentEmail, setCurrentEmail] = useState("");
	const [resultEmail, setResultEmail] = useState("");
	const token = cookies.token;
	let site;
	let url;
	if (location.state) {
		site = location.state.site;
		url = location.state.url;
	}
	const [messages, setMessages] = useState([]);

	//로딩되었는지 확인하는 용도
	const [isLoaded, setIsLoaded] = useState(false);
	const [moreText, setMoreText] = useState("더보기");
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	// 오른쪽 사이드바 리뷰 관련
	let reviewId = "";
	const [forMore, setForMore] = useState("");
	const [title, setTitle] = useState("");
	const [totalRate, setTotalRate] = useState("");
	const [reviews, setReviews] = useState([]);
	const [thumbnail, setThumbnail] = useState("");
	const [times, setTimes] = useState(1);

	// 결과 관련
	let resultId = "";

	useEffect(() => {
		if (!cookies.token) {
			alert("로그인 후 이용하세요");
			window.location.replace("/login");
		}
	}, []);

	// MainView를 통해 들어온 경우
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
				setBaseUrl(res.data.data.url);
				reviewId = res.data.data.id;
				setForMore(reviewId);
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
				// TODO: message logic 채워넣어야됌 --> 그래야 메세지 이슈 사라짐
				const questionList = res.data.data.questionList;
				if (questionList !== null) {
					questionList.map((msg, idx) => {
						setMessages((messages) => [
							...messages,
							{
								animate: true,
								sender: "user",
								text: msg.question,
							},
						]);
						setMessages((messages) => [
							...messages,
							{
								animate: true,
								sender: "bot",
								text: msg.answer,
							},
						]);
					});
				}

				reviewId = res.data.data.reviewId;
				setResultEmail(res.data.data.member.email);
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
				setIsLoaded(true);
				reviewId = res.data.data.id;
				setForMore(reviewId);
				setTitle(res.data.data.title);
				setTotalRate(res.data.data.totalRate);
				setReviews(res.data.data.reviews);
				setThumbnail(res.data.data.thumbnail);

				await axios
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
							setCookies("reviewId", reviewId, {
								path: "/result",
								domain: "all-review-young.site",
								sameSite: "strict",
								expires: new Date(Date.now() + 3600000),
							});
							setCookies("resultId", resultId, {
								path: "/result",
								domain: "all-review-young.site",
								sameSite: "strict",
								expires: new Date(Date.now() + 3600000),
							});
							setMessages((messages) => [
								...messages,
								{
									animate: true,
									sender: "bot",
									text: "리뷰를 불러왔습니다!",
								},
							]);
							removeCookies("crawl", {
								path: "/",
								domain: "all-review-young.site",
							});
							reviewId = res.data.data.reviewId;
							setResultEmail(res.data.data.member.email);
							window.location.reload();
						}
					})
					.catch((res) => {
						console.log(res);
					});
			}
		}
		if (idParams.get("id")) {
			removeCookies("resultId", {
				path: "/result",
				domain: "all-review-young.site",
			});
			removeCookies("reviewId", {
				path: "/result",
				domain: "all-review-young.site",
			});
			resultId = idParams.get("id");
			await loadResult(resultId);
			await loadReviews(reviewId);
			setMoreText("리뷰 새로고침");
		} else {
			if (cookies.crawl === "yes") {
				const initialMessages = [
					// 애니메이션 적용: false
					{
						animate: true,
						sender: "bot",
						text: "리뷰를 받아오는 중입니다... 잠시만 기다려주세요",
					},
				];
				setBaseUrl(url);
				setMessages(initialMessages);
				await crawling();
			} else {
				const initialMessages = [
					// 애니메이션 적용: false
					{
						animate: true,
						sender: "bot",
						text: "리뷰를 받아오는 중입니다... 잠시만 기다려주세요",
					},
				];
				setMessages(initialMessages);
				setMessages((messages) => [
					...messages,
					{
						animate: true,
						sender: "bot",
						text: "리뷰를 불러왔습니다!",
					},
				]);
				await loadReviews(cookies.reviewId);
				await loadResult(cookies.resultId);
			}
		}
	}, []);

	useEffect(() => {
		axios
			.get("/member/info", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				if (res.data.success) {
					setCurrentEmail(res.data.data.email);
				} else {
					alert("로그인 후 이용하세요");
					window.location.href = "/login";
				}
			})
			.catch((err) => {
				console.log(err);
			});
	});

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	//리뷰 더 불러오기
	const loadMoreReviews = async () => {
		setMessages((messages) => [
			...messages,
			{
				animate: true,
				sender: "bot",
				text: "리뷰를 받아오는 중입니다... 잠시만 기다려주세요",
			},
		]);
		let tempTimes;
		if (moreText === "리뷰 새로고침") {
			tempTimes = 1;
		} else {
			tempTimes = times + 1;
		}

		const res = await axios.post("/review/crawling/more", {
			id: forMore,
			times: tempTimes,
		});

		if (res.data.success) {
			setMessages((messages) => [
				...messages,
				{
					animate: true,
					sender: "bot",
					text: "리뷰를 불러왔습니다!",
				},
			]);
			setReviews(null);
			setReviews(res.data.data.reviews);
			setMoreText("더보기");
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

	return (
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
				{currentEmail === resultEmail && (
					<ChatMessageInputBox
						inputValue={inputValue}
						setInputValue={setInputValue}
						addMessage={addMessage}
					/>
				)}
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
						<ReviewAnalysis
							title={title}
							totalRate={Number(totalRate)}
							url={baseUrl}
						/>
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
							{currentEmail === resultEmail && (
								<ReadMoreReview onClick={loadMoreReviews} text={moreText} />
							)}
						</Box>
					</Box>
				)}
			</Box>
		</Box>
	);
}

export default Chat;
