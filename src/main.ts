import http from 'node:http';
import { WebSocketServer } from 'ws';
import url from 'node:url';
import { randomUUID } from 'node:crypto';
import { ConnectedUsers, SocketConnections } from './core/main.interface';
// *instantiating socket servers
const httpServer = http.createServer()

const wsServer = new WebSocketServer({server: httpServer})
//database copy

const connections: SocketConnections = {};
const users: ConnectedUsers = {};
wsServer.on('connection', (connection, request) =>{
    const { username } = url.parse(request.url!.toString(), true).query
    const uuid = randomUUID();
    console.log(username, uuid);
    connections[uuid] = connection;
    users[uuid] = {
        username: username as string,
        state: {
            x: 0,
            y: 0,
        }
    }
})

const PORT = process.env.PORT || 8000;

httpServer.listen(PORT, () => {
    console.log(`web socket is listening on port ${PORT}`);
})