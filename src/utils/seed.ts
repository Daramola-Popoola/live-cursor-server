//database copy

import { ConnectedUsers, LastSeenTime, SocketConnections } from "../core/main.interface";

export const connections: SocketConnections = {};
export const users: ConnectedUsers = {};

export const lastSeenDb: LastSeenTime = {};