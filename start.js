const pm2 = require('pm2');
const { promisify } = require('util');

const connect = promisify(pm2.connect.bind(pm2));
const start = promisify(pm2.start.bind(pm2));
const list = promisify(pm2.list.bind(pm2));

connect()
    .then(() => start('ecosystem.config.js'))
    .then(() => list())
    .then(processes => {
        const planetPlayApi = processes.find(p => p.name === 'planetPlay-api');

        if (!planetPlayApi) {
            throw new Error('planetPlay-api not found in PM2 processes');
        }

        process.on('SIGINT', () => {
            pm2.delete('planetPlay-api', () => {
                pm2.disconnect();
                process.exit();
            });
        });

        setInterval(() => {}, 1000);
    })
    .catch(err => {
        console.error('Error:', err);
        process.exit(1);
    });
