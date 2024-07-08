import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Avatar,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { useSelector } from "react-redux";
import {
  ArrowBackOutlined,
  MoreVertOutlined,
  SearchOutlined,
  LocalPhoneOutlined,
  SendOutlined,
  AttachmentOutlined,
  InsertEmoticonOutlined,
} from "@mui/icons-material";
import Chat from "./Chats";
import { useTheme } from "@mui/styles";

const Messages = () => {
  const theme = useTheme();

  const getChatData = useSelector((state) => state.userReducers.openChatData);

  const [chats, setChat] = useState(null);
  const [userName, setUserName] = useState(null);
  const [message, setMessage] = useState("");

  const chatUrl =
    "https://devapi.beyondchats.com/api/get_chat_messages?chat_id=" +
    getChatData?.id;

  useEffect(() => {
    fetch(chatUrl)
      .then((response) => response.json())
      .then((data) => {
        setChat(data.data);
        setUserName(getChatData?.creator?.name);
      });
  }, [getChatData]);

  return (
    <Box sx={{ flex: 7, overflowY: "auto", height: "100%" }}>
      {getChatData !== null && (
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              p: 2,
              gap: 1,
              bgcolor: theme.palette.header.primary,
              boxShadow:
                "0 2px 5px 0 rgb(0 0 0 / 10%), 0 2px 10px 0 rgb(0 0 0 / 5%)",
            }}
          >
            <ArrowBackOutlined />
            <Avatar
              sx={{ bgcolor: "primary.main", mr: 2 }}
              alt={userName}
              src="/static/images/avatar/1.jpg"
            />
            <Typography variant="h6">{userName}</Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
              }}
            >
              <SearchOutlined />
              <LocalPhoneOutlined />
              <MoreVertOutlined />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              p: 2,
              height: "80vh",
              overflowY: "auto",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            <Chat chats={chats} />
          </Box>
        </Box>
      )}
      <Box
        sx={{
          position: "absolute",
          bottom: 1,
          width: "57%",
          p: 2,
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            gap: 2,
            bgcolor: theme.palette.background.paper,
            borderRadius: 25,
            padding: 2,
          }}
        >
          <IconButton>
            <InsertEmoticonOutlined />
          </IconButton>
          <TextField
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            sx={{
              flex: 1,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none",
                },
                "&:hover fieldset": {
                  border: "none",
                },
                "&.Mui-focused fieldset": {
                  border: "none",
                },
                "&.Mui-focused": {
                  backgroundColor: "transparent",
                },
                "&:hover": {
                  backgroundColor: "transparent",
                },
              },
            }}
            size="small"
          />
          <IconButton sx={{ gap: 2 }}>
            <AttachmentOutlined />
            <SendOutlined />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Messages;
