import Head from "next/head";
import { Inter } from "@next/font/google";
import MessageInputBar from "components/chat/inputBar";
import Messages from "components/chat/messages";
import useMessage from "reactQuery/useSendMessage";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { chatHistory, sendUserMessage } = useMessage();
  return (
    <>
      <Head>
        <title>Chat</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        style={{
          height: "100vh",
          width: "100vw",
          padding: "0 1rem",
        }}
      >
        <Messages messages={chatHistory} />
        <MessageInputBar sendMessage={sendUserMessage} />
      </main>
    </>
  );
}
