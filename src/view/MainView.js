import React, { useEffect, useState } from "react";
import {
	TextField,
	Button,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import styles from "./MainView.module.css"; // CSS 모듈 임포트

import axios from "../axios";
import { useCookies } from "react-cookie";

function MainView() {
	const cookies = useCookies(["token"]);
	const [cookieCrawl, setCookieCrawl] = useCookies(["crawl"]);
	const navigate = useNavigate(); // Initialize useNavigate

	const [username, setUsername] = useState("");

	// 선택된 사이트를 관리하기 위한 state
	const [selectedSite, setSelectedSite] = useState("");
	const [url, setUrl] = useState("");

	// 최근 리뷰 가져오기
	const [recentReviews, setRecentReviews] = useState([{}]);

	// 사용 가능한 사이트 목록
	const sites = [
		{ value: "1", label: "쿠팡" },
		{ value: "2", label: "11번가" },
		{ value: "3", label: "옥션" },
	];

	useEffect(() => {
		const token = cookies[0].token;
		axios
			.get("/member/info", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				if (res.data.success) {
					setUsername(res.data.data.name);
				} else {
					alert("로그인 후 이용하세요");
					window.location.href = "/login";
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	useEffect(() => {
		axios.get("/result/recent").then((res) => {
			if (res.data.success) {
				setRecentReviews(res.data.data);
			}
		});
	}, []);

	// 사이트 선택 변경 핸들러
	const handleSiteChange = (event) => {
		setSelectedSite(event.target.value);
	};

	// url
	const handleUrlChange = (event) => {
		setUrl(event.target.value);
	};

	// 전송 버튼
	const onSubmitCrawling = () => {
		if (sites && url) {
			setCookieCrawl("crawl", "yes", {
				path: "/",
				secure: "/",
				domain: "localhost",
				sameSite: "strict",
				expires: new Date(Date.now() + 3600000),
			});
			navigate("/result", {
				state: {
					site: selectedSite,
					url: url,
				},
			});
			window.location.href = "/result";
		} else {
			alert("URL을 입력하세요");
		}
	};

	// Handle navigation to result page
	const handleRoundboxClick = (id) => {
		window.location.href = `/result?id=${id}`;
	};

	return (
		<div>
			<main className={styles.main}>
				<div className={styles.chatInputContainer}>
					{/* Greeting message */}
					<div className={styles.greetingMessage}>
						<p>{username}님</p>
						<p>반갑습니다.</p>
					</div>

					{/* Chat input and controls */}
					<div className={styles.chatInput}>
						{/* 조건부 렌더링: 어떤 리스트 항목도 선택되지 않았을 때만 지원 사이트 드롭다운 렌더링 */}
						<FormControl variant="outlined" className={styles.siteSelectArea}>
							<InputLabel
								id="site-select-label"
								className={styles.siteSelectLabel}
							>
								지원 사이트
							</InputLabel>
							<Select
								labelId="site-select-label"
								id="site-select"
								value={selectedSite}
								onChange={handleSiteChange}
								label="지원 사이트"
							>
								{sites.map((site) => (
									<MenuItem key={site.value} value={site.value}>
										{site.label}
										{/* <img alt="image" src="./logo192.png" /> */}
									</MenuItem>
								))}
							</Select>
						</FormControl>

						<TextField
							label="URL 입력"
							variant="outlined"
							fullWidth
							onChange={handleUrlChange}
							className={styles.inputField}
						/>
						<Button
							variant="contained"
							onClick={onSubmitCrawling}
							className={styles.sendButton}
						>
							전송
						</Button>
					</div>
					{/* Chat input and controls */}
					<div>
						<div className={styles.bottomTitle}>
							다른 회원들은 이런 상품을 조회했어요!
						</div>
					</div>
					<div className={styles.recommandContainer}>
						{recentReviews.map((reviews, idx) => (
							<div
								className={styles.roundbox}
								onClick={() => handleRoundboxClick(reviews.id)}
							>
								{reviews.title}
							</div>
						))}
					</div>
				</div>
			</main>
		</div>
	);
}

export default MainView;
