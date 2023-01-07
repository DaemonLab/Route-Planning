import * as React from "react";
import { TodosContextType, TodoType } from "../@types/todo";

export const TodoContext = React.createContext<TodosContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

const TodoProvider: React.FC<Props> = ({ children }: Props) => {
  const [todos, setTodos] = React.useState<TodoType[]>([
    {
      id: 1,
      title: "post 1",
      description: "this is a description",
      status: false,
    },
    {
      id: 2,
      title: "post 2",
      description: "this is a description",
      status: true,
    },
  ]);

  const saveTodo = (todo: TodoType) => {
    const newTodo: TodoType = {
      id: Math.random(), // not really unique - but fine for this example
      title: todo.title,
      description: todo.description,
      status: false,
    };

    setTodos([...todos, newTodo]);
  };

  const updateTodo = (id: number) => {
    todos.filter((todo: TodoType) => {
      if (todo.id === id) {
        todo.status = !todo.status;
        setTodos([...todos]);
      }
    });
  };

  return (
    <TodoContext.Provider value={{ todos, saveTodo, updateTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
