require('dotenv').config()
const Server = require("./models/Server");

const server = new Server();



const path = "./db/productos.json"

server.listen()


