import React from "react";
import {
	ListItem,
	ListItemText,
	Avatar,
	ListItemAvatar,
	Box,
} from "@mui/material";

const Profile = () => {

    return (
        <Box>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>KCS</Avatar>
                </ListItemAvatar>
                <ListItemText primary="김창식" />
            </ListItem>
        </Box>

    );
}

export default Profile;