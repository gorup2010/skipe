import { Message } from "@/types/api";
import EventEmitter from "events";

const newMessageEmitter = new EventEmitter();

export const emitNewMessageEvent = (msg: Message) => {
  newMessageEmitter.emit("new-message", msg);
};

export const addNewMessageListener = (callback: (msg: Message) => void) => {
  newMessageEmitter.addListener("new-message", callback);
};

export const removeNewMessageListener = (callback: (msg: Message) => void) => {
  newMessageEmitter.removeListener("new-message", callback);
};
