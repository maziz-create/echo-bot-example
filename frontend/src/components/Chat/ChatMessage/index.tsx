import Box from "@mui/material/Box";
import { IMessage } from "model";

interface ChatMessageProps {
  message: IMessage;
}

function ChatMessage({ message }: ChatMessageProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: message.isYou ? "flex-end" : null,
        mr: message.isYou ? "16px" : null,
        ml: !message.isYou ? "16px" : null,
      }}
    >
      <Box
        className="message-text"
        sx={{
          borderRadius: "1.5rem",
          overflowWrap: "anywhere",
          mt: 2,
          px: 3,
          py: 2,
          backgroundColor: message.isYou ? "#3C4EB0" : "white",
          color: message.isYou ? "white" : "gray",
          fontWeight: "bold",
        }}
      >
        {message.text}
      </Box>
    </Box>
  );
}

export default ChatMessage;
