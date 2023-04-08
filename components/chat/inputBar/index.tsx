import { useState } from "react";
import { Input, Button } from "antd";
type Props = {};
const ChatInputBar = (props: Props) => {
  const [messageText, setMessageText] = useState("");

  const handleMessageSubmit = () => {
    // onSubmit(messageText);
    setMessageText("");
  };

  return (
    <div>
      <Input
        placeholder="Type your message"
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        onPressEnter={handleMessageSubmit}
      />
      <Button onClick={handleMessageSubmit}>Send</Button>
    </div>
  );
};
export default ChatInputBar;
