import { useState } from "react";

import { store } from "../store";

import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import "./styles.scss";

function Login() {
  const [state, setState] = store.useState("auth");
  const [idInstance, setIdInstance] = useState("");
  const [apiTokenInstance, setApiTokenInstance] = useState("");

  function auth() {
    setState({
      host: "https://api.green-api.com",
      idInstance,
      apiTokenInstance,
    });
  }

  return (
    <div className="login">
      <Paper elevation={3} className="login__wrapper">
        <h2>WhatsApp Bussiness Web</h2>
        <TextField
          fullWidth
          margin="dense"
          label="ID Instance"
          variant="outlined"
          value={idInstance}
          onChange={(e) => setIdInstance(e.target.value)}
        />
        <TextField
          fullWidth
          margin="dense"
          label="API Token Instance"
          variant="outlined"
          value={apiTokenInstance}
          onChange={(e) => setApiTokenInstance(e.target.value)}
        />
        <Button onClick={auth} variant="contained">
          Login
        </Button>
      </Paper>
    </div>
  );
}

export default Login;
