import {
  ChatCompletionRequestMessage,
  ChatCompletionResponseMessage,
} from "openai";
export type messageItem = (
  | ChatCompletionRequestMessage
  | ChatCompletionResponseMessage
) & { id?: number };
export type chatHistory = messageItem[];
