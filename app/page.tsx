"use client";
import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import AddTodo from "./components/AddTodo";
import { Todo } from "./types/TodoTypes";
import TodoList from "./components/TodoList";

const URL = process.env.NEXT_PUBLIC_PB_URL;

const getTodoList = async () => {
  const response = await fetch(
    `${URL}/collections/Todos/records?fields=id,text,isComplete`
  );
  const data = await response.json();
  return data.items;
};

export default async function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const getTodo = async () => {
    const data = await getTodoList();
    setTodos(data);
  };

  useEffect(() => {
    getTodo();
  }, []);

  return (
    <Container>
      <AddTodo getTodo={getTodo} />
      <TodoList todos={todos} getTodo={getTodo} />
    </Container>
  );
}
