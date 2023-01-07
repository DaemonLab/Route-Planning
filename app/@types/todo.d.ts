export interface TodoType {
    id: number;
    title: string;
    description: string;
    status: boolean;
};

export type TodosContextType = {
    todos: TodoType[];
    saveTodo: (todo: TodoType) => void;
    updateTodo: (id: number) => void;
};