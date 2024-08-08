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
    constructor() {}

    public getTodos(req: Request, res: Response) {
        return res.json(todos);
    }


}