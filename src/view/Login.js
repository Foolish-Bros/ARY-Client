import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import kakaoLoginImg from "./kakao_login_img.svg";
import googleLoginImg from "./google_login_img.svg";
import naverLoginImg from "./naver_login_img.svg";
import { useNavigate } from "react-router-dom";

import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
} from "@material-ui/core";
import AppleIcon from "@material-ui/icons/Apple";

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: theme.spacing(0),
  },
  socialButtons: {
    marginTop: theme.spacing(2),
  },
  socialIcon: {
    marginRight: theme.spacing(1),
  },
  signUpButton: {
    marginTop: theme.spacing(2),
  },
  rightSection: {
    backgroundColor: "#5BAE70",
    padding: theme.spacing(4),
    height: "100vh", // 전체 화면 높이
    [theme.breakpoints.down("sm")]: {
      display: "none", // 화면이 작아질 때 오른쪽 섹션 숨기기
    },
  },
  whiteRectangle: {
    backgroundColor: "white",
    height: "50px", // 사이즈 조절
    marginBottom: theme.spacing(2), // 각 사각형 사이 간격 조절
    // animation: "$pulseWhite 13s infinite alternate",
  },
  blackRectangle: {
    backgroundColor: "black",
    height: "50px", // 사이즈 조절
    marginBottom: theme.spacing(2), // 각 사각형 사이 간격 조절
    // animation: "$pulseBlack 10s infinite alternate",
  },
  mintRectangle: {
    backgroundColor: "#007F73",
    height: "50px", // 사이즈 조절
    marginBottom: theme.spacing(2), // 각 사각형 사이 간격 조절
    // animation: "$pulseMint 8s infinite alternate",
  },

  grayRectangle: {
    backgroundColor: "#E3E3E3",
    height: "50px", // 사이즈 조절
    marginBottom: theme.spacing(2), // 각 사각형 사이 간격 조절
    // animation: "$pulseGray 10s infinite alternate",
  },
  textField: {
    backgroundColor: "white", // TextField 배경색을 흰색으로 설정합니다.
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#5BAE70", // 테두리 색상을 #5BAE70으로 설정합니다.
      },
    },
  },
  "@keyframes pulseWhite": {
    "0%": { width: "100px" },
    "50%": { width: "200px" },
    "100%": { width: "100px" },
  },
  "@keyframes pulseBlack": {
    "0%": { width: "100px" },
    "50%": { width: "300px" },
    "100%": { width: "100px" },
  },
  "@keyframes pulseGray": {
    "0%": { width: "100px" },
    "50%": { width: "250px" },
    "100%": { width: "100px" },
  },
  "@keyframes pulseMint": {
    "0%": { width: "100px" },
    "50%": { width: "150px" },
    "100%": { width: "100px" },
  },
  // 첫 번째 직사각형의 애니메이션
  "@keyframes pulseWhite500": {
    "0%": { width: "100px" },
    "50%": { width: "200px" },
    "100%": { width: "100px" },
  },

  // 두 번째 직사각형의 애니메이션
  "@keyframes pulseWhite600": {
    "0%": { width: "150px" },
    "50%": { width: "250px" },
    "100%": { width: "150px" },
  },
  loginSection: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100vh", // 전체 화면 높이
    [theme.breakpoints.down("sm")]: {
      width: "100%", // 화면이 작아질 때 섹션의 너비를 100%로 설정
    },
    [theme.breakpoints.up("sm")]: {
      maxWidth: "400px", // 화면이 클 때 섹션의 최대 너비를 400px로 제한
      margin: "auto", // 화면이 클 때 섹션을 가운데 정렬
    },
  },
}));

