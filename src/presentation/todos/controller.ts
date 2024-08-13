import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto } from "../../domain/dtos";
import { UpdateTodoDto } from "../../domain/dtos/todos/update-todo";

/**
 * Controller class for managing todos.
 */
export class TodosController {
    //* DI
    constructor() { }

    public getTodos = async (req: Request, res: Response): Promise<Response> => {

        const todos = await prisma.todo.findMany();
        return res.json(todos);
    }

    /**
     * Retrieves a todo by its ID.
     * 
     * @param req - The request object.
     * @param res - The response object.
     * @returns The response containing the todo if found, or an error if the ID is not a number or the todo is not found.
     */
    public getTodoById = async (req: Request, res: Response): Promise<Response> => {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID must be a number' });
        }

        const todo = await prisma.todo.findUnique({ where: { id } });

        if (!todo) {
            return res.status(404).json({ Error: `Todo with id ${id} not found` })
        }
        return res.status(200).json({ todo });
    }

    /**
     * Creates a new todo.
     * 
     * @param req - The request object.
     * @param res - The response object.
     * @returns The response containing the newly created todo, or an error if the title is not provided or does not meet the requirements.
     */
    public createTodo = async (req: Request, res: Response): Promise<Response> => {
        const { error, dto } = CreateTodoDto.create(req.body);
        let title = '';

        if (error) {
            return res.status(400).json({ error: error });
        }

        if (dto) {
            title = dto.title;
        }

        const newTodo = await prisma.todo.create({ data: { title } });
        return res.status(201).json({ message: 'Todo created successfully', todo: newTodo });
    }

    public updateTodo = async (req: Request, res: Response): Promise<Response> => {
        const id = Number(req.params.id);
        const dto = UpdateTodoDto.create(req.body);
        try {
            
            if (isNaN(id)) {
                return res.status(400).json({ error: 'ID must be a number' });
            }
            const todo = await prisma.todo.findUnique({ where: { id } });
            
            if (!todo) {
                return res.status(404).json({ Error: `Todo with id ${id} not found` });
            }
            
            if (dto.error) {
                return res.status(400).json({ error: dto.error });
            }
            
            const updTodo = {
                title: dto.dto?.title,
                completedAt: dto.dto?.completedAt
            }
            
            const newTodo = await prisma.todo.update({ where: { id }, data: updTodo });
            return res.status(200).json({ message: 'Todo updated successfully', todo: newTodo });
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
        }
        
        public deleteTodo = async (req: Request, res: Response): Promise<Response> => {
            const id = Number(req.params.id);
            
        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID must be a number' });
        }

        const todo = await prisma.todo.findUnique({ where: { id } });

        if (!todo) {
            return res.status(404).json({ error: `Todo with id ${id} not found` });
        }

        const deletedTodo = await prisma.todo.delete({ where: { id } });

        return res.status(200).json({
            message: 'Todo deleted successfully',
            todo: deletedTodo
        });
    }
}