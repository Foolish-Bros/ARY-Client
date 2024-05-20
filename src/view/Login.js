import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import kakaoLoginImg from "./kakao_login_img.svg";
import googleLoginImg from "./google_login_img.svg";
import naverLoginImg from "./naver_login_img.svg";
import { useNavigate } from "react-router-dom";

import logoImg from "./logo.svg";
import MultiTypingEffect from "./MultiTypingEffect"; // Import the MultiTypingEffect component

import { TextField, Button, Typography, Grid } from "@material-ui/core";

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
    height: "100vh", // 전체 화면 높이
    [theme.breakpoints.down("sm")]: {
      display: "none", // 화면이 작아질 때 오른쪽 섹션 숨기기
    },
  },
  textField: {
    backgroundColor: "white", // TextField 배경색을 흰색으로 설정합니다.
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#5BAE70", // 테두리 색상을 #5BAE70으로 설정합니다.
      },
    },
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
    if (username === "test" && password === "1234") {
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
