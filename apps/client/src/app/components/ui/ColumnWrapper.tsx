import { styled } from "@mui/material";

const ColumnWrapper = styled("div")(() => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  rowGap: 10,
  marginBottom: 10,
}));

export default ColumnWrapper;
