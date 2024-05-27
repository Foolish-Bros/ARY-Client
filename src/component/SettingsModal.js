/* 설정 모달 (비밀번호 변경, 회원탈퇴) */
import React, { useState } from 'react';
import { Modal, Box, Typography, Tabs, Tab, TextField, Button } from '@mui/material';

import axios from "../axios";
import { useCookies } from 'react-cookie';

const SettingsModal = ({ open, onClose, tabValue, handleTabChange }) => {
    // 현재 비밀번호, 새 비밀번호, 비밀번호 확인 상태를 관리용
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    //쿠키
    const [cookies, setCookie, removeCookie] = useCookies(['token']);

    // 비밀번호 입력 필드의 스타일을 조정
    const textFieldStyle = {
        "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
                borderColor: "#007F73", // 선택되었을 때의 테두리 색상
            },
        },
        "& .MuiInputLabel-root": { // 라벨 기본 스타일
            color: "rgba(0, 0, 0, 0.6)", // 기본 상태에서의 라벨 색상
        },
        "& .MuiInputLabel-root.Mui-focused": { // 포커스 상태에서의 라벨 스타일
            color: "#007F73", // 선택되었을 때의 라벨 색상
        },
    };

    // 새 비밀번호와 비밀번호 확인이 같은지 검사용
    const isMatch = newPassword === confirmPassword && newPassword !== '' && confirmPassword !== '';

    // 상태를 초기화하고 상위 컴포넌트의 onClose 함수를 호출하는 함수
    const handleClose = () => {
        // 비밀번호 상태 초기화
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');

        // 원래의 onClose 함수 호출
        onClose();
    };

    //비밀번호 변경
    const handleChangePassword = () => {
        const token = cookies.token;
        axios
            .post("/member/changePassword",
            {                
                    "oldPassword": currentPassword,
                    "newPassword": newPassword,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                if (res.data.success) {
                    alert(res.data.message);
                    handleClose();
                } else {
                    alert(res.data.message);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    //회원탈퇴
    const handleMemberWithdrawal = () => {
        //구현해야 함
        const token = cookies[0].token;
        console.log(token);
        /*axios
            .get("/member/withdrawal", {
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
            });*/
    };


    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="settings-modal-title"
            aria-describedby="settings-modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Typography variant="h6" id="settings-modal-title" sx={{ fontWeight: 'bold' }}>
                    설정
                </Typography>
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    aria-label="settings tabs"
                    sx={{
                        '.MuiTabs-indicator': {
                            backgroundColor: '#007F73',
                        },
                    }}
                >
                    <Tab
                        label="비밀번호 변경"
                        sx={{
                            fontWeight: 'bold',
                            color: '#aaa', // 비선택 탭 색상
                            '&.Mui-selected': {
                                color: '#007F73', // 선택 탭 색상
                            },
                            '&:hover': {
                                color: '#00695c', // 호버 색상
                            },
                        }}
                    />
                    <Tab
                        label="회원탈퇴"
                        sx={{
                            fontWeight: 'bold',
                            color: '#aaa', // 비선택 탭 색상
                            '&.Mui-selected': {
                                color: '#007F73', // 선택 탭 색상
                            },
                            '&:hover': {
                                color: '#00695c', // 호버 색상
                            },
                        }}
                    />
                </Tabs>
                {tabValue === 0 && (
                    <Box mt={2}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>비밀번호 변경</Typography>
                        <TextField
                            label="현재 비밀번호"
                            type="password"
                            fullWidth
                            margin="normal"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            sx={textFieldStyle}
                        />
                        <TextField
                            label="새 비밀번호"
                            type="password"
                            fullWidth
                            margin="normal"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            sx={textFieldStyle}
                        />
                        <TextField
                            label="비밀번호 확인"
                            type="password"
                            fullWidth
                            margin="normal"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            sx={textFieldStyle}
                        />
                        <Button
                            variant="contained"
                            disabled={!isMatch} // 새 비밀번호와 비밀번호 확인이 다르면 버튼 비활성화
                            sx={{
                                mt: 3,
                                fontWeight: 'bold',
                                backgroundColor: "#007F73",
                                "&:hover": {
                                    backgroundColor: "#00695c",
                                },
                            }}
                            onClick={handleChangePassword}
                        >
                            변경
                        </Button>
                    </Box>
                )}
                {tabValue === 1 && (
                    <Box mt={2}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>회원탈퇴</Typography>
                        <Typography variant="body2" color="error" sx={{ fontWeight: 'bold' }}>
                            회원탈퇴를 진행하면 되돌릴 수 없습니다.
                        </Typography>
                        <Button
                            variant="contained"
                            sx={{
                                mt: 3,
                                fontWeight: 'bold',
                                backgroundColor: "#007F73",
                                "&:hover": {
                                    backgroundColor: "#00695c",
                                },
                            }}
                            onClick={handleMemberWithdrawal}
                        >
                            회원탈퇴
                        </Button>
                    </Box>
                )}
            </Box>
        </Modal>
    );
};

export default SettingsModal;
