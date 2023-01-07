import * as React from "react";
import { TodosContextType, TodoType } from "../../@types/todo";
import { TodoContext } from "../../context/todosContext";

export default function Todo() {
  const { todos, saveTodo, updateTodo } = React.useContext(
    TodoContext
  ) as TodosContextType;

  const [formData, setFormData] = React.useState<TodoType | {}>();

  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  const handleSaveTodo = (e: React.FormEvent, formData: TodoType | any) => {
    e.preventDefault();
    saveTodo(formData);
  };

  return (
    <>
      <h1>.............CURRENT TODOS.............</h1>

      <br />
      <br />
      <br />

      <ul>
        {todos.map((todo: TodoType) => (
          <li key={todo.id}>
            Title : {todo.title} , Description : {todo.description} , Status :{" "}
            {todo.status ? "true" : "false"}
            <button onClick={() => updateTodo(todo.id)}>Toggle</button>
          </li>
        ))}
      </ul>

      <br />
      <br />
      <br />
      <br />
      <br />

      <h1>.............ADD TODO.............</h1>

      <br />
      <br />
      <br />

      <form className="Form" onSubmit={(e) => handleSaveTodo(e, formData)}>
        <div>
          <div>
            <label htmlFor="name">Title</label>
            <input onChange={handleForm} type="text" id="title" />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <input onChange={handleForm} type="text" id="description" />
          </div>
        </div>
        <button disabled={formData === undefined ? true : false}>
          Add Todo
        </button>
      </form>
    </>
  );
}
