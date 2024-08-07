import http from 'http'
import fs from 'fs'

const server = http.createServer((req, res) => {


    if(req.url?.endsWith('.js')) res.writeHead(200, { 'Content-Type': 'text/javascript' });
    if(req.url?.endsWith('.css')) res.writeHead(200, { 'Content-Type': 'text/css' });
    if(req.url?.endsWith('.png')) res.writeHead(200, { 'Content-Type': 'image/png' });
    if(req.url?.endsWith('.jpg')) res.writeHead(200, { 'Content-Type': 'image/jpg' });
    if(req.url?.endsWith('.jpeg')) res.writeHead(200, { 'Content-Type': 'image/jpeg' });
    if(req.url?.endsWith('.gif')) res.writeHead(200, { 'Content-Type': 'image/gif' });
    if(req.url?.endsWith('.svg')) res.writeHead(200, { 'Content-Type': 'image/svg+xml' });
    if(req.url?.endsWith('.ico')) res.writeHead(200, { 'Content-Type': 'image/x-icon' });
    if(req.url?.endsWith('.json')) res.writeHead(200, { 'Content-Type': 'application/json' });
    if(req.url?.endsWith('.pdf')) res.writeHead(200, { 'Content-Type': 'application/pdf' });
    if(req.url?.endsWith('.zip')) res.writeHead(200, { 'Content-Type': 'application/zip' });
    if(req.url?.endsWith('.mp3')) res.writeHead(200, { 'Content-Type': 'audio/mpeg' });
    if(req.url?.endsWith('.mp4')) res.writeHead(200, { 'Content-Type': 'video/mp4' });
    if(req.url?.endsWith('.ogg')) res.writeHead(200, { 'Content-Type': 'audio/ogg' });
    if(req.url?.endsWith('.wav')) res.writeHead(200, { 'Content-Type': 'audio/wav' });
    if(req.url?.endsWith('.webm')) res.writeHead(200, { 'Content-Type': 'video/webm' });

    if(req.url === '/'){
        const htmlFile = fs.readFileSync('public/index.html', 'utf8');
        res.end(htmlFile);
        return;
    } 
    try {
        const responseContent = fs.readFileSync(`./public${req.url}`, 'utf8');
        res.end(responseContent);
    } catch (error) {
        res.end('404 Not Found');
    }
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
});