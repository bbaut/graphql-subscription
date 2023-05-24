import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import {expressMiddleware} from "@apollo/server/express4";
import { createServer } from 'http';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import dbConnection from "./db/config.js";
import express from "express";
import bodyParser from "body-parser"
import typeDefs from "./graphql/typedefs.js";
import resolvers from "./graphql/resolvers.js";
import cors from "cors"


//configure the use of environment variables

const Server = async () => {

    const app = express();

    const port = 4000;

    const httpServer = createServer(app);

    const schema = makeExecutableSchema({ typeDefs, resolvers });

    const wsServer = new WebSocketServer({
        server: httpServer,
        path: "/graphql",
      });

    const serverCleanup = useServer({ 
        schema
    }, wsServer);

    const server = new ApolloServer({
        schema,
        plugins: [ApolloServerPluginDrainHttpServer({httpServer}),
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await serverCleanup.dispose();
                        }
                    }
                }
            }
        ]
    })

    await server.start();

    app.use(
        "/graphql",
        cors (),
        bodyParser.json(),
        expressMiddleware(server)
    )

    dbConnection();

    httpServer.listen(port, () => {
        console.log(`🚀  Server ready at http://localhost:${port}/graphql`);
    });
}

Server()

export default Server