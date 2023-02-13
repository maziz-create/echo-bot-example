import { createContext, useContext, useEffect, useRef, useState } from "react";

import axios from "axios";

// import Cookies from "js-cookie";
// import { v4 as uuidv4 } from "uuid";

interface IMessageContextProps {
  sendMessage: (text: string) => Promise<string>;
  messagesEndRef: React.Ref<HTMLDivElement>;
  scrollToBottom: () => void;
}

const MessageContext = createContext<IMessageContextProps>(
  {} as IMessageContextProps
);

export function MessageProvider({ children }: any) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  async function sendMessage(message: string) {
    return await (
      await axios.post("http://localhost:1337/api/core/echo-bot", {
        message,
      })
    ).data;
  }

  function scrollToBottom() {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  const values = { sendMessage, messagesEndRef, scrollToBottom };

  return (
    <MessageContext.Provider value={values}>{children}</MessageContext.Provider>
  );
}

export function useMessage() {
  return useContext(MessageContext);
}
