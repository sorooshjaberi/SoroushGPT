import React from "react";
import { Input, FloatButton } from "antd";
import { FaPaperPlane } from "react-icons/fa";
const textAreaStyles: React.CSSProperties = {
  width: "100%",
  paddingRight: "4rem",
  minHeight: "3rem",
  overflow: "visible",
  position: "absolute",
  bottom: "-28px",
  zIndex: "1",
};
const sendButton = (
  <FloatButton
    icon={<FaPaperPlane />}
    type="primary"
    style={{
      position: "absolute",
      top: " 5px",
      right: " 12px",
      scale: ".8",
    }}
  />
);

const MessageInputBar: React.FC = () => (
  <div
    style={{
      position: "absolute",
      left: "50%",
      translate: "-50% 0 ",
      bottom: "5rem",
      margin: "auto",
    }}
  >
    <form
      style={{
        width: "90vw",
        minHeight: "20px",
        position: "relative",
      }}
    >
      <Input.TextArea
        placeholder="input search text"
        size="large"
        style={textAreaStyles}
        autoSize
      ></Input.TextArea>
      {sendButton}
    </form>
  </div>
);

export default MessageInputBar;
