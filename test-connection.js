const net = require('net');

const host = 'ep-quiet-rice-adi01bsn-pooler.c-2.us-east-1.aws.neon.tech';
const port = 5432;

console.log(`Attempting to connect to ${host}:${port}...`);

const socket = new net.Socket();
socket.setTimeout(5000); // 5 second timeout

socket.on('connect', () => {
    console.log('SUCCESS: Connected to database port!');
    socket.destroy();
});

socket.on('timeout', () => {
    console.error('ERROR: Connection timed out. Firewall or network issue.');
    socket.destroy();
});

socket.on('error', (err) => {
    console.error(`ERROR: Connection failed: ${err.message}`);
});

socket.connect(port, host);
