import React, { useRef } from "react";
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

interface Props {
  sendMessage: (str: string) => any;
}

const MessageInputBar = (props: Props) => {
  const messageTextRef = useRef<any>(null);

  const send = (event: any) => {
    const value = messageTextRef.current.resizableTextArea.textArea.value;
    if (value) {
      props.sendMessage(value);
    }
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
      onClick={send}
    />
  );
  return (
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
        onSubmit={(event) => {
          event.preventDefault();
          if (messageTextRef?.current?.value!) {
            props.sendMessage(messageTextRef.current.value);
          }
        }}
      >
        <Input.TextArea
          placeholder="input search text"
          size="large"
          style={textAreaStyles}
          autoSize
          ref={messageTextRef}
        ></Input.TextArea>

        <button type="submit"></button>
        {sendButton}
      </form>
    </div>
  );
};

export default MessageInputBar;
