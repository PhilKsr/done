import type { NextPage } from "next";
import { useEffect, useState } from "react";
import InputField from "../components/InputField";
import TodoList from "../components/TodoList";
import ModeToggle from "../components/ModeToggle";
import Background from "../components/Background";
import { Todo } from "../types/Todo";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { ThemeProvider } from "../themes/mode";
import useLocalStorage from "../lib/useLocalStorage";

const Home: NextPage = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const [storedValue, setValue] = useLocalStorage<Todo[]>("_Todos", []);

  useEffect(() => setTodos(storedValue), []);
  useEffect(() => setValue(todos), [todos]);

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
    <DragDropContext onDragEnd={onDragEnd}>
      <ThemeProvider>
        <Background>
          <div className='w-full flex flex-col items-center selection:text-orange-400 dark:selection:text-teal-300 '>
            <h1 className=' text-6xl xl:text-9xl font-bold m-8 xl:m-24 text-slate-700 dark:text-white'>
              DONE.
            </h1>
            <ModeToggle />
            <InputField todo={todo} setTodo={setTodo} onHandleAdd={handleAdd} />
            <TodoList
              todos={todos}
              onSetTodos={setTodos}
              completedTodos={completedTodos}
              onSetCompletedTodos={setCompletedTodos}
            />
          </div>
        </Background>
      </ThemeProvider>
    </DragDropContext>
  );
};

export default Home;
