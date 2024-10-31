import { user } from "./user.type"

export type message = {
    messageId?:  string,
    text:       string,
    userId?:     string,
    chatId?:     string,
    createdAt:   Date,
    updatedAt:   Date,
    user?: user
}