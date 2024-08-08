import { Request, Response } from "express";

const todos = [
    {
        id: 1,
        title: 'Learn TypeScript',
        completed: false
    },
    {
        id: 2,
        title: 'Learn Node.js',
        completed: false
    },
    {
        id: 3,
        title: 'Learn Express',
        completed: false
    }
];


export class TodosController {
    //* DI
    constructor() { }

    public getTodos = (req: Request, res: Response): Response => {
        return res.json(todos);
    }

    public getTodoById = (req: Request, res: Response): Response => {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID must be a number' });
        }

        const todo = todos.find(todo => todo.id === id);

        if (!todo) {
            return res.status(404).json({ Error: `Todo with id ${id} not found` })
        }
        return res.status(200).json({ todo });
    }

    public createTodo = (req: Request, res: Response): Response => {
        let { title , completed } = req.body;
        completed = completed === 'true' ? true : false;

        if(!title && !completed) {
            return res.status(400).json({ error: 'title or completed must be provided' });
        }
        todos.push({ id: todos.length + 1, title, completed });
        return res.status(201).json({ message: 'Todo created successfully' });
    }

    public updateTodo = (req: Request, res: Response): Response => {
        const id = Number(req.params.id);
        const { title, completed } = req.body;
        const todo = todos.find(todo => todo.id === id);

        if (!todo) {
            return res.status(404).json({ Error: `Todo with id ${id} not found` })
        }

        todo.title = title || todo.title;
        todo.completed = completed || todo.completed;

        return res.status(200).json({ message: 'Todo updated successfully' });
    }
}