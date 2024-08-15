import { CreateTodoDto } from "../../dtos";
import { TodoEntity } from "../../entities/todo";
import { TodoRepository } from "../../repositories/todo.repository";



export interface CreateTodo {
    execute(dto: CreateTodoDto): Promise<TodoEntity>;
}

export class CreateTodo implements CreateTodo {

    constructor(private readonly todoRepository: TodoRepository) { }

    execute(dto: CreateTodoDto): Promise<TodoEntity> {
        return this.todoRepository.create(dto);
    }
}