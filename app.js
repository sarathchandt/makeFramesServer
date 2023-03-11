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
    origin:'https://makeframes.netlify.app/',
  
//     "https://main.d1me12wsnvmr92.amplifyapp.com/" 
// ],
//  origin:  "http://localhost:8000"  ,
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
        origin:'https://makeframes.netlify.app/',
        
        // origin:'http://localhost:8000',
        // origin:'*',

        methods:['POST', 'GET', 'PUT', 'DELETE','PATCH'],
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
       if(onlineUsers.get(id)){
           onlineUsers.delete(id)
          onlineUsers.set(id, socket.id);
        } else{
            onlineUsers.set(id, socket.id);
        }
    })
    socket.on("send-msg", (data) => {
        var sendUserSocket = onlineUsers.get(data.to)
       
     
        // if (sendUserSocket) {
        //     console.log(onlineUsers);
        //     console.log( sendUserSocket );
        //     socket.to(sendUserSocket).emit('receive', data)
        // }

       


        socket.broadcast.emit('receive',data)
    })
    // Handle disconnections
    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
})


server.listen(3033,()=>{ 
    console.log('sset');
})
