import { prisma } from "../../data/postgres";
import { CreateTodoDto, TodoDataSource, TodoEntity, UpdateTodoDto } from "../../domain";



export class PostgresDataSource implements TodoDataSource {

    async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        const newTodo = await prisma.todo.create({ data: { title: createTodoDto.title } });
        return TodoEntity.fromObject(newTodo);
    }

    async getAll(): Promise<TodoEntity[]> {
        const todos = await prisma.todo.findMany();
        return todos.map(todo => TodoEntity.fromObject(todo));
    }

    async getById(id: number): Promise<TodoEntity> {
        const todo = await prisma.todo.findUnique({ where: { id } });
        if (!todo) {
            throw new Error(`Todo with id ${id} not found`);
        }
        return TodoEntity.fromObject(todo);
    }

    async update(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
        await this.getById(updateTodoDto.id);

        const updatedTodo = {
            title: updateTodoDto?.title,
            completedAt: updateTodoDto?.completedAt
        }
        const newTodo = await prisma.todo.update({ where: { id: updateTodoDto.id }, data: updatedTodo });
        return TodoEntity.fromObject(newTodo);
    }

    async delete(id: number): Promise<TodoEntity> {
        await this.getById(id);

        const deletedTodo = await prisma.todo.delete({ where: { id } });

        return TodoEntity.fromObject(deletedTodo);
    }

}