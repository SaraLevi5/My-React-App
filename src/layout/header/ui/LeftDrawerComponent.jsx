import { useContext } from "react";

import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Drawer,
  Button,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import MailIcon from "@mui/icons-material/Mail";
import { useState, Fragment } from "react";
import {
  alwaysLinks,
  loggedInLinks,
  loggedOutLinks,
  bizLinks,
} from "../../myLinks.js";
import LoginContext from "../../../store/loginContext.js";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../routes/ROUTES";

const LeftDrawerComponent = ({ isOpen, onCloseDrawer }) => {
  const navigate = useNavigate();
  const { login } = useContext(LoginContext);

  const handleListClick = (text) => {
    let link = text.toUpperCase();
    console.log(text);
    navigate(ROUTES[link]);
  };

  return (
    <Drawer anchor="left" open={isOpen} onClose={onCloseDrawer}>
      <Box
        sx={{ width: { auto: 250 } }}
        role="presentation"
        onClick={onCloseDrawer}
        onKeyDown={onCloseDrawer}
      >
        <List>
          {["Home", "About"].map((text, index) => (
            <ListItem key={text + index} disablePadding>
              <ListItemButton>
                <ListItemText
                  primary={text}
                  onClick={() => handleListClick(text)}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        {!login && (
          <List>
            {["Register", "Login"].map((text, index) => (
              <ListItem key={text + index} disablePadding>
                <ListItemButton>
                  <ListItemText
                    primary={text}
                    onClick={() => handleListClick(text)}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}
        {login && (
          <List>
            {["Favorite"].map((text, index) => (
              <ListItem key={text + index} disablePadding>
                <ListItemButton>
                  <ListItemText
                    primary={text}
                    onClick={() => handleListClick(text)}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Drawer>
  );
};
export default LeftDrawerComponent;
