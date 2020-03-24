function sendMsg(msgName, data){
    data.msgName = msgName;
    socket.emit("Data",data)
}