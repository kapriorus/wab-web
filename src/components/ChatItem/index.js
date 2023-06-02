import Box from "@mui/material/Box";

import "./styles.scss";

function ChatItem(props) {
  const { info } = props;

  return (
    <Box
      className={{
        bubble: true,
        "bubble--outcoming": info.type === "outcoming",
      }}
      key={info.id}
    >
      {info.text}
      <Box
        className={{
          bubble__time: true,
          "bubble__time--outcoming": info.type === "outcoming",
        }}
      >
        {new Date(info.timestamp * 1000).toLocaleTimeString("en-US")}
      </Box>
    </Box>
  );
}

export default ChatItem;
