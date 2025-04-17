export interface SocketConnections {
    [key: string]: any;
}

export interface ConnectedUsers {
    [key: string]: {
        username: string | undefined;
        state: {
            x: number;
            y: number;
        }
    }
}

export interface LastSeenTime {
    [key: string]: {
        username: string | undefined;
        lastSeenDate: Date;
    }
}