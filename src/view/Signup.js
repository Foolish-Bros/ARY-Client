import React, { useState, useEffect } from "react";
import axios from "../axios";
import {
	TextField,
	Button,
	Typography,
	Grid,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Paper,
} from "@mui/material";
import styles from "./SignupView.module.css"; // Import the CSS file
import { useLocation } from "react-router-dom";

const SignUpPage = () => {
	const location = useLocation();

	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [verificationCode, setVerificationCode] = useState("");
	const [timer, setTimer] = useState(300); // 5분 = 300초
	const [isTimerRunning, setIsTimerRunning] = useState(false);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [verificationResult, setVerificationResult] = useState(null);
	const [isTimerVisible, setIsTimerVisible] = useState(true); // 시간 초 표시 여부 상태 추가
	const [isResendVisible, setIsResendVisible] = useState(true); // 재전송 버튼 표시 여부 상태 추가

	const [isEmailValid, setIsEmailValide] = useState(false);
	const [isOnEmail, setIsOnEmail] = useState(false);
	const [correctVerificationCode, setCorrectVerificationCode] = useState("");

	useEffect(() => {
		let interval;
		if (isTimerRunning && timer > 0) {
			interval = setInterval(() => {
				setTimer((prevTimer) => prevTimer - 1);
			}, 1000);
		} else {
			clearInterval(interval);
			setIsTimerRunning(false);
		}
		return () => clearInterval(interval);
	}, [isTimerRunning, timer]);

	const handleEmailChange = (event) => {
		setEmail(event.target.value);
	};

	const handleUsernameChange = (event) => {
		setUsername(event.target.value);
	};

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};

	const handleConfirmPasswordChange = (event) => {
		setConfirmPassword(event.target.value);
	};

	const handleVerificationCodeChange = (event) => {
		setVerificationCode(event.target.value);
	};

	const handleSendVerificationCode = () => {
		if (isEmailValid) {
			// 여기에 이메일 인증 코드 전송 로직을 추가하세요.
			console.log("Verification code sent to:", email);
			setIsTimerRunning(true);
			setIsResendVisible(false); // 재전송 버튼을 숨김

			axios
				.post("/mail/check", {
					email: email,
				})
				.then((res) => {
					if (res.data.success) {
						alert(res.data.message);
						console.log(res.data);
						setIsOnEmail(true);
						setCorrectVerificationCode(res.data.data);
					}
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			alert("이메일 중복검사를 실행해주세요");
		}
	};

	const handleEmailDuplicated = () => {
		const regex =
			/^((?!\.)[a-zA-Z0-9_\-\.]+)(@)([a-zA-Z0-9_\-\.]+\.)([a-zA-Z]{2,}$)/;
		if (!regex.test(email)) {
			alert("올바른 이메일 형식을 작성해주세요.\nex)example@gmail.com");
			return;
		}

		axios
			.get("/member/emailDuplicated", {
				params: { email },
			})
			.then((res) => {
				if (res.data.success) {
					alert(res.data.message);
					setIsEmailValide(true);
				} else {
					alert("이미 존재하는 이메일입니다. 다시 입력해주세요.");
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleVerifyCode = () => {
		if (isOnEmail) {
			console.log(correctVerificationCode);
			console.log(verificationCode);

			if (Number(verificationCode) === Number(correctVerificationCode)) {
				// TODO 이거 해결해야됨
				console.log("called");
				setVerificationResult("success");
				setIsTimerVisible(false); // 인증이 확인되면 시간 초를 숨김
			} else {
				setVerificationResult("failure");
			}
			setIsDialogOpen(true);
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		if (password !== confirmPassword) {
			alert("비밀번호가 일치하지 않습니다.");
			return;
		}

		axios
			.post("/member/join", {
				email: email,
				password: password,
				passwordCheck: confirmPassword,
			})
			.then((res) => {
				if (res.data.success) {
					alert("회원가입 되었습니다. 로그인 후 이용 바랍니다.");
					window.location.href = "/login";
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleCloseDialog = () => {
		setIsDialogOpen(false);
	};

	return (
		<div className={styles.root}>
			<Paper className={styles.paper}>
				<Typography component="h1" variant="h5" align="center">
					Sign Up
				</Typography>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Grid container spacing={2} alignItems="center">
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								style={{ width: "100%" }}
								id="email"
								label="이메일"
								name="email"
								autoComplete="email"
								value={email}
								onChange={handleEmailChange}
								disabled={verificationResult === "success"}
							/>
						</Grid>
						<Grid item>
							<Button
								variant="outlined"
								color="primary"
								onClick={handleEmailDuplicated}
								disabled={!email || isEmailValid}
							>
								중복 검사
							</Button>
							<Button
								variant="outlined"
								color="primary"
								style={{ marginLeft: 20 }}
								onClick={handleSendVerificationCode}
								disabled={!email || verificationResult === "success"}
							>
								{isResendVisible ? "이메일 인증하기" : "재전송"}
							</Button>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="verificationCode"
								label="인증 코드"
								name="verificationCode"
								autoComplete="off"
								value={verificationCode}
								onChange={handleVerificationCodeChange}
								disabled={verificationResult === "success"}
							/>
						</Grid>
						<Grid item>
							<Button
								variant="contained"
								style={{ backgroundColor: "#5BAE70", color: "#fff" }}
								onClick={handleVerifyCode}
								disabled={!verificationCode || verificationResult === "success"}
							>
								{isTimerVisible ? `확인 (${timer}초)` : "확인"}
							</Button>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="username"
								label="사용자 이름"
								name="username"
								autoComplete="username"
								value={username}
								onChange={handleUsernameChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="password"
								label="비밀번호"
								type="password"
								id="password"
								autoComplete="new-password"
								value={password}
								onChange={handlePasswordChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="confirmPassword"
								label="비밀번호 확인"
								type="password"
								id="confirmPassword"
								autoComplete="new-password"
								value={confirmPassword}
								onChange={handleConfirmPasswordChange}
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						style={{ marginTop: 40, backgroundColor: "#5BAE70", color: "#fff" }}
						className={styles.submit}
						disabled={verificationResult !== "success"}
					>
						계정 등록하기
					</Button>
				</form>
			</Paper>
			<Dialog open={isDialogOpen} onClose={handleCloseDialog}>
				<DialogTitle>인증 코드 확인 결과</DialogTitle>
				<DialogContent>
					{verificationResult === "success" ? (
						<Typography>인증 코드가 확인되었습니다.</Typography>
					) : (
						<Typography>인증 코드가 올바르지 않습니다.</Typography>
					)}
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseDialog} color="primary" autoFocus>
						확인
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default SignUpPage;
