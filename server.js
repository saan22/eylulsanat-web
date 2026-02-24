const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');
const path = require('path');

// Basit loglama fonksiyonu (Debug için)
const logFile = path.join(__dirname, 'server-debug.log');
function log(message) {
    const timestamp = new Date().toISOString();
    const msg = `${timestamp}: ${message}\n`;
    console.log(msg);
    try {
        fs.appendFileSync(logFile, msg);
    } catch (e) {
        // Log dosyasına yazılamazsa konsola yaz
        console.error("Log file write failed:", e);
    }
}

log("Server başlatılıyor...");

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;

log(`Environment: ${process.env.NODE_ENV}`);
log(`Port: ${port}`);
log(`Node Version: ${process.version}`);

try {
    const app = next({ dev, hostname, port });
    const handle = app.getRequestHandler();

    app.prepare().then(() => {
        log("Next.js app prepared successfully.");

        createServer(async (req, res) => {
            try {
                const parsedUrl = parse(req.url, true);

                await handle(req, res, parsedUrl);
            } catch (err) {
                log(`Request Error: ${err.message}`);
                console.error('Error occurred handling', req.url, err);
                res.statusCode = 500;
                res.end('Internal server error');
            }
        })
            .once('error', (err) => {
                log(`Server Error (Listen): ${err.message}`);
                console.error(err);
                process.exit(1);
            })
            .listen(port, () => {
                log(`> Ready on http://${hostname}:${port}`);
            });
    }).catch((err) => {
        log(`Next.js Prepare Error: ${err.message}\nStack: ${err.stack}`);
        console.error("App Prepare Failed:", err);
        process.exit(1);
    });

} catch (err) {
    log(`Global Setup Error: ${err.message}\nStack: ${err.stack}`);
    console.error("Global Error:", err);
}
