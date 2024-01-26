import { Button, FormControl, Stack, TextField } from "@mui/material";
import React, { useState } from "react";

interface AddTodoProps {
  getTodo: () => void;
}
const URL = process.env.NEXT_PUBLIC_PB_URL;
const addTodo = async (text: string) => {
  const response = await fetch(`${URL}/collections/Todos/records`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text, isComplete: false }),
  });

  return response;
};

const AddTodo: React.FC<AddTodoProps> = ({ getTodo }) => {
  const [text, setText] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text) return;
    try {
      const response = await addTodo(text);
      if (response.ok) {
        setText("");
        getTodo();
      }
    } catch (error) {
      console.log("eeee", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl variant="standard" className="d-flex">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
        >
          <TextField
            id="outlined-basic"
            label="할일을 입력하세요"
            variant="outlined"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <Button variant="text" type="submit">
            추가
          </Button>
        </Stack>
      </FormControl>
    </form>
  );
};

export default AddTodo;
