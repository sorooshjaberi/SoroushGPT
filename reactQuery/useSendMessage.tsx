import { chatHistory, messageItem } from "models/types";
import {
  ChatCompletionRequestMessage,
  CreateChatCompletionResponse,
} from "openai";
import { useState } from "react";
import { useMutation } from "react-query";
const sendMessage = async (
  chatHistory: chatHistory
): Promise<CreateChatCompletionResponse> => {
  const res = await fetch("/api/chatgpt", {
    method: "POST",
    body: JSON.stringify(chatHistory),
  });
  return await res.json();
};

export function useSendMessage() {
  const mutation = useMutation(sendMessage);
  return mutation;
}
export default function useMessage() {
  const [chatHistory, setChatHistory] = useState<chatHistory>([
    // {
    //   content: "you are a helpful ai chat bot",
    //   role: "system",
    // },
    {
      content: "Hey!",
      role: "assistant",
    },
  ]);
  const mutation = useMutation(["sendMessage"], sendMessage, {
    retry: 3,
  });
  const { mutateAsync } = mutation;

  const pushChat = (message: messageItem) => {
    setChatHistory((prev) => [...structuredClone(prev), message]);
  };

  const popChat = () => {
    setChatHistory((perv) => perv.slice(0, perv.length - 1));
  };
  const sendUserMessage = async (msg: string, cb?: Function) => {
    const newChatMessage: ChatCompletionRequestMessage = {
      content: msg,
      role: "user",
    };
    pushChat(newChatMessage);
    if (msg.length) {
      mutateAsync([...chatHistory, newChatMessage])
        .then((result) => {
          pushChat(result.choices[0].message!);
          cb && cb();
        })
        .catch(() => {
          popChat();
        });
    }
  };

  return { chatHistory, mutation, pushChat, popChat, sendUserMessage };
}
