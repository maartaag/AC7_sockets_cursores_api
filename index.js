import express from "express";
import { createServer, get } from "node:http";
import { Server } from "socket.io";
import cors from "cors";
// import { send } from "node:process";

const app = express();
const server = createServer(app);
const listaPersonas = {};
const usersConectados = {};
const io = new Server(server, {
  cors: {
    origin: "*", // on tens Astro
  },
});

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

io.on("connection", (socket) => {
  socket.on("connected", (algo) => {
    console.log("a user connected, " + algo);
    addUser(socket, algo);
    sendUsersConnectedList();
    io.emit("user:connected", {
      id: socket.id,
      ...usersConectados[socket.id],
    });
    io.emit("users:init", usersConectados);
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected, " + socket.id);
    let nom = getSpecificPerson(socket.id);
    if (nom === undefined) {
      console.log("user disconnected en undefined");
    } else {
      io.emit("user:disconnected", nom);
      socket.broadcast.emit("user:remove", socket.id);
      console.log("user disconnected en " + nom);
    }

    userDisconnect(socket);
    sendUsersConnectedList();
  });

  socket.on("users:list", () => {
    sendUsersConnectedList(socket);
  });

  socket.on("cursor:start", (data) => {
    socket.broadcast.emit("draw:start", data);
    console.log("draw:start", data);
  });

  // movimiento del cursor
  socket.on("cursor:move", (data) => {
    console.log("cursor:move", getSpecificPerson(socket.id), data);
    io.emit("cursor:move", {
      id: socket.id,
      ...data,
    });
  });

  socket.on("cursor:end", () => {
    socket.broadcast.emit("draw:end");
    console.log("draw:end " + getSpecificPerson(socket.id));
  });

  socket.on("clear", () => {
    console.log("clean canvas " + getSpecificPerson(socket.id));
    io.emit("clear");
  });
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});

function getSpecificPerson(socketId) {
  console.log(usersConectados[socketId]);
  return usersConectados[socketId];
}
function addUser(socket, nom) {
  listaPersonas[socket.id] = nom + "-" + new Date().toLocaleDateString();
  usersConectados[socket.id] = {
    nombre: nom,
    color: getRandomColor(),
  };
}
function userDisconnect(socket) {
  listaPersonas[socket.id] +=
    " - Desconectado el " + new Date().toLocaleDateString();
  delete usersConectados[socket.id];
}
function sendUsersConnectedList() {
  io.emit("users:list", Object.values(usersConectados));
}
function getRandomColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}
