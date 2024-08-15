import { Request, Response } from "express";
import { CreateTodoDto } from "../../domain/dtos";
import { UpdateTodoDto } from "../../domain/dtos/todos/update-todo";
import { CreateTodo, DeleteTodo, GetTodo, GetTodos, TodoRepository, UpdateTodo } from "../../domain";
import { debug } from "console";

/**
 * Controller class for managing todos.
 */
export class TodosController {
    //* DI
    constructor(
        private readonly todoRepository: TodoRepository
    ) { }

    public getTodos = (req: Request, res: Response): void => {
        // const todos = await this.todoRepository.getAll();
        // return res.status(200).json({ todos });
        debugger;
        new GetTodos(this.todoRepository).execute()
            .then(todos => res.status(200).json({ todos }))
            .catch(error => res.status(500).json({ error: error.message }));
    }

    /**
     * Retrieves a todo by its ID.
     * 
     * @param req - The request object.
     * @param res - The response object.
     * @returns The response containing the todo if found, or an error if the ID is not a number or the todo is not found.
     */
    public getTodoById = (req: Request, res: Response) => {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID must be a number' });
        }

        // try {
        //     const todo = await this.todoRepository.getById(id);
        //     return res.status(200).json({ todo });
        // } catch (error: any) {
        //     return res.status(404).json({ error: error.message });
        // }

        new GetTodo(this.todoRepository).execute(id)
            .then(todo => res.status(200).json({ todo }))
            .catch(error => res.status(404).json({ error: error.message }));
    }

    /**
     * Creates a new todo.
     * 
     * @param req - The request object.
     * @param res - The response object.
     * @returns The response containing the newly created todo, or an error if the title is not provided or does not meet the requirements.
     */
    public createTodo = async (req: Request, res: Response) => {
        const { error, dto } = CreateTodoDto.create(req.body);

        if (error) {
            return res.status(400).json({ error: error });
        }

        // const newTodo = await this.todoRepository.create(dto!)
        // return res.status(201).json({ message: 'Todo created successfully', todo: newTodo });

        new CreateTodo(this.todoRepository).execute(dto!)
            .then(newTodo => res.status(201).json({ message: 'Todo created successfully', todo: newTodo }))
            .catch(error => res.status(500).json({ error: error.message }));
    }

    public updateTodo = async (req: Request, res: Response) => {
        const id = Number(req.params.id);

        const dto = UpdateTodoDto.create({ ...req.body, id });

        if (dto.error) {
            return res.status(400).json({ error: dto.error });
        }

        // try {
        //     const todo = await this.todoRepository.getById(id);
        //     if (!todo) {
        //         return res.status(404).json({ error: `Todo with id ${id} not found` });
        //     }

        //     const updatedTodo = await this.todoRepository.update(dto.dto!);
        //     return res.status(200).json({ message: 'Todo updated successfully', todo: updatedTodo });
        // } catch (error: any) {
        //     return res.status(500).json({ error: error.message });
        // }

        new UpdateTodo(this.todoRepository).execute(dto.dto!)
            .then(updatedTodo => res.status(200).json({ message: 'Todo updated successfully', todo: updatedTodo }))
            .catch(error => res.status(500).json({ error: error.message }));
    }

    public deleteTodo = async (req: Request, res: Response) => {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID must be a number' });
        }

        new DeleteTodo(this.todoRepository).execute(id)
            .then(todo => res.status(200).json({ message: 'Todo deleted successfully', todo }))
            .catch(error => res.status(400).json({ error: error.message }));

        // try {

        //     await this.todoRepository.getById(id);

        //     const deletedTodo = await this.todoRepository.delete(id);

        //     return res.status(200).json({
        //         message: 'Todo deleted successfully',
        //         todo: deletedTodo
        //     });
        // } catch (error: any) {
        //     return res.status(500).json({ error: error.message })
        // }
    }
}