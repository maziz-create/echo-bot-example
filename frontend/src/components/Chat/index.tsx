import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import ChatMessage from "./ChatMessage";
import { useMessage } from "@/context/messageContext";
import { IMessage } from "model";

interface IChat {
  show: boolean;
  setShow: (x: boolean) => void;
}

function Chat({ show, setShow }: IChat) {
  const { sendMessage, messagesEndRef, scrollToBottom } = useMessage();

  const [text, setText] = useState("");
  const [messageList, setMessageList] = useState<IMessage[]>([]);

  useEffect(() => {
    const messages = JSON.parse(
      localStorage.getItem("message-history") || "[]"
    );
    setMessageList(messages);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  async function triggerOnSend() {
    if (!text) return;

    const res = await sendMessage(text);

    const myMessage: IMessage = {
      text,
      isYou: true,
    };
    const resMessage: IMessage = {
      text: res,
      isYou: false,
    };
    setMessageList([...messageList, ...[myMessage, resMessage]]);

    localStorage.setItem(
      "message-history",
      JSON.stringify([...messageList, ...[myMessage, resMessage]])
    );

    setText("");
  }

  return (
    <SwipeableDrawer
      keepMounted
      transitionDuration={500}
      sx={{
        "& .MuiPaper-root": {
          backgroundColor: "transparent",
          boxShadow: "none",
        },
      }}
      anchor="right"
      open={show}
      onClose={() => setShow(false)}
      onOpen={() => setShow(true)}
    >
      <Box
        sx={{
          width: "30vw",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            overflow: "hidden",
            height: "90%",
          }}
          role="presentation"
        >
          <Box
            sx={{
              minWidth: "100%",
              width: "70%",
              height: "100%",
              backgroundColor: "rgb(0 0 0 / 35%)",
              overflow: "auto",
              position: "relative",
            }}
          >
            <Box sx={{ overflow: "hidden", marginBottom: "16px" }}>
              {messageList.map((message, i) => (
                <ChatMessage key={i} message={message} />
              ))}
              <div ref={messagesEndRef} />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            backgroundColor: "rgb(0 0 0 / 35%)",
            height: "10%",
            alignItems: "center",
          }}
        >
          <Box sx={{ minWidth: "100%", height: "56px" }}>
            <TextField
              autoComplete="off"
              autoFocus
              value={text}
              onChange={(e) => setText(e.target.value)}
              sx={{
                reSize: "none",
                flex: 1,
                backgroundColor: "white",
                border: "none",
                borderRadius: "5px",
                width: "70%",
              }}
              onKeyDown={(e) => {
                if (!e.shiftKey && e.key === "Enter") {
                  e.preventDefault();
                  triggerOnSend();
                }
              }}
              id="outlined-textarea"
              placeholder="Mesaj gönder"
            />
            <Button
              sx={{
                px: 3,
                borderRadius: "25px",
                backgroundColor: "#3C4EB0",
                color: "white",
                fontWeight: "bold",
                borderBottomLeftRadius: 0,
                borderTopLeftRadius: 0,
                width: "30%",
                minHeight: "100%",
              }}
              onClick={triggerOnSend}
            >
              Send
            </Button>
          </Box>
        </Box>
      </Box>
    </SwipeableDrawer>
  );
}

export default Chat;
