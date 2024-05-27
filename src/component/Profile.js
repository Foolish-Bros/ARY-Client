import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, IconButton, Modal, Typography, Tabs, Tab, TextField, Button, List, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemIcon } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/ExitToApp'; // 로그아웃 아이콘을 위해 추가
import PersonIcon from '@mui/icons-material/Person';
import { grey } from "@mui/material/colors";
import {useCookies} from "react-cookie";

import SettingsModal from "./SettingsModal";

const Profile = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [tabValue, setTabValue] = useState(0);
    const username = "김창식"; // 예시 사용자 이름

    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['token'])


    const handleModalOpen = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setTabValue(0);
        setModalOpen(false);
    };

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleLogout = () => {
        // 로그아웃 로직을 여기에 구현합니다. 예: 세션 클리어, 로그아웃 API 호출 등
        removeCookie('token');
        navigate('/login');
        console.log("로그아웃 처리");
    };

    return (
        <Box>
            <List>
                <ListItem
                    secondaryAction={
                        <IconButton edge="end" aria-label="settings" onClick={handleModalOpen}>
                            <SettingsIcon />
                        </IconButton>
                    }
                >
                    <ListItemAvatar sx={{ width: 40, height: 40 }}>
                        <Avatar>
                            <PersonIcon fontSize="medium" />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                {username}
                            </Typography>
                        }
                    />

                </ListItem>

                {/* 로그아웃 버튼 추가 */}

                <ListItem button onClick={handleLogout} sx={{ justifyContent: 'center', display: 'flex', width: 'fit-content', margin: '0 auto' }}>
                    <ListItemIcon sx={{ minWidth: 'unset', mr: 0.5 }}>
                        <LogoutIcon fontSize="small" sx={{ color: grey[500] }} />
                    </ListItemIcon>
                    <ListItemText
                        primary={
                            <Typography variant="body2" sx={{ margin: '0', fontWeight: 'bold', color: grey[500] }}>
                                로그아웃
                            </Typography>
                        }
                    />
                </ListItem>
            </List>

            <SettingsModal
              open={modalOpen}
              onClose={handleModalClose}
              tabValue={tabValue}
              handleTabChange={handleTabChange}
            />
        </Box>
    );
}

export default Profile;
