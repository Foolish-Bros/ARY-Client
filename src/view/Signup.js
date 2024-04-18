import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Button,
  Typography,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper, // Paper 컴포넌트 추가
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#5BAE70", // 전체 배경색을 #5BAE70으로 설정합니다.
    width: "100%", // 전체 화면 너비
    height: "100vh", // 전체 화면 높이
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  paper: {
    padding: theme.spacing(3),
    borderRadius: theme.spacing(2),
    maxWidth: "400px", // 내용물 최대 너비
    width: "100%", // 내용물 전체 너비
  },
  form: {
    width: "100%", // 폼의 너비를 내용물 전체 너비로 설정합니다.
    marginTop: theme.spacing(1), // 폼과 이전 요소 사이에 간격을 설정합니다.
  },
  submit: {
    margin: theme.spacing(3, 0, 2), // 버튼의 여백을 설정합니다.
  },
}));

const SignUpPage = () => {
  const classes = useStyles();
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
    // 여기에 이메일 인증 코드 전송 로직을 추가하세요.
    console.log("Verification code sent to:", email);
    setIsTimerRunning(true);
    setIsResendVisible(false); // 재전송 버튼을 숨김
  };

  const handleVerifyCode = () => {
    // 여기에 인증 코드 확인 로직을 추가하세요.
    if (verificationCode === "123456") {
      setVerificationResult("success");
      setIsTimerVisible(false); // 인증이 확인되면 시간 초를 숨김
    } else {
      setVerificationResult("failure");
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // 여기에 회원가입 로직을 추가하세요.
    console.log("Email:", email);
    console.log("Username:", username);
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);
    console.log("Verification Code:", verificationCode);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <Paper className={classes.root}>
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h5" align="center">
          Sign Up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
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
            style={{ backgroundColor: "#5BAE70", color: "#fff" }}
            className={classes.submit}
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
    </Paper>
  );
};

export default SignUpPage;
