import { user } from "./user.type"

export type message = {
    messageId?:  string,
    text:       string,
    userId?:     string,
    chatId?:     string,
    user?: user
}