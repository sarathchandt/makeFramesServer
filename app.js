import {} from 'dotenv/config'
import express from 'express';
import http from 'http'
import path from 'path' ;
import { fileURLToPath } from 'url'
import db from './dbConfig/connection.mjs'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import { Server as SocketIOServer, Socket } from 'socket.io';



//.......................        
  
import userRoutes from './routes/user.mjs';
import adminRoutes from './routes/admin.mjs'



//..................

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express()
const server = http.createServer(app);



//.....................
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({limit: "50mb", extended: true,  parameterLimit: 50000 })); 
app.use(express.static(path.join(__dirname, 'public'))); 
app.use(cors({ 
    origin:['https://makeframes.netlify.app/'],
    method:['POST', 'GET', 'PUT', 'DELETE','PATCH'],
    credentials: true,
    allowedHeaders: [
        'Content-Type', 
        'Access',
        'Authorization'
    ]
}))  



// mongoose..............
db.connect()


//.......................

app.use('/user',userRoutes);
app.use('/admin',adminRoutes)






// ...........soket ...........

const io = new SocketIOServer(server, {
    cors: {
        origin:'https://makeframes.netlify.app',
        methods:['POST', 'GET'],
        credentials: true,
        allowedHeaders: [
            'Content-Type', 
            'Access',
            'Authorization'
        ]
    } 
});
const onlineUsers = new Map();
io.on("connection", async(socket) => { 
    console.log('Client connected:', socket.id, new Date());

    socket.on("addUser", (id) => {
        onlineUsers.set(id, socket.id);
    })
    socket.on("send-msg", (data) => {
        var sendUserSocket = onlineUsers.get(data.to)
        // if (sendUserSocket) {
        //     console.log(onlineUsers);
        //     console.log( sendUserSocket );
        //     socket.to(sendUserSocket).emit('receive', data)
        // }

        sendMessageToClient(sendUserSocket,data)

        function sendMessageToClient(clientId, message) {
            console.log(io.sockets);
            const soc = io.sockets.connected[clientId]; 
            if (soc) {
              soc.emit('message', message);
            } else {
              console.error(`Client with ID ${clientId} not found`);
            }
          }


        // socket.broadcast.emit('receive',data)
    })
    // Handle disconnections
    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
})


server.listen(3033,()=>{ 
    console.log('sset');
})
