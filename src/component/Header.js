import React from "react";
import { AppBar, Toolbar, Tooltip } from "@mui/material";
import styles from "../view/MainView.module.css";
import logoImg from "../resource/logo.svg";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";

function Header() {
	return (
		<AppBar
			position="fixed"
			sx={{ width: `calc(100%)`, ml: "250px", boxShadow: "none" }}
		>
			<Toolbar className={styles.toolBar} sx={{ justifyContent: "left" }}>
				<img
					src={logoImg}
					alt="Logo"
					style={{
						width: "230px",
						height: "auto",
					}}
					onClick={() => {
						window.location.href = "/";
					}}
				/>
				<div
					style={{
						position: "absolute",
						right: "20px",
						gap: "20px",
						display: "flex",
						flexDirection: "row",
					}}
				>
					<Tooltip title="도움말" placement="bottom">
						<QuestionMarkIcon
							sx={{ cursor: "pointer" }}
							onClick={() => {
								// TODO: 링크 수정
								window.open(
									"https://lttworld.notion.site/ARY-All-Review-Young-411a31ac8634421493ec2501e99a0368?pvs=4"
								);
							}}
						/>
					</Tooltip>
					<Tooltip title="문의하기" placement="bottom">
						<QuestionAnswerIcon
							sx={{ cursor: "pointer" }}
							onClick={() => {
								window.open(
									"/question",
									"window_name",
									"width=430, height=500, location=no, status=no, scrollbars=yes"
								);
							}}
						/>
					</Tooltip>
				</div>
			</Toolbar>
		</AppBar>
	);
}

export default Header;