const LoginPage = () => {
  const navigate = useNavigate();

  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    // Handle login logic here
    console.log("Username:", username);
    console.log("Password:", password);
    if (username == "test" && password == "1234") {
      navigate("/");
    }
  };

  const handleSocialLogin = (provider) => {
    // Handle social login logic based on provider
    console.log(`${provider} login clicked`);
  };

  const handleSignUp = () => {
    // Handle sign up logic here
    console.log("Sign up clicked");
    navigate("/Signup");
  };

  return (
    <div className={classes.root}>
      <Grid container>
        {/* Left Section */}
        <Grid item xs={12} sm={4}>
          <div className={classes.loginSection}>
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
                InputLabelProps={{
                  style: { color: "green" }, // 활성화됐을 때 강조되는 색상을 여기에서 지정합니다.
                }}
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
                  borderBottom: "1px solid #E3E3E3",
                  lineHeight: "0.1em",
                  margin: "0 auto",
                  marginTop: "40px",
                  color: "#E3E3E3",
                }}
              >
                <span style={{ background: "#fff", padding: "0 10px" }}>
                  또는
                </span>
              </div>
              <div style={{ textAlign: "center", marginTop: "40px" }}>
                <Button onClick={() => handleSocialLogin("Kakao")}>
                  <img
                    src={kakaoLoginImg}
                    alt="Kakao Login"
                    className={classes.socialIcon}
                    fullWidth
                  />
                </Button>
                <Button onClick={() => handleSocialLogin("Google")}>
                  <img
                    src={googleLoginImg}
                    alt="Google Login"
                    className={classes.socialIcon}
                    style={{ width: "auto", height: "auto" }}
                  />
                </Button>
                <Button onClick={() => handleSocialLogin("Naver")}>
                  <img
                    src={naverLoginImg}
                    alt="Naver Login"
                    className={classes.socialIcon}
                    style={{ width: "auto", height: "auto" }}
                  />
                </Button>
              </div>
            </div>
          </div>
        </Grid>
        {/* Right Section */}
        <Grid item xs={12} sm={8} className={classes.rightSection}>
          <h1>ALL-REVIEW-YOUNG</h1>
          <div>
            <div
              className={classes.whiteRectangle}
              style={{ width: "0px" }}
            ></div>
            <div className={classes.whiteRectangle} style={{ width: "500px" }}>
              <div
                className={classes.blackRectangle}
                style={{ width: "700px" }}
              >
                <div
                  className={classes.grayRectangle}
                  style={{ width: "600px" }}
                >
                  <div
                    className={classes.mintRectangle}
                    style={{ width: "200px" }}
                  ></div>
                </div>
              </div>
            </div>
            <div className={classes.whiteRectangle} style={{ width: "600px" }}>
              <div
                className={classes.blackRectangle}
                style={{ width: "450px" }}
              >
                <div
                  className={classes.mintRectangle}
                  style={{ width: "350px" }}
                >
                  <div
                    className={classes.grayRectangle}
                    style={{ width: "250px" }}
                  ></div>
                </div>
              </div>
            </div>
            <div
              className={classes.whiteRectangle}
              style={{ width: "0px" }}
            ></div>
            <div className={classes.whiteRectangle} style={{ width: "800px" }}>
              <div
                className={classes.blackRectangle}
                style={{ width: "550px" }}
              >
                <div
                  className={classes.grayRectangle}
                  style={{ width: "450px" }}
                >
                  <div
                    className={classes.mintRectangle}
                    style={{ width: "350px" }}
                  ></div>
                </div>
              </div>
            </div>
            <div className={classes.whiteRectangle} style={{ width: "700px" }}>
              <div className={classes.mintRectangle} style={{ width: "500px" }}>
                <div
                  className={classes.grayRectangle}
                  style={{ width: "400px" }}
                >
                  <div
                    className={classes.blackRectangle}
                    style={{ width: "300px" }}
                  ></div>
                </div>
              </div>
            </div>
            <div
              className={classes.whiteRectangle}
              style={{ width: "0px" }}
            ></div>
            <div className={classes.blackRectangle} style={{ width: "700px" }}>
              <div className={classes.mintRectangle} style={{ width: "500px" }}>
                <div
                  className={classes.grayRectangle}
                  style={{ width: "400px" }}
                >
                  <div
                    className={classes.whiteRectangle}
                    style={{ width: "300px" }}
                  ></div>
                </div>
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  width: "60%",
                  color: "white",
                  textAlign: "center",
                  marginBottom: "10px",
                }}
              >
                <Typography variant="body2">
                  @명지대학교 - 캡스톤디자인 2024
                </Typography>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default LoginPage;
