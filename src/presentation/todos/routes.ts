import { Router } from "express";
import { TodosController } from "./controller";



export class TodoRoutes {

    static get routes(): Router {
        
        const router: Router = Router();

        const todosController = new TodosController(); // DI
    
        router.get('/todos', todosController.getTodos);
        router.get('/todos/:id', todosController.getTodoById)

        return router;
    }
}