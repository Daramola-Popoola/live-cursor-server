import http from 'node:http';
import { WebSocketServer } from 'ws';
import url from 'node:url';
import { randomUUID } from 'node:crypto';
import { closeConnection, processMessage } from './utils/socket.util';
import { connections, users } from './utils/seed';
// *instantiating socket servers
const httpServer = http.createServer()

const wsServer = new WebSocketServer({server: httpServer})

wsServer.on('connection', (connection, request) =>{
    const { username } = url.parse(request.url!.toString(), true).query
    const uuid = randomUUID();
    console.log(username, uuid);
    connections[uuid] = connection;
    users[uuid] = {
        username: username as string,
        state: { x: 0, y: 0}
    }
    connection.on('message', message => processMessage(message, uuid));
    connection.on('close', () => closeConnection(uuid))
    
})

const PORT = process.env.PORT || 8000;

httpServer.listen(PORT, () => {
    console.log(`web socket is listening on port ${PORT}`);
})