import React from "react";

import { useTranslation } from "react-i18next";

import {
  Paper,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@material-ui/core";

import { ClearRounded } from "@material-ui/icons";

import { usePersistedState } from "../components/usePersistedState";

const PageReport = ({ darkTheme }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = usePersistedState("formData", {
    title: "",
    body: "",
    whoType: 0,
    who: "",
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
            <Grid
              container
              justify="center"
              spacing={2}
              style={{ marginBottom: 8 }}
            >
              <Grid item sm={11} xs={12}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel
                    id="select-who-label"
                    color={darkTheme ? "secondary" : "primary"}
                  >
                    {t("Teacher/Student")}
                  </InputLabel>
                  <Select
                    fullWidth
                    label={t("Teacher/Student")}
                    variant="outlined"
                    color={darkTheme ? "secondary" : "primary"}
                    labelId="select-who-label"
                    id="select-who"
                    value={formData.whoType}
                    onChange={(e) => {
                      setFormData({ ...formData, whoType: e.target.value });
                    }}
                  >
                    <MenuItem value={0}>{t("Teacher")}</MenuItem>
                    <MenuItem value={1}>{t("Student")}</MenuItem>
                    <MenuItem value={2}>{t("Others")}</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid
              container
              justify="center"
              spacing={1}
              style={{ marginBottom: 8 }}
            >
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  color={darkTheme ? "secondary" : "primary"}
                  multiline={true}
                  label={t("Title")}
                  fullWidth
                  value={formData.title}
                  onChange={(e) => {
                    setFormData({ ...formData, title: e.target.value });
                  }}
                ></TextField>
              </Grid>
              <Grid item sm={5} xs={6}>
                <TextField
                  variant="outlined"
                  color={darkTheme ? "secondary" : "primary"}
                  multiline={true}
                  label={t("Report Who")}
                  fullWidth
                  value={formData.who}
                  onChange={(e) => {
                    setFormData({ ...formData, who: e.target.value });
                  }}
                ></TextField>
              </Grid>
            </Grid>
            <Grid
              container
              justify="center"
              spacing={2}
              style={{ marginBottom: 8 }}
            >
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
                    setFormData({ ...formData, body: e.target.value });
                  }}
                ></TextField>
              </Grid>
            </Grid>
            <Grid
              container
              justify="space-evenly"
              spacing={1}
              style={{ marginBottom: 8 }}
            >
              <Grid item xs={8}>
                <Button
                  variant={darkTheme ? "outlined" : "contained"}
                  type="submit"
                  color={darkTheme ? "default" : "primary"}
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  style={{ flexGrow: 1 }}
                  fullWidth
                >
                  Submit
                </Button>
              </Grid>
              <Grid item sm={3} xs={4}>
                <Button
                  startIcon={<ClearRounded />}
                  variant="outlined"
                  color={darkTheme ? "default" : "primary"}
                  fullWidth
                  onClick={(e) => {
                    e.preventDefault();
                    setFormData({
                      title: "",
                      body: "",
                      whoType: "",
                      who: "",
                      to: null,
                    });
                  }}
                >
                  Clear
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </div>
    </div>
  );
};

export { PageReport };
