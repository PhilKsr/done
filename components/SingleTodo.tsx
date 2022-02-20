import { FormEvent, SetStateAction, useEffect, useRef, useState } from "react";
import { Todo } from "../lib/model";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import TodoList from "./TodoList";

interface Props {
  todo: Todo;
  todos: Todo[];
  onSetTodos: React.Dispatch<SetStateAction<Todo[]>>;
}

const SingleTodo = ({ todo, todos, onSetTodos }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const handleDone = (id: number) => {
    onSetTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const handleDelete = (id: number) => {
    onSetTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEdit = (e: FormEvent, id: number) => {
    e.preventDefault();
    onSetTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <form onSubmit={(e) => handleEdit(e, todo.id)}>
      {edit ? (
        <input
          ref={inputRef}
          type='text'
          value={editTodo}
          onChange={(e) => setEditTodo(e.target.value)}
        />
      ) : todo.isDone ? (
        <span className='line-through'>{todo.todo}</span>
      ) : (
        <span>{todo.todo}</span>
      )}
      <div>
        <span
          onClick={() => {
            if (!edit && !todo.isDone) {
              setEdit(!edit);
            }
          }}>
          <AiFillEdit />
        </span>
        <span>
          <AiFillDelete onClick={() => handleDelete(todo.id)} />
        </span>
        <span onClick={() => handleDone(todo.id)}>
          <MdDone />
        </span>
      </div>
    </form>
  );
};

export default SingleTodo;
