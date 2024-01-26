import React from "react";
import { Todo } from "../types/TodoTypes";

interface TodoItemProps {
  todo: Todo;
  getTodo: () => void;
}

const URL = process.env.NEXT_PUBLIC_PB_URL;
const updateTodo = async (todo: Todo) => {
  const response = await fetch(`${URL}/collections/Todos/records/${todo.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ isComplete: !todo.isComplete }),
  });
  return response;
};
const TodoItem: React.FC<TodoItemProps> = ({ todo, getTodo }) => {
  const toggleIsComplete = async (id: string) => {
    try {
      const response = await updateTodo(todo);
      if (response.ok) {
        getTodo();
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div onClick={() => toggleIsComplete(todo.id)}>
      <p>{todo.isComplete ? todo.text.strike() : todo.text}</p>
    </div>
  );
};

export default TodoItem;
