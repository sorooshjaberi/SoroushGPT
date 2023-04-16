import { chatHistory } from "models/types";
import { ChatCompletionRequestMessageRoleEnum } from "openai";
import { useEffect, useRef } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import styles from './style.module.css'
type Props = {
  messages: chatHistory;
};

const userMessageStyle = (
  isUser: ChatCompletionRequestMessageRoleEnum
): React.CSSProperties => {
  return {
    alignSelf: isUser === "assistant" ? "end" : "start",
    background: isUser === "assistant" ? "#bdbdbd" : "#9435f6",
    color: isUser === "assistant" ? "#000000" : "#ffffff",
    textAlign: "start",
    padding: ".5rem 1rem",
    borderRadius:
      isUser === "assistant" ? "1rem 1rem 0 1rem" : "1rem 1rem 1rem 0",
    maxWidth: "90%",
    margin: "8px 0",
  };
};
const messagesContainerStyles: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  padding: "10px 0",
  textAlign: "start",
  height: "100%",
  overflowY: "scroll",
  overflowX: "hidden",
  marginLeft: "11px",
};
const ChatSectionStyles: React.CSSProperties = {
  textAlign: "center",
  marginTop: 0,
  width: "100%",
  height: "90%",
};
const Messages = (props: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const messages = props.messages.map((message, index) => {
    if (message.role !== "system") {
      return (
        <div
          dir="rtl"
          className={styles['messageItem']}
          style={userMessageStyle(message.role)}
          key={index}
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {message.content}
          </ReactMarkdown>
        </div>
      );
    }
  });

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: "smooth" });
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [props.messages]);
  return (
    <section style={ChatSectionStyles}>
      <div
        id="chatsContainer"
        ref={containerRef}
        style={messagesContainerStyles}
      >
        {messages}
      </div>
    </section>
  );
};
export default Messages;
