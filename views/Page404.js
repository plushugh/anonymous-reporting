import { Paper, Typography, Button } from "@material-ui/core";

import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

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
export { Page404 };
