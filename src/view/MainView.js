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

// Import logo images
import coupangLogo from "../resource/coupang_logo_img.svg";
import elevenstLogo from "../resource/11st_logo_img.svg";
import auctionLogo from "../resource/auction_logo_img.svg";

function MainView() {
	const cookies = useCookies(["token"]);
	const [, setCookieCrawl] = useCookies(["crawl"]);
	const navigate = useNavigate(); // Initialize useNavigate

	const [username, setUsername] = useState("");

	// 선택된 사이트를 관리하기 위한 state
	const [selectedSite, setSelectedSite] = useState("");
	const [url, setUrl] = useState("");

	// 최근 리뷰 가져오기
	const [recentReviews, setRecentReviews] = useState([{}]);

	// 사용 가능한 사이트 목록
	const sites = [
		{ value: "1", label: "쿠팡", logo: coupangLogo },
		{ value: "2", label: "11번가", logo: elevenstLogo },
		{ value: "3", label: "옥션", logo: auctionLogo },
	];

	useEffect(() => {
		const token = cookies[0].token;
		if (!token) {
			window.location.replace("/login");
		}
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
								renderValue={(selected) => {
									const site = sites.find((s) => s.value === selected);
									return (
										<div style={{ display: "flex", alignItems: "center" }}>
											<img
												src={site.logo}
												alt={site.label}
												style={{ marginRight: 16, width: 30, height: 30 }}
											/>
											{site.label}
										</div>
									);
								}}
							>
								{sites.map((site) => (
									<MenuItem key={site.value} value={site.value}>
										<img
											src={site.logo}
											alt={site.label}
											style={{ marginRight: 16, width: 30, height: 30 }}
										/>
										{site.label}
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
