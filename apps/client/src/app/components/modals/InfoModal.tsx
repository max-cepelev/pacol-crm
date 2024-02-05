import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";
import React from "react";
import { useModalStore } from "../../store/useModalStore";

export default function InfoModal() {
  const infoModal = useModalStore((store) => store.infoModal);
  const closeInfoModal = useModalStore((store) => store.closeInfoModal);
  return (
    <Dialog open={Boolean(infoModal)} onClose={closeInfoModal}>
      <DialogContent sx={{ minWidth: 350 }}>
        <Typography textAlign="center">{infoModal}</Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={closeInfoModal}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}
