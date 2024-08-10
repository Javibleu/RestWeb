


export class CreateTodoDto {
    public readonly title: string;

    private constructor(title: string) {
        this.title = title;
    }

    static create(props: { [key:string]: any }): { error?: string, dto?: CreateTodoDto } {
        const { title } = props;
        const { error, dto } = CreateTodoDto.validate(title);

        if (error) {
            return { error };
        }
        return { dto };
    }
    static validate(title: string): { error: any; dto: any; } {

        if (!title) {
            return { error: 'title must be provided', dto: null };
        }
        if (title.length < 5) {
            return { error: 'title must be at least 5 characters long', dto: null };
        }
        if (title.length > 50) {
            return { error: 'title must be at most 50 characters long', dto: null };
        }
        // Capitalize the first letter of title
        title = title.charAt(0).toUpperCase() + title.slice(1);
        return { error: null, dto: new CreateTodoDto(title) };
    }
}