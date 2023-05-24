// import { GraphQLError } from "graphql";
// import validate from "validator";
// import pubsub from "./pubsub.js";
// import subscriptionsResolvers from "./subscriptions.js";
import Message from "../models/Message.js";
import {PubSub} from "graphql-subscriptions"

const pubsub = new PubSub();

const resolvers = {

    Query: {
        message (_,{ID}) {
            Message.findById(ID)
        }
    },
    
    Mutation: {
            async createMessage(_, {messageInput}){
                const {text, username} = messageInput
                
                const newMessage = new Message ({
                    text: text,
                    createdBy: username
                })

                pubsub.publish('MESSAGE_CREATED', {
                    messageCreated: {
                        text: text,
                        createdBy: username
                    }
                })

                const res = await newMessage.save()

                return res
            }
    },

    Subscription: {
        messageCreated: {
            subscribe: () => pubsub.asyncIterator("MESSAGE_CREATED")
        }
    }

}

export default resolvers;