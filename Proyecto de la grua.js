var http = require('http').createServer(handler);
const { Sign } = require('crypto');
var fs = require('fs'); 
const { resolve } = require('path');
var io = require('socket.io')(http) //require socket.io module and pass the http object (server)
var Gpio = require('pigpio').Gpio;


const sv1 = new Gpio(14, {mode: Gpio.OUTPUT});
const sv2 = new Gpio(15, {mode: Gpio.OUTPUT});
const sv3 = new Gpio(18, {mode: Gpio.OUTPUT});


let a = 750; 
sv1.servoWrite(a);

let b = 550;
sv2.servoWrite(b);


sv3.servoWrite(1500);



http.listen(8080); //listen to port 8080

function handler (req, res) { //what to do on requests to port 8080
  fs.readFile(__dirname + '/public/indexgrua.html', function(err, data) { //read file rgb.html in public folder
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'}); //display 404 on error
      return res.end("404 Not Found");
    }
    res.writeHead(200, {'Content-Type': 'text/html'}); //write HTML
    res.write(data); //write data from rgb.html
    return res.end();
  });
}


io.sockets.on('connection', function (socket) {// Web Socket Connection
    io.sockets.on('connection', function (socket) {///get light switch status from client
       var buttonState = 0; //variable to store button state
      
       socket.on('state1', function (data) {
          buttonState = data;
          console.log(data); //output data from WebSocket connection to console
          
        

      

          if ((data == 2500) &&  (a==750))
          {
        
 
            
            function delay(ms) {
              return new Promise(resolve => setTimeout(resolve, ms));}
  
            async function loopWithDelay1() {
            for (let i = 750; i < data+1; i++)  {
              console.log('iteracion',i);
              sv1.servoWrite(i);
              // Introduce un retraso de 1 segundo (1000 milisegundos) entre iteraciones
              await delay(2);
              a=i;//es el valor donde se quedo el servo
              console.log('valor de ',a);
                }
              }
             
          loopWithDelay1();
          
         }

            

         if ((data == 750) &&  (a==2500))
         {
       
           
           function delay(ms) {
             return new Promise(resolve => setTimeout(resolve, ms));}
 
           async function loopWithDelay1() {
           for (let i = 2500; i+1 > data; i--)  {
             console.log('iteracion',i);
             sv1.servoWrite(i);
             // Introduce un retraso de 1 segundo (1000 milisegundos) entre iteraciones
             await delay(2);
             a=i;//es el valor donde se quedo el servo
             console.log('valor de ',a);
               }
             }
            
         loopWithDelay1();
         
        }
           

        }); 
        
        socket.on('state2', function (data) {
            buttonState = data;
            console.log(data); //output data from WebSocket connection to console
           
           
            if ((data == 2450) &&  (b==550))
          {
        
       
            function delay(ms) {
              return new Promise(resolve => setTimeout(resolve, ms));}
  
            async function loopWithDelay1() {
            for (let i = 550; i < data+1; i++)  {
              console.log('iteracion',i);
              sv2.servoWrite(i);
              // Introduce un retraso de 1 segundo (1000 milisegundos) entre iteraciones
              await delay(7);
              b=i;//es el valor donde se quedo el servo
              console.log('valor de ',b);
                }
              }
             
          loopWithDelay1();
          
         }

            

         if ((data == 550) &&  (b==2450))
         {
       
   
           
           function delay(ms) {
             return new Promise(resolve => setTimeout(resolve, ms));}
 
           async function loopWithDelay1() {
           for (let i = 2450; i+1 > data; i--)  {
             console.log('iteracion',i);
             sv2.servoWrite(i);
             // Introduce un retraso de 1 segundo (1000 milisegundos) entre iteraciones
             await delay(7);
             b=i;//es el valor donde se quedo el servo
             console.log('valor de ',a);
               }
             }
            
         loopWithDelay1();
         
        }
           


        }); 
        
          
       socket.on('state3', function (data) {
            buttonState = data;
            console.log(data); //output data from WebSocket connection to console
            sv3.servoWrite(data);
          }); 
      
    
    });
  
}); 



process.on('SIGINT', function () {
    sv1.servoWrite(750);
    sv2.servoWrite(550);
    sv3.servoWrite(1500);
    process.exit();


  });



  
  
  