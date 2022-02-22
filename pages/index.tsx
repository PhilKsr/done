import type { NextPage } from "next";
import { useState } from "react";
import InputField from "../components/InputField";
import TodoList from "../components/TodoList";
import { Todo } from "../lib/model";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { ThemeProvider } from "./components/ThemeContext";

const Home: NextPage = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo("");
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;
    let add,
      active = todos,
      complete = completedTodos;

    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }
    setCompletedTodos(complete);
    setTodos(active);
  };

  return (
    <ThemeProvider>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className='w-full flex flex-col items-center  '>
          <h1 className=' text-6xl xl:text-9xl font-bold m-8 xl:m-24 text-slate-700'>
            DONE.
          </h1>
          <InputField todo={todo} setTodo={setTodo} onHandleAdd={handleAdd} />
          <TodoList
            todos={todos}
            onSetTodos={setTodos}
            completedTodos={completedTodos}
            onSetCompletedTodos={setCompletedTodos}
          />
        </div>
      </DragDropContext>
    </ThemeProvider>
  );
};

export default Home;
