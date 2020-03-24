
var express = require("express");

var app = express();
var server = app.listen(569);

app.use(express.static("public"));
console.log("yo mother fucking cunt!!");

var fs = require('fs');
var socket = require("socket.io");
var http = require("http");
var url = require("url");
var brightness = require("brightness")
var brain = require("brainjs");
const trainingData = [
    {input:[0,1], output: [0]},
    {input:[0,2], output: [0]},
    {input:[3,1], output: [1]},
    {input:[5,1], output: [1]},
    {input:[2,8], output: [0]},
    {input:[7,5], output: [1]},
    {input:[20,2], output: [1]},
    {input:[25,24], output: [1]},
    {input:[10,11], output: [0]},
];
//should be 0
var io = socket(server);

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "hackerG7",
  password: "rc28727057",
  database: "gbot"
});

con.on('error', function(err) {
    console.log("[mysql error]",err);
  });

function updateMemory(name,data){
    con.query("UPDATE memory SET data='"+String(data.trim())+"' WHERE name='"+String(name.trim())+"'");
}
function insertMemory(name,data){
    var sql = "INSERT INTO memory (name, data) VALUES ('"+String(name.trim())+"', '"+String(data.trim())+"')";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
}
CurrentMemory = getMemory();
ReceivedMemory = false;
function MemoryReady(){
    return ReceivedMemory;
}
function getMemory(){
    //ReceivedMemory = false;
    var r = "receving!";
    con.query("SELECT * FROM memory", function (err, result, fields) {
        if (err) throw err;
        console.log("received!");
        ReceivedMemory = true;
        CurrentMemory = result;
    });
    return r;
    //return null;
}

//function setMemoryAction(){defaultSetMemoryAction()};
function setMemoryAction(){
    setMemoryArray(WaitingInsert);
    WaitingInsert = [];
}
WaitingInsert = [];
function setMemoryArray(arr){
    //console.log(arr)
    for(memory of arr){
        setMemory(memory[0],memory[1]);
    }
}
function setMemory(name,data){
    var found = false;
    //console.log(CurrentMemory)
    if(MemoryReady()){
        for(m of CurrentMemory){
            var n = m.name;
            console.log("ss")
            if(n==name.trim()){
                updateMemory(name,data);
                console.log("updated")
                found = true;
            }
        }
        if(!found){
            insertMemory(name,data);
            console.log("inserted")
        }
        getMemory();
    }else{
        console.log("not ready to set Memory! Added to wait List");
        WaitingInsert.push([name,data]);
    }

}
function loop(){
    //console.log("sss")
    if(MemoryReady()){
        setMemoryAction()
    }
    
    setTimeout(loop, 1000);
}


setTimeout(loop, 1000);
con.connect(function(err) {
    //if (err) throw err;
    console.log("Connected!");
    //console.log(getMemory());
});
//sockets on:

io.sockets.on('connection',newConnection);



const SerialPort = require("serialport"); 
const Readline = SerialPort.parsers.Readline;
const port = new SerialPort("COM7");
const parser = port.pipe(new Readline({delimiter: "\r\n"}));
parser.on('data', (temp) => { //Read data
    console.log(temp);
    var today = new Date();
    io.sockets.emit('temp', {date: today.getDate()+"-"+today.getMonth()+1+"-"+today.getFullYear(), time: (today.getHours())+":"+(today.getMinutes()), temp:temp}); //emit the datd i.e. {date, time, temp} to all the connected clients.
});

//variables
io.on('connection', (socket) => {
    console.log("Someone connected."); //show a log as a new client connects.
})

function newConnection(socket){
    //brightness.set(0.8)
    console.log('new connection:' + socket.id);
    console.log(socket.id);
    socket.on("mouse",mouseMessage);
    function mouseMessage(data){
    socket.broadcast.emit("mouse",data);
    console.log(data);
    }
    function DataHandle(data){
        switch(data.msgName){
            case "setBrightness":
                brightness.set(data.level);
                console.log("setted brightness to "+data.level);
            break;
            case "setMemory":
                setMemory(data.NameOfMemory,data.DataOfMemory)
            break;
            case "getAllMemory":
                console.log("getting all memory")
                socket.emit("getAllMemory",{MemoryList:CurrentMemory})
            break;
            case "getMemory":
            console.log("getting memory");
                FoundMemory = undefined;
                name = data.NameOfMemory;
                for(m of CurrentMemory){
                    if(m.name==name){
                        FoundMemory = m;
                    }
                }
                if(FoundMemory!=undefined){
                    socket.emit("getMemory",{Memory:FoundMemory});
                    console.log("Founded Memory, sending")
                }else{
                    console.log("ERROR: cannot find the memory name")
                }
            break;
        }
    }
    socket.on('Data',DataHandle);
    
}
