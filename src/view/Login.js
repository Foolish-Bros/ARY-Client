import React, { useState } from "react";
import kakaoLoginImg from "../resource/kakao_login_img.svg";
import googleLoginImg from "../resource/google_login_img.svg";
import naverLoginImg from "../resource/naver_login_img.svg";
import { useNavigate } from "react-router-dom";

import axios from "../axios";

import logoImg from "../resource/logo.svg";
import MultiTypingEffect from "./MultiTypingEffect"; // Import the MultiTypingEffect component
import styles from "./LoginView.module.css";
import { TextField, Button, Typography, Grid } from "@mui/material"; // Updated imports
import { useCookies } from "react-cookie";

const LoginPage = () => {
	const navigate = useNavigate();

	const [, setCookie] = useCookies(["token"]);

	// const classes = useStyles();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleUsernameChange = (event) => {
		setUsername(event.target.value);
	};

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};

	const handleKeyPress = (event) => {
		if (event.key === "Enter") {
			handleLogin(event);
		}
	};

	const handleLogin = (e) => {
		e.preventDefault();

		console.log(username);
		console.log(password);

		axios
			.post("/member/login", {
				email: username,
				password: password,
			})
			.then((res) => {
				console.log(res);
				if (res.data.success) {
					console.log(res.data.data);
					setCookie("token", res.data.data, {
						path: "/",
						domain: "localhost",
						sameSite: "strict",
						expires: new Date(Date.now() + 3600000),
					});
					window.location.href = "/";
				} else {
					alert(res.data.message);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleSocialLogin = (provider) => {
		// Handle social login logic based on provider
		console.log(`${provider} login clicked`);
		window.location.href = `https://backend.all-review-young.site/oauth2/authorization/${provider}`;
	};

	const handleSignUp = () => {
		// Handle sign up logic here
		console.log("Sign up clicked");
		navigate("/signup");
	};

	return (
		<div className={styles.root}>
			<Grid container>
				{/* Left Section */}
				<Grid item xs={12} sm={4}>
					<div className={styles.loginSection}>
						<Typography variant="h4" component="h1" align="center">
							환영합니다!
						</Typography>
						<div>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								id="username"
								label="이메일"
								name="username"
								autoComplete="username"
								autoFocus
								value={username}
								onChange={handleUsernameChange}
								InputLabelProps={{
									style: { color: "green" }, // 활성화됐을 때 강조되는 색상을 여기에서 지정합니다.
								}}
								className={styles.textField} // Added className to apply styles
							/>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								name="password"
								label="비밀번호"
								type="password"
								id="password"
								autoComplete="current-password"
								value={password}
								onChange={handlePasswordChange}
								onKeyPress={handleKeyPress}
								InputLabelProps={{
									style: { color: "green" }, // 활성화됐을 때 강조되는 색상을 여기에서 지정합니다.
								}}
								className={styles.textField} // Added className to apply styles
							/>
							<div style={{ marginBottom: "10px" }}>
								<Button
									type="submit"
									fullWidth
									variant="contained"
									style={{
										backgroundColor: "#5BAE70",
										color: "white",
										boxShadow: "none",
									}}
									onClick={handleLogin}
								>
									로그인
								</Button>
							</div>

							<div>
								<Button
									type="submit"
									fullWidth
									variant="contained"
									style={{
										backgroundColor: "#E3E3E3",
										color: "#333",
										boxShadow: "none",
									}}
									onClick={handleSignUp}
								>
									회원가입
								</Button>
							</div>
							<div
								align="center"
								style={{
									width: "80%",
									textAlign: "center",
									borderBottom: "1px solid #999",
									lineHeight: "0.1em",
									margin: "0 auto",
									marginTop: "40px",
									color: "#999",
								}}
							>
								<span style={{ background: "#fff", padding: "0 10px" }}>
									또는
								</span>
							</div>
							<div style={{ textAlign: "center", marginTop: "40px" }}>
								<Button onClick={() => handleSocialLogin("kakao")}>
									<img
										src={kakaoLoginImg}
										alt="Kakao Login"
										className={styles.socialIcon}
										fullWidth
									/>
								</Button>
								<Button onClick={() => handleSocialLogin("google")}>
									<img
										src={googleLoginImg}
										alt="Google Login"
										className={styles.socialIcon}
										style={{ width: "auto", height: "auto" }}
									/>
								</Button>
								<Button onClick={() => handleSocialLogin("naver")}>
									<img
										src={naverLoginImg}
										alt="Naver Login"
										className={styles.socialIcon}
										style={{ width: "auto", height: "auto" }}
									/>
								</Button>
							</div>
							<div className={styles.footerText}>
								명지대학교 캡스톤디자인 - 우매한 형제들
							</div>
						</div>
					</div>
				</Grid>
				{/* Right Section */}
				<Grid item xs={12} sm={8} className={styles.rightSection}>
					{/* <h1>ALL-REVIEW-YOUNG</h1> */}
					<img
						src={logoImg}
						alt=""
						style={{
							width: "300px",
							height: "auto",
							marginLeft: "30px",
							marginTop: "40px",
						}}
					/>

					<div style={{ margin: "50px" }}>
						<MultiTypingEffect
							texts={[
								"Hello. All Review Young is a website that analyzes product reviews from various online shopping malls and provides information through a chatbot.",
								"Our service offers optimal product recommendations based on reliable review data, helping users make better purchasing decisions. Understand the strengths and weaknesses of products through review analysis and receive personalized consultations tailored to your preferences.",
								"Developed as a capstone design project, All Review Young combines innovative technology with a user-friendly interface to offer consumers the best shopping experience. Try our service now!",
							]}
						/>
					</div>
				</Grid>
			</Grid>
		</div>
	);
};

export default LoginPage;
