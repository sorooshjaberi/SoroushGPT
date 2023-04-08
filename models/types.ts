import {
  ChatCompletionRequestMessage,
  ChatCompletionResponseMessage,
} from "openai";
export type messageItem = ChatCompletionRequestMessage & { id?: number };
export type chatHistory = messageItem[];
