import express, { Router } from 'express';
import path from 'path';
import { errorHandler } from '../middlewares/error-handler';
import { envs } from '../config/envs';

interface ServerOptions {
    port: number
    public_path?: string
    routes: Router
}

export class Server {

    private app = express();
    private readonly port: number;
    private readonly publicPath: string;
    private readonly routes: Router;

    constructor(serverOptions: ServerOptions) {
        const { port, public_path = 'public', routes } = serverOptions;

        this.port = port;
        this.publicPath = public_path;
        this.routes = routes;
    }

    async start() {

        // Public Folder
        this.app.use(express.static(this.publicPath));


        // Middlewares
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
        // Routes
        this.app.use(this.routes);
        // SPA
        this.app.get('*', (req, res) => {
            const indexPath = path.join(__dirname, `../../${this.publicPath}/index.html`);
            res.sendFile(indexPath);
        })
        // Error-handling middleware should be the last middleware
        this.app.use(errorHandler);

        // listen
        this.app.listen(envs.PORT, () => {
            console.log(`Server is running on port ${envs.PORT}`);
        });
    }
}