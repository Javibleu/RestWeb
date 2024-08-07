import express from 'express';


export class Server {

    private app = express();
 
    async start(){

        // Middlewares
        this.app.get('/hello', (req, res) => {
            res.send('Hello World')
        });

        // Public Folder
        this.app.use(express.static('public'));


        this.app.listen(3000, () => {
            console.log('Server is running on http://localhost:3000')
        })
    }
}