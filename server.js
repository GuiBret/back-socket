const express = require('express'),
      app = express(),
      http = require('http').Server(app),
      io = require('socket.io')(http);
app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
    
        // authorized headers for preflight requests
        // https://developer.mozilla.org/en-US/docs/Glossary/preflight_request
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    
        app.options('*', (req, res) => {
            // allowed XHR methods  
            res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
            res.send();
        });
    });


io.on('connection', socket => {
    let previousID;

    // const joinFct = currentId => {
    //     socket.leave(previousID);
    //     socket.join(currentId);

    //     previousId = currentId;
    // }

    socket.on('checkboxSelected', checkbox_id => {
        socket.emit("checkboxModified", checkbox_id);
    });
});

io.listen(3001);