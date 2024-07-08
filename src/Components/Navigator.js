import React, { useState, useContext } from "react";
import { useWindowSize } from "react-use";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { useTheme } from "@mui/material/styles";

import {
  Menu,
  LightModeOutlined,
  DarkModeOutlined,
  Search,
  AccountCircleOutlined,
  PeopleAltOutlined,
  PersonOutlineOutlined,
  CallOutlined,
  PersonPinCircleOutlined,
  BookmarkBorderOutlined,
  SettingsOutlined,
  PersonAddOutlined,
  HelpOutlineOutlined,
} from "@mui/icons-material";
import ListOfChats from "./ListOfChats";
import Messages from "./Messages";

const drawerWidth = 300;
const navItems = [
  "New Group",
  "Contacts",
  "Calls",
  "People Nearby",
  "Saved Message",
  "Setting",
];

const iconList = {
  "New Group": <PeopleAltOutlined sx={{ ml: -2, mr: 3 }} />,
  Contacts: <PersonOutlineOutlined sx={{ ml: -2, mr: 3 }} />,
  Calls: <CallOutlined sx={{ ml: -2, mr: 3 }} />,
  "People Nearby": <PersonPinCircleOutlined sx={{ ml: -2, mr: 3 }} />,
  "Saved Message": <BookmarkBorderOutlined sx={{ ml: -2, mr: 3 }} />,
  Setting: <SettingsOutlined sx={{ ml: -2, mr: 3 }} />,
};

const Navigator = (props) => {
  const { window, ColorModeContext } = props;
  const { width } = useWindowSize();
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const list = (
    <List>
      <ListItem disablePadding>
        <ListItemButton sx={{ textAlign: "left" }}>
          <AccountCircleOutlined sx={{ ml: -2, mr: 3 }} />
          <ListItemText primary={"My Profile"} />
        </ListItemButton>
      </ListItem>
      <Divider />
      {navItems.map((item) => (
        <ListItem key={item} disablePadding>
          <ListItemButton sx={{ textAlign: "left" }}>
            {iconList[item]}
            <ListItemText primary={item} />
          </ListItemButton>
        </ListItem>
      ))}
      <Divider />
      <ListItem disablePadding>
        <ListItemButton sx={{ textAlign: "left" }}>
          <PersonAddOutlined sx={{ ml: -2, mr: 3 }} />
          <ListItemText primary={"Invite Friends"} />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton sx={{ textAlign: "left" }}>
          <HelpOutlineOutlined sx={{ ml: -2, mr: 3 }} />
          <ListItemText primary={"Telegram Features"} />
        </ListItemButton>
      </ListItem>
    </List>
  );

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "left", mx: 2 }}>
      <Box sx={{ display: "flex" }}>
        <Avatar
          sx={{ my: 2, width: 60, height: 60, bgcolor: deepPurple[500] }}
          alt="Beyond Chat"
          src="/static/images/avatar/1.jpg"
        />
        <IconButton
          sx={{
            mx: 17,
            transition: "transform 0.5s",
            transform: "rotate(0deg)",
          }}
          onClick={colorMode.toggleColorMode}
          color="inherit"
        >
          {theme.palette.mode === "dark" ? (
            <LightModeOutlined />
          ) : (
            <DarkModeOutlined />
          )}
        </IconButton>
      </Box>

      <Typography variant="h6" sx={{ my: 1 }}>
        Beyond Chat
      </Typography>
      <Typography variant="body2" sx={{ mb: 1 }}>
        +91 9986432107
      </Typography>
      <Divider />
      {list}
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", width: "100vw", height: "100vh" }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ display: { md: "none", sm: "none" } }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Telegram
          </Typography>
          {/* search icon */}
          <Box sx={{ flexGrow: 1 }} />

          <IconButton color="inherit" edge="end">
            <Search />
          </IconButton>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant={width > 600 ? "permanent" : "temporary"}
          open={width > 600 ? true : mobileOpen}
          onClose={width > 600 ? undefined : handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: "block",
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box sx={{ display: "flex", width: "inherit" }}>
        <Box
          component="main"
          sx={{
            ml: width > 600 ? 35 : mobileOpen ? 3 : 0,
            transition: "margin-left 0.3s ease-in-out",
            width: "inherit",
          }}
        >
          {width > 600 ? null : <Toolbar />}
          <Box sx={{ display: "flex", flexDirection: "row", height: "100%" }}>
            {" "}
            <ListOfChats />
            <Messages />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

Navigator.propTypes = {
  window: PropTypes.func,
  ColorModeContext:
    PropTypes.object || PropTypes.shape({ Provider: PropTypes.object }),
};

export default Navigator;
