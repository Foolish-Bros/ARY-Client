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
	const navigate = useNavigate(); // Initialize useNavigate

	const [username, setUsername] = useState("");

	// 선택된 사이트를 관리하기 위한 state
	const [selectedSite, setSelectedSite] = useState("");

	// 사용 가능한 사이트 목록
	const sites = [
		{ value: "coupang", label: "쿠팡" },
		{ value: "11번가", label: "11번가" },
		{ value: "옥션", label: "옥션" },
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
					setUsername(res.data.name);
					console.log(res.data);
				} else {
					alert("로그인 후 이용하세요");
					window.location.href = "/login";
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, [cookies.token]);

	// 사이트 선택 변경 핸들러
	const handleSiteChange = (event) => {
		setSelectedSite(event.target.value);
	};

	// 디버깅용
	useEffect(() => {
		console.log(selectedSite);
	}, [selectedSite]);

	// Handle navigation to result page
	const handleRoundboxClick = (item) => {
		navigate(`/result?query=${item}`);
	};

	return (
		<div>
			<main className={styles.main}>
				<div className={styles.chatInputContainer}>
					{/* Greeting message */}
					<div className={styles.greetingMessage}>
						<p>창식님</p>
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
							label="검색 또는 URL 입력"
							variant="outlined"
							fullWidth
							className={styles.inputField}
						/>
						<Button variant="contained" className={styles.sendButton}>
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
						<div
							className={styles.roundbox}
							onClick={() => handleRoundboxClick("맨투맨")}
						>
							맨투맨
						</div>

						<div
							className={styles.roundbox}
							onClick={() => handleRoundboxClick("운동화")}
						>
							운동화
						</div>

						<div
							className={styles.roundbox}
							onClick={() => handleRoundboxClick("애견 간식")}
						>
							애견 간식
						</div>
						<div
							className={styles.roundbox}
							onClick={() => handleRoundboxClick("애견 간식")}
						>
							애견 간식
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}

export default MainView;
