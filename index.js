import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import {
  AppBar,
  Grid,
  ButtonBase,
  IconButton,
  Paper,
  TextField,
  Toolbar,
  Typography,
  createMuiTheme,
  ThemeProvider,
  CssBaseline,
  FormControl,
  InputLabel,
  Button,
  Select,
  MenuItem,
  Popover,
  Tooltip,
} from "@material-ui/core";
import {
  ArrowBackRounded,
  Brightness4,
  Brightness1,
  Info,
  KeyboardArrowDownRounded,
  TranslateRounded,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ElevateOnScroll from "./components/ElevateOnScroll";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

import "./styles/global.css";

Sentry.init({
  dsn:
    "https://e97be0ec751047079e3762f7ac0b670d@o440273.ingest.sentry.io/5464648",
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        "Go Back": "Go Back",
        "Report Form": "Report Form",
        Teacher: "Teacher",
        Student: "Student",
        Others: "Others",
        Title: "Title",
        Body: "Body",
        "App Title": "BRS Report",
        "Report Who": "Report Who",
        "Toggle Dark Theme": "Toggle Dark Theme",
        Info: "Info",
        language: "English",
      },
    },
    cn: {
      translation: {
        "Go Back": "返回",
        "Report Form": "举报表",
        Teacher: "老师",
        Student: "学生",
        Others: "其他",
        Title: "标题",
        Body: "正文",
        "App Title": "BRS 举报",
        "Report Who": "举报谁",
        "Toggle Dark Theme": "切换深色模式",
        Info: "关于",
        language: "中文",
      },
    },
  },
  lng: "cn",
  fallbackLng: "en",

  interpolation: {
    escapeValue: false,
  },
});

function usePersistedState(key, defaultValue) {
  const [state, setState] = useState(
    () => JSON.parse(localStorage.getItem(key)) || defaultValue
  );
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState];
}

const Page404 = () => {
  const { t } = useTranslation();
  return (
    <div style={{ height: "50ch", width: "100%", paddingTop: "32px" }}>
      <Paper
        style={{ margin: "auto", width: "640px", maxWidth: "90vw", padding: 8 }}
      >
        <Typography variant="h1" style={{ textAlign: "center" }}>
          404
        </Typography>
        <Link to="/" style={{ textDecoration: "none", width: "100%" }}>
          <Button
            startIcon={<ArrowBackRounded />}
            style={{ marginLeft: "auto", marginRight: "auto" }}
          >
            {t("Go Back")}
          </Button>
        </Link>
      </Paper>
    </div>
  );
};

const PageReport = ({ darkTheme }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = usePersistedState("formData", {
    title: "",
    body: "",
    who: null,
    to: null,
  });
  return (
    <div className="full">
      <div
        style={{
          width: "100%",
          height: "100%",
          padding: 16,
        }}
      >
        <Paper
          style={{
            width: "640px",
            maxWidth: "90vw",
            padding: 8,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <form>
            <Typography variant="h3" style={{ padding: 8, margin: 8 }}>
              {t("Report Form")}
            </Typography>
            <Grid container justify="center" spacing={2}>
              <Grid item sm={11} xs={12}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel
                    id="select-who-label"
                    color={darkTheme ? "secondary" : "primary"}
                  >
                    {t("Report Who")}
                  </InputLabel>
                  <Select
                    fullWidth
                    label={t("Report Who")}
                    variant="outlined"
                    color={darkTheme ? "secondary" : "primary"}
                    labelId="select-who-label"
                    id="select-who"
                    value={formData.who}
                    onChange={(e) => {
                      setFormData({ ...formData, who: e.target.value });
                    }}
                  >
                    <MenuItem value={0}>{t("Teacher")}</MenuItem>
                    <MenuItem value={1}>{t("Student")}</MenuItem>
                    <MenuItem value={2}>{t("Others")}</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container justify="center" spacing={2}>
              <Grid item sm={11} xs={12}>
                <TextField
                  variant="outlined"
                  color={darkTheme ? "secondary" : "primary"}
                  multiline={true}
                  label={t("Title")}
                  fullWidth
                  autoFocus
                  value={formData.Title}
                  onChange={(e) => {
                    setFormData({ ...formData, title: e.target.value });
                  }}
                ></TextField>
              </Grid>
            </Grid>
            <Grid container justify="center" spacing={2}>
              <Grid item sm={11} xs={12}>
                <TextField
                  variant="outlined"
                  color={darkTheme ? "secondary" : "primary"}
                  multiline={true}
                  label={t("Body")}
                  rows={10}
                  rowsMax={100}
                  fullWidth
                  value={formData.body}
                  onChange={(e) => {
                    setFormData({ ...formData, body: e.target.body });
                  }}
                ></TextField>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </div>
    </div>
  );
};

const App = () => {
  const [language, setLanguage] = usePersistedState("lang", "cn");
  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);
  const { t, i18n } = useTranslation();
  const [darkTheme, setDarkTheme] = usePersistedState("theme", false);
  // const systemDarkTheme = useMediaQuery("(prefers-color-scheme: dark)");
  // useEffect(() => {
  //   setDarkTheme(systemDarkTheme);
  // }, [systemDarkTheme]);

  const useTheme = () =>
    createMuiTheme({
      palette: {
        type: darkTheme ? "dark" : "light",
        primary: {
          main: "#3576cb",
        },
        secondary: {
          main: "#ffffff",
        },
      },
    });

  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleLanguageChosserOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageChosserClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
                {darkTheme ? <Brightness4 /> : <Brightness1 />}
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
      </ElevateOnScroll>
      <Toolbar style={{ position: "sticky", top: 0 }} />
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <PageReport darkTheme={darkTheme} />}
          ></Route>
          <Route component={Page404}></Route>
        </Switch>
      </Router>
      <Tooltip title={t("Info")} placement="left">
        <ButtonBase
          style={{
            borderRadius: 99999,
            position: "fixed",
            bottom: 8,
            right: 8,
            padding: 10,
          }}
        >
          <Info />
        </ButtonBase>
      </Tooltip>
    </ThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
