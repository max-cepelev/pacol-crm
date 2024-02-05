import { Alert, AlertTitle } from "@mui/material";
import React from "react";
import ColumnWrapper from "../components/ui/ColumnWrapper";
import ToolbarWrapper from "../components/ui/ToolbarWrapper";

export default function NoActivate() {
  return (
    <ColumnWrapper
      sx={{ justifyContent: "center", alignItems: "center", minHeight: "50%" }}
    >
      <ToolbarWrapper
        sx={{ justifyContent: "center", width: "35%", padding: 0 }}
      >
        <Alert severity="info">
          <AlertTitle>Учетная запись не активирована</AlertTitle>
          Ваша учетная запись пока не активирована или находится на модерации,
          обратитесь к администратору по телефону
          <strong>+7 999 99 99</strong>
        </Alert>
      </ToolbarWrapper>
    </ColumnWrapper>
  );
}
