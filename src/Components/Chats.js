import React from "react";
import { makeStyles } from "@mui/styles";
import { List, ListItem, Typography } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  inline: {
    display: "inline",
  },
  message: {
    padding: theme.spacing(1),
  },
  sender: {
    fontWeight: "bold",
  },
  leftItem: {
    float: "left",
    clear: "both",
  },
  rightItem: {
    float: "right",
    clear: "both",
  },
  leftMessageContent: {
    marginRight: "auto",
    marginLeft: 10,
    padding: theme.spacing(1),
    borderRadius: "20px",
    backgroundColor: "#f1f8e9",
    color: "black",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    maxWidth: "70%",
  },
  rightMessageContent: {
    marginLeft: "auto",
    marginRight: 10,
    padding: theme.spacing(1),
    borderRadius: "20px",
    backgroundColor: "#c8e6c9",
    color: "black",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    maxWidth: "70%",
  },
}));

const Chat = ({ chats }) => {
  const data = chats;
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {data?.map((item) => (
        <React.Fragment key={item?.id}>
          <ListItem
            alignItems="flex-start"
            className={
              item?.sender_id === 1 ? classes.rightItem : classes.leftItem
            }
          >
            <Typography
              component="span"
              variant="body2"
              color="textPrimary"
              className={
                item?.sender_id === 1
                  ? classes.rightMessageContent
                  : classes.leftMessageContent
              }
            >
              {item?.message}
            </Typography>
          </ListItem>
        </React.Fragment>
      ))}
    </List>
  );
};

export default Chat;
