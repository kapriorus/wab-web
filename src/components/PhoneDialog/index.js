import { useState } from "react";

import { store } from "../../store";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputAdornment from "@mui/material/InputAdornment";

export default function PhoneDialog() {
  const [phone, setPhone] = useState("");
  const [isOpened, setIsOpened] = useState(true);
  const [state, setState] = store.useState("auth");

  const savePhoneNumber = () => {
    setState({
      ...state,
      phone,
    });
    setIsOpened(false);
  };

  return (
    <Dialog open={isOpened}>
      <DialogTitle>A little more...</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Right now you need to enter client phone number in a format{" "}
          <b>9XXXXXXXXX</b>&nbsp;without country code and you can start
          messaging.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Phone number"
          type="number"
          fullWidth
          variant="standard"
          onChange={(e) => setPhone(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">+7</InputAdornment>
            ),
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button disabled={!phone} onClick={savePhoneNumber}>
          Start messaging
        </Button>
      </DialogActions>
    </Dialog>
  );
}
