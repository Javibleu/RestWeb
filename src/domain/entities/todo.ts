


export class TodoEntity {
    constructor(
        public id: number,
        public title: string,
        public completedAt?: Date | null
    ) {}

    get isCompleted(): boolean {
        return !!this.completedAt;
    }

    public static fromObject(todo: { id: number; title: string; completedAt?: Date | null }): TodoEntity {
        const { id, title, completedAt } = todo;
        if (!id) throw new Error('ID is required');
        if (!title) throw new Error('Title is required');
        
        let newCompletedAt: Date | null = null;
        if (completedAt) {
            newCompletedAt = new Date(completedAt);
            if (isNaN(newCompletedAt.getTime())) {
                throw new Error('Invalid date');
            }
        }
        return new TodoEntity(id, title, newCompletedAt);
    }
}