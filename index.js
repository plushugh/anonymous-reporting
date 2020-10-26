import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { createMuiTheme, ThemeProvider, CssBaseline } from "@material-ui/core";

import React, { useEffect } from "react";
import ReactDOM from "react-dom";

import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";

import { translationObj } from "./data/translation";

import { usePersistedState } from "./components/usePersistedState";

import "./styles/global.css";
import { TitleBar } from "./components/TitleBar";
import { Page404 } from "./views/Page404";
import { PageReport } from "./views/PageReport";
import { InfoButton } from "./components/InfoButton";

i18n.use(initReactI18next).init(translationObj);

const App = () => {
  const [language, setLanguage] = usePersistedState("lang", "cn");
  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);
  const { t, i18n } = useTranslation();

  const [darkTheme, setDarkTheme] = usePersistedState("theme", false);

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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TitleBar
        setDarkTheme={setDarkTheme}
        darkTheme={darkTheme}
        setLanguage={setLanguage}
        language={language}
      />
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
      <InfoButton />
    </ThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
