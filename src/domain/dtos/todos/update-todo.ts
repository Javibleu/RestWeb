


export class UpdateTodoDto {

    private constructor(
        public readonly id: number,
        public readonly title?: string,
        public readonly completedAt?: Date
    ) { }

    public static create(props: { [key: string]: any }): { error?: string, dto?: UpdateTodoDto } {
        const { id, title, completedAt } = props;

        const { error, dto } = UpdateTodoDto.validate(id, title, completedAt);
        if (error) {
            return { error };
        }
        return { dto };
    }
    // ! RESTA VALIDAR ANIO FUERA DE RANGO IE. 20222-01-01

    private static validate(id: number, text: string | undefined, completedAt: string | Date | undefined) {
        if (typeof id !== 'number' || isNaN(id)) {
            return { error: "ID must be a valid number" };
        }


        if (completedAt !== undefined) {
            completedAt = new Date(completedAt).getTimezoneOffset() === 0 ? new Date(completedAt) : new Date(completedAt + "Z");

            if (!(completedAt instanceof Date) || isNaN(completedAt.getTime())) {
                return { error: "CompletedAt must be a valid Date" };
            }
            const year = completedAt.getUTCFullYear();
            const month = completedAt.getUTCMonth() + 1; // getUTCMonth() returns 0-11
            const day = completedAt.getUTCDate();

            if (year < 1900 || year > 2100) {
                return { error: "Year must be between 1900 and 2100" };
            }

            if (month < 1 || month > 12) {
                return { error: "Month must be between 1 and 12" };
            }

            if (day < 1 || day > 31) {
                return { error: "Day must be between 1 and 31" };
            }
        }

        return { dto: new UpdateTodoDto(id, text, completedAt) };
    }
}