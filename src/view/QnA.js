import React, { useState } from "react";
import { Button } from "@mui/material";

import styles from "./QnA.module.css";
import axios from "../axios";
import { useCookies } from "react-cookie";

function QnA() {
	const cookie = useCookies(["token"]);
	const token = cookie[0].token;
	const [text, setText] = useState("");

	const handleChange = (e) => {
		setText(e.target.value);
	};

	const onSubmitQuestion = () => {
		axios
			.post(
				"/inquiry/question",
				{
					content: text,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then((res) => {
				console.log(res);
				if (res.data.success) {
					alert(res.data.message);
					window.close();
				} else {
					alert(" 문제가 발생했습니다\n 잠시후 다시 시도해주세요.");
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div className={styles.container}>
			<div className={styles.title}>문의하기</div>
			<textarea onChange={handleChange} className={styles.input} />
			<Button
				variant="contained"
				onClick={onSubmitQuestion}
				className={styles.sendButton}
			>
				문의하기
			</Button>
		</div>
	);
}

export default QnA;
