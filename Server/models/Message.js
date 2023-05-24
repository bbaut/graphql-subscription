// import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const MessageSchema = new Schema({
    text: String,
    createdBy: String
})


const Message = model("Message", MessageSchema);

export default Message