import React from "react";
import { Todo } from "../types/TodoTypes";
import TodoItem from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
  getTodo: () => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, getTodo }) => {
  return (
    <div>
      {todos.map((todo: Todo) => (
        <TodoItem key={todo.id} todo={todo} getTodo={getTodo} />
      ))}
    </div>
  );
};

export default TodoList;
