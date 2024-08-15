import { CreateTodoDto, TodoDataSource, TodoEntity, TodoRepository, UpdateTodoDto } from "../../domain";


export class TodoRepositoryImp implements TodoRepository {

    constructor(private readonly dataSource: TodoDataSource) { }

    create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        return this.dataSource.create(createTodoDto);
    }
    getAll(): Promise<TodoEntity[]> {
        return this.dataSource.getAll();
    }
    getById(id: number): Promise<TodoEntity> {
        return this.dataSource.getById(id);
    }
    update(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
        return this.dataSource.update(updateTodoDto);
    }
    delete(id: number): Promise<TodoEntity> {
        return this.dataSource.delete(id);
    }
}