import { io, Socket } from "socket.io-client";

class SocketServices {
    //1. Variable statique qui stocke l'unique instance
    private static instance: SocketServices

    //2. Le socket Socket.io accessible publiquement
    public socket: Socket;

    //3. Constructeur privé pour interdire le "new SocketServices()"
    private constructor() {
        this.socket = io("http://localhost:4001");
    }

    //4. Point d'accès global pour récupérer l'instance unique
    public static getInstance(): SocketServices {
        if (!SocketServices.instance) {
            SocketServices.instance = new SocketServices();
        }
        return SocketServices.instance;
    }
}

export default SocketServices;