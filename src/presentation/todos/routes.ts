import { Router } from "express";
import { TodosController } from "./controller";
import { PostgresDataSource } from "../../infrastructure/datasource/todo.datasource";
import { TodoRepositoryImp } from "../../infrastructure/repository/todo.repository";



export class TodoRoutes {

    static get routes(): Router {
        
        const router: Router = Router();

        const datasource = new PostgresDataSource(); // create datasource
        const todoRepository = new TodoRepositoryImp(datasource); // inject datasource

        const todosController = new TodosController(todoRepository); // DI
    
        router.get('/todos', todosController.getTodos);
        router.get('/todos/:id', todosController.getTodoById);
        router.post('/todos', todosController.createTodo);
        router.put('/todos/:id', todosController.updateTodo);
        router.delete('/todos/:id', todosController.deleteTodo);

        return router;
    }
}