import { useState } from "react";
import { gql, useSubscription } from "@apollo/client";

const MESSAGES_SUBSCRIPTION = gql `
    subscription MessageCreated {
        messageCreated {
            text
            createdBy
        }
    }
`

function Messages () {
    const [posts, setPosts] = useState([]);

    const {data,loading} = useSubscription(
        MESSAGES_SUBSCRIPTION,
        {
            onData: (data) => {
                const message = data.data.data.messageCreated
                setPosts(posts => [...posts, message])
                console.log("Message received")
            }
        }
    )
    const listItems = posts.map((post, index) => 
        <li key={index}>
            <p>
                <strong>{post.createdBy}</strong> says {post.text}
            </p>
        </li>
    )
    
    return (
        <ul>
            {listItems}
        </ul>
    )
}

export default Messages;