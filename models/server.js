const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');





class Server{
     
    constructor(){
        this.app = express();
        this.port=process.env.PORT;
        this.server = require('http').Server(this.app);
        this.io = require("socket.io")(this.server, {
            cors: {
              origin: "*",
              methods: ["GET", "POST"]
            }
          });;
        //Conectar a Base de datos
        this.connectDB();
        //MIDDLEWARE
        
        this.listenSockets()
        this.middlewares();
        this.routes();
    }

    async connectDB(){
        await dbConnection();
    }
    middlewares(){
        this.app.use(cors());
        //Lectura de Body
        //Directorio Publico
        this.app.use(express.static('public'));
    }

    listenSockets(){
        this.io.on('connection',client=>{
            const handshake=client.id;
            //let {nameRoom}=client.handshake.query;
            //console.log(client.handshake);
            client.join('SALA X')
            console.log('Cliente conectado: '+handshake);


            client.on('emit-data',(data)=>{
                client.to('SALA X').emit('emit-data',data)
            })


            
        });      
    }

    routes(){
        this.app.use(require('../routes/auth'));
        this.app.use(require('../routes/user')); 
    }

    start(){
        this.server.listen(this.port,()=>{
            console.log('Servidor levantado en: ', this.port);
        });
    }
}

module.exports= Server;