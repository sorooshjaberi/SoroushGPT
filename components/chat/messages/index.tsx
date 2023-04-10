import { chatHistory } from "models/types";
import { ChatCompletionRequestMessageRoleEnum } from "openai";
import { useEffect, useRef } from "react";
import styled from "styled-components";
const ChatHistorySection = styled.section`
  text-align: center;
  margin: 2rem auto;
  margin-top: 0;
  width: 100%;
  height: 85vh;
`;

type Props = {
  messages: chatHistory;
};

const userMessageStyle = (
  isUser: ChatCompletionRequestMessageRoleEnum
): React.CSSProperties => {
  return {
    alignSelf: isUser === "assistant" ? "end" : "start",
    background: isUser === "assistant" ? "#bdbdbd" : "#5e95e8",
    textAlign: isUser === "user" ? "start" : "end",
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
  // margin:"-7px"
};
const ChatSectionStyles: React.CSSProperties = {
  textAlign: "center",
  margin: "2rem auto",
  marginTop: 0,
  width: "100%",
  height: "85vh",
};
const Messages = (props: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const messages = props.messages.map((message, index) => {
    if (message.role !== "system") {
      return (
        <p style={userMessageStyle(message.role)} key={index}>
          {message.content}
        </p>
      );
    }
  });

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
      containerRef.current.scrollIntoView({ behavior: "smooth" });
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
