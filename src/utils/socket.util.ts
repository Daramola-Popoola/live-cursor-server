import { RawData } from "ws";
import { connections, lastSeenDb, users } from "./seed";

export function broadcast(lastSeen?: any){
    Object.keys(connections).forEach((uuid) => {
        const connection = connections[uuid];
        const message = JSON.stringify(users);
        connection.send(message)
        if(lastSeen){
            const lastSeenMsg = JSON.stringify(lastSeen);
            connection.send(lastSeenMsg);
        }
    })
}

export function processMessage(data: RawData, uuid: string){
    const message = JSON.parse(data.toString());
    //* get the exact user
    const user = users[uuid];
    user.state = message;
    broadcast()
    console.log(message);
    
}

export function closeConnection(uuid: string){
    console.log(`user ${users[uuid].username} disconnected`);
    
    delete connections[uuid];
    lastSeenDb[uuid] = {username: users[uuid].username, lastSeenDate: new Date()};
    delete users[uuid];
    console.log(lastSeenDb);
    broadcast(lastSeenDb[uuid]);
    delete lastSeenDb[uuid];
}