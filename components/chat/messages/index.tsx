import { Space } from "antd";
import { chatHistory } from "models/types";
import { ChatCompletionRequestMessageRoleEnum } from "openai";

type Props = {
  messages: chatHistory;
};
const userMessageStyle = (
  isUser: ChatCompletionRequestMessageRoleEnum
): React.CSSProperties => {
  return {
    alignSelf: isUser === "assistant" ? "end" : "start",
    background: isUser === "assistant" ? "#bdbdbd" : "#5e95e8",
    padding: "1rem 2rem",
    borderRadius: isUser === "assistant" ? "1rem 1rem 0 1rem" : "1rem 1rem 1rem 0",
  };
};
const messagesContainerStyles: React.CSSProperties = {
  display: "flex",
  flexDirection: "column-reverse",
  justifyContent: "space-between",
  padding: "2rem 4rem",
};
const Messages = (props: Props): React.ReactNode => {
  const messages = props.messages.map((message, index) => {
    if (message.role !== "system") {
      return (
        <p style={userMessageStyle(message.role)} key={index}>
          {message.content}
        </p>
      );
    }
  });
  return <section style={messagesContainerStyles}>{messages}</section>;
};
export default Messages;
