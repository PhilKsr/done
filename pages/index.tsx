import type { NextPage } from "next";
import { useState } from "react";
import InputField from "../components/InputField";
import TodoList from "../components/TodoList";
import { Todo } from "../lib/model";

const Home: NextPage = () => {
  const [todo, setTodo] = useState<string>("");

  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo("");
    }
  };

  return (
    <div className='container flex flex-col items-center h-screen w-screen'>
      <h1>DONE</h1>
      <InputField todo={todo} setTodo={setTodo} onHandleAdd={handleAdd} />
      <TodoList todos={todos} onSetTodos={setTodos} />
    </div>
  );
};

export default Home;
