import { chatHistory } from "models/types";
import { CreateChatCompletionResponse } from "openai";
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
