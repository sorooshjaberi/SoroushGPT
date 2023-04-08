import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/form.module.css";
//@ts-nocheck
import {
  FormEvent,
  forwardRef,
  useRef,
  useState,
  ForwardRefRenderFunction,
} from "react";
import {
  ChatCompletionRequestMessage,
  CreateChatCompletionResponse,
} from "openai";
import { chatHistory } from "models/types";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import styled from "styled-components";
import { InputProps } from "antd";
const inter = Inter({ subsets: ["latin"] });
const SendButton = styled.button`
  padding: 1.5rem;
  outline: none;
  border: none;
  border-radius: 2rem;
  cursor: pointer;
  color: #3b8484;
  font-size: 1.3rem;
`;
let MessageInput = styled.textarea`
  width: 50vw;
  min-width: 600px;
  padding: 2rem 1rem;
  height: 100px;
  outline: none;
  border: none;
  border-radius: 5px;
  transition: all.2s ease;
  box-shadow: 0 0 4px #00000045;
  &:focus {
    outline: none;
    border: none;
    box-shadow: 0 0 10px #292929b0;
  }
`;
// const refForwarder: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
//   props,
//   ref
// ) => <MessageInput {...props} />;
// const newMessage = forwardRef(refForwarder);

export default function Home() {
  const [chatHistory, setChatHistory] = useState<chatHistory>([]);
  const [result, setResult] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();
    const message = inputRef.current?.value as string;
    const newChatMessage: ChatCompletionRequestMessage = {
      content: message,
      role: "user",
    };
    const newChatHistory = [...structuredClone(chatHistory), newChatMessage];
    console.log(newChatHistory);
    if (message.length) {
      try {
        const res = await fetch("/api/chatgpt", {
          method: "POST",
          body: JSON.stringify(newChatHistory),
        });
        const resultJson = (await res.json()) as CreateChatCompletionResponse;
        const resultText = resultJson.choices[0].message?.content;
        setResult(resultText!);
        setChatHistory(newChatHistory);
      } catch (err) {
        setResult("error");
      }
    }
  };
  return (
    <>
      <Head>
        <title>Chat</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <form onSubmit={submitHandler} className={`${styles.form}`}>
        <MessageInput type="text" ref={inputRef} />
        <div style={{ marginBottom: "1rem" }} className="result">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{result}</ReactMarkdown>
        </div>
        <SendButton>Send</SendButton>
      </form>
    </>
  );
}
