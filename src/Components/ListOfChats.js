import React, { useState, useEffect } from "react";
import { Box, Typography, Tab, Tabs, Avatar } from "@mui/material";
import { TabContext, TabPanel } from "@mui/lab";
import { Search } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { GET_ALL_CHATS, CHATDATA } from "../Action/ActionType";
import { grey } from "@mui/material/colors";
import { useTheme } from "@mui/material/styles";

const ListOfChats = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [data, setData] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChatData = (data) => {
    dispatch({ type: CHATDATA, payload: data });
  };

  const getAllChatsUrl =
    "https://devapi.beyondchats.com/api/get_all_chats?page=1";

  useEffect(() => {
    axios.get(getAllChatsUrl).then((response) => {
      let res = response.data.data.data;
      res = res.filter((chat) => chat.creator.name !== null);
      dispatch({ type: GET_ALL_CHATS, payload: res });
      dispatch({ type: CHATDATA, payload: res[0] });
      setData(res);
    });
  }, []);

  return (
    <Box
      sx={{
        flex: 3,
        overflowY: "auto",
        p: 2,
        borderRight: `1px solid ${theme.palette.border.secondary}`,
      }}
    >
      <IconButton color="inherit" edge="end">
        <Search />
      </IconButton>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
              textColor="secondary"
            >
              <Tab label="All" />
              <Tab label="Regular" />
              <Tab label="Unread" />
              <Tab label="Personal" />
              <Tab label="Group" />
            </Tabs>
          </Box>
          <TabPanel value={0}>
            {data.map((chat, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 2,
                  cursor: "pointer",
                  "&:hover": {
                    bgcolor: grey[200],
                  },
                }}
                onClick={() => handleChatData(chat)}
              >
                <Avatar
                  alt={chat.creator.name}
                  src="/static/images/avatar/1.jpg"
                  sx={{ mr: 2 }}
                />
                <Box>
                  <Typography variant="body1">{chat.creator.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Last message: {chat.last_message}
                  </Typography>
                </Box>
              </Box>
            ))}
          </TabPanel>
          <TabPanel value={1}>
            {data
              .filter((item) => item.status === "ongoing")
              .map((chat, index) => (
                <Box
                  key={index}
                  sx={{ display: "flex", alignItems: "center", mb: 2 }}
                  onClick={() => handleChatData(chat)}
                >
                  <Avatar src={chat.creator.email} sx={{ mr: 2 }} />
                  <Box>
                    <Typography variant="body1">{chat.creator.name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Last message: {chat.last_message}
                    </Typography>
                  </Box>
                </Box>
              ))}
          </TabPanel>
          <TabPanel value={2}>
            {data
              .filter((item) => item.status === "new")
              .map((chat, index) => (
                <Box
                  key={index}
                  sx={{ display: "flex", alignItems: "center", mb: 2 }}
                  onClick={() => handleChatData(chat)}
                >
                  <Avatar src={chat.creator.email} sx={{ mr: 2 }} />
                  <Box>
                    <Typography variant="body1">{chat.creator.name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Last message: {chat.last_message}
                    </Typography>
                  </Box>
                </Box>
              ))}
          </TabPanel>
          <TabPanel value={3}>No Personal Messages</TabPanel>
          <TabPanel value={4}>No Group Messages</TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
};

export default ListOfChats;
