import express from "express";
import http from "http";
import { Server } from "socket.io"
import user from "./src/pages/User.tsx";


const port = process.env.PORT || 4001;

const app = express();
const router = express.Router();

router.get("/", (req, res) => {
    res.send({ response: "I am alive" }).status(200);
});

app.use(router);

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

let interval;
const usersConnected = []

io.on("connection", (socket) => {
    console.log("New client connected");
    console.log(usersConnected)
    if (interval) {
        clearInterval(interval);
    }
    interval = setInterval(() => getApiAndEmit(socket), 1000);

    socket.on('user login', ({ username }) => {
        if (!usersConnected.find((u) => u.user.id === user.id)) {
            usersConnected.push(user)
            io.emit('new user list', usersConnected)
        }
        console.log(username)
        io.emit('new login', user);
    });
    socket.on("disconnect", () => {
        console.log("Client Disconnected");
        clearInterval(interval);
    });
});

const getApiAndEmit = socket => {
    const response  = new Date();
    socket.emit("FromAPI", response);
};

server.listen(port, () => console.log(`Listening on port ${port}`));