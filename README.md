# graphql-subscription-model

This model represents how to implement a GraphQL subscription. 
It is done with Apollo Server and Apollo Client from a React Application. 

The subscriptions are a third operation type supported by graphql. The subscriptions enable us to fetch data, and unlike queries, subscriptions are long-lasting operations that can change there result over time. They maintain an active connection to our graphql server via web socket, such that it allows us, as users, to be notify in real time about changes to back-end data, such as the creation of a new object or updates to an important field. 
In other words, Subscriptions let us to get real-time updates from our graphql server. 

