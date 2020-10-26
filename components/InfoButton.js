import { Tooltip, ButtonBase } from "@material-ui/core";
import { Info } from "@material-ui/icons";
import React from "react";
import { useTranslation } from "react-i18next";

const InfoButton = () => {
  const { t } = useTranslation();
  return (
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
  );
};

export { InfoButton };
