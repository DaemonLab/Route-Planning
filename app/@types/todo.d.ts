export interface TodoType {
    id: number;
    title: string;
    description: string;
    status: boolean;
};

export type TodoContextType = {
    todos: TodoType[];
    saveTodo: (todo: Todo) => void;
    updateTodo: (id: number) => void;
};