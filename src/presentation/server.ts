import express from 'express';
import path from 'path';

interface ServerOptions {
    port: number
    public_path?: string
}

export class Server {

    private app = express();
    private readonly port: number;
    private readonly publicPath: string;

    constructor(serverOptions: ServerOptions) {
        this.port = serverOptions.port;
        this.publicPath = serverOptions.public_path || 'public';
    }

    async start() {

        // Public Folder
        this.app.use(express.static(this.publicPath));


        // Middlewares
        this.app.get('/hello', (req, res) => {
            res.send('Hello World')
        });
        
        this.app.get('*', (req, res) => {
            const indexPath = path.join(__dirname, `../../${this.publicPath}/index.html`);
            res.sendFile(indexPath);
        })

        // listen
        this.app.listen(3000, () => {
            console.log('Server is running on http://localhost:3000')
        });
    }
}