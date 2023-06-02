import { useEffect, useState } from "react";
import axios from "axios";

import { store } from "../../store";

import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import "./styles.scss";
import ChatItem from "../ChatItem";

function Chat() {
  const [state] = store.useState("auth");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let intervalInstance = null;
    if (state.host) {
      intervalInstance = setInterval(() => {
        fetchData();
      }, 20000);
    }
    return () => {
      intervalInstance && clearInterval(intervalInstance);
    };
  }, []);

  const fetchData = async () => {
    const { host, idInstance, apiTokenInstance } = state;

    const { data } = await axios.get(
      `${host}/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`
    );
    if (data) {
      if (data.body.typeWebhook === "incomingMessageReceived") {
        setMessages((old) => [
          ...old,
          {
            id: data.body.idMessage,
            text: data.body.messageData.textMessageData.textMessage,
            timestamp: data.body.timestamp,
            type: "incoming",
          },
        ]);
      }
      await axios.delete(
        `${host}/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${data.receiptId}`
      );
      fetchData();
    }
    return data;
  };

  const sendMessage = async () => {
    const { host, idInstance, apiTokenInstance } = state;
    await axios.post(
      `${host}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
      {
        chatId: `7${state.phone}@c.us`,
        message,
      }
    );
    setMessages((current) => [
      ...current,
      {
        id: Date.now(),
        text: message,
        timestamp: Date.now(),
        type: "outcoming",
      },
    ]);
    setMessage("");
  };

  return (
    <Paper className="chat">
      <div className="chat__wrapper">
        {!messages.length ? (
          <div className="chat__no-messages">No messages. Yet.</div>
        ) : null}
        {messages.map((item) => (
          <ChatItem info={item} />
        ))}
      </div>

      <Paper className="chat__bottom">
        <TextField
          className="chat__input"
          value={message}
          label="Message"
          name="message"
          variant="outlined"
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button
          onClick={sendMessage}
          disabled={!message.trim().length || !state.phone}
        >
          SEND
        </Button>
      </Paper>
    </Paper>
  );
}

export default Chat;
