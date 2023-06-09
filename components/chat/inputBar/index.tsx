import React, { useRef, useState } from "react";
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
  backgroundColor: "rgb(232 232 232)",
  fontFamily: "vazir",
};

interface Props {
  sendMessage: (str: string, cb?: Function) => any;
}

const MessageInputBar = (props: Props) => {
  const [textareaValue, setTextareaValue] = useState<string>("");

  const messageTextRef = useRef<any>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const send = (event: any) => {
    if (textareaValue) {
      props.sendMessage(textareaValue, () => {
        setTextareaValue("");
      });
    }
  };

  const sendButton = (
    <FloatButton
      icon={<FaPaperPlane />}
      type="primary"
      style={{
        position: "absolute",
        top: "9px",
        right: " 12px",
        scale: ".8",
      }}
      onClick={send}
    />
  );
  return (
    <form
      style={{
        width: "calc(100vw - 2rem)",
        minHeight: "20px",
        position: "relative",
        top:"-50px"
      }}
      ref={formRef}
    >
      <Input.TextArea
        placeholder="Message..."
        size="large"
        style={textAreaStyles}
        autoSize
        ref={messageTextRef}
        value={textareaValue}
        onInput={(event) => {
          const target = event.target as HTMLTextAreaElement;
          setTextareaValue(target.value);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            textareaValue.length > 0 && send(textareaValue);
          }
        }}
      />

      <button type="submit"></button>
      {sendButton}
    </form>
  );
};

export default MessageInputBar;
