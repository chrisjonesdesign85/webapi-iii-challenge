// code away!
const server = require('./server.js');
const port = process.env.PORT || 8252;

server.listen(port, () => {
    console.log(`server listening on port ${port}`);
});