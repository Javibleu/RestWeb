


export class UpdateTodoDto {

    private constructor(
        public readonly title?: string, 
        public readonly completedAt?: Date
    ){}

    public static create(props: {[key:string]:any}):{error?:string, dto?: UpdateTodoDto}{
        const { title , completedAt } = props;
        const {error, dto} = UpdateTodoDto.validate(title, completedAt);
        if(error){
            return {error};
        }
        return {dto};
    }
    // ! RESTA VALIDAR ANIO FUERA DE RANGO IE. 20222-01-01
    private static validate(text: string, completedAt: Date){
        let parseDate:Date | null;
        if(completedAt){
            parseDate = new Date(completedAt);
            console.log(parseDate);
            if(parseDate.toString() === 'Invalid Date'){
                return {error: "CompletedAt format is not a valid Date"}
            }
        }
        const newText = text ? text : undefined;
        const newCompletedAt = completedAt ? parseDate! : undefined;

        return {dto: new UpdateTodoDto(newText, newCompletedAt)};
    }
}