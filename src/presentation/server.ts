import express from 'express';
import path from 'path';


export class Server {

    private app = express();
 
    async start(){
        
        // Public Folder
        this.app.use(express.static('public'));
        
        // Middlewares
        this.app.get('/hello', (req, res) => {
            res.send('Hello World')
        });

        this.app.get('*', (req, res) => {
            const indexPath = path.join(__dirname, '../../public/index.html');
            res.sendFile(indexPath);
        })



        this.app.listen(3000, () => {
            console.log('Server is running on http://localhost:3000')
        })
    }
}