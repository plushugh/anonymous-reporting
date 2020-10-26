import React, { useState } from "react";

import { useTranslation } from "react-i18next";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Popover,
  MenuItem,
  Tooltip,
  IconButton,
} from "@material-ui/core";
import {
  TranslateRounded,
  KeyboardArrowDownRounded,
  Brightness2,
  Brightness4,
} from "@material-ui/icons";
import { ElevateOnScroll } from "./ElevateOnScroll";

const TitleBar = ({ darkTheme, setDarkTheme, setLanguage, language }) => {
  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleLanguageChosserOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageChosserClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return (
    <>
      <ElevateOnScroll>
        <AppBar color={darkTheme ? "default" : "primary"}>
          <Toolbar>
            <Typography variant="h5" style={{ flexGrow: 1 }}>
              {t("App Title")}
            </Typography>
            <Button
              onClick={handleLanguageChosserOpen}
              startIcon={<TranslateRounded />}
              endIcon={<KeyboardArrowDownRounded />}
              color="inherit"
            >
              {language === "cn" ? "中文" : "English"}
            </Button>
            <Popover
              open={open}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              onClose={handleLanguageChosserClose}
            >
              <MenuItem
                onClick={() => {
                  handleLanguageChosserClose();
                  setLanguage("en");
                }}
              >
                English
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleLanguageChosserClose();
                  setLanguage("cn");
                }}
              >
                中文
              </MenuItem>
            </Popover>
            <Tooltip title={t("Toggle Dark Theme")}>
              <IconButton
                onClick={() => setDarkTheme(!darkTheme)}
                color="secondary"
              >
                {darkTheme ? <Brightness4 /> : <Brightness2 />}
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
      </ElevateOnScroll>
      <Toolbar style={{ position: "sticky", top: 0 }} />
    </>
  );
};

export { TitleBar };
