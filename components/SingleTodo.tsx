import { FormEvent, SetStateAction, useEffect, useRef, useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Draggable } from "react-beautiful-dnd";
import Todo from "../types/Todo";

interface Props {
  index: number;
  todo: Todo;
  todos: Todo[];
  onSetTodos: React.Dispatch<SetStateAction<Todo[]>>;
}

const SingleTodo = ({ index, todo, todos, onSetTodos }: Props) => {
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
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          className={`${
            snapshot.isDragging ? "shadow-lg" : ""
          } flex self-center w-11/12 p-4 mt-4 bg-white dark:bg-slate-700 dark:text-white rounded-lg justify-between hover:scale-105 hover:shadow-lg`}
          onSubmit={(e) => handleEdit(e, todo.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}>
          {edit ? (
            <input
              className='focus:outline-none active:outline-none  p-1 border-none w-2/3 relative items-center ease-in-out duration-200 dark:bg-slate-700'
              ref={inputRef}
              type='text'
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
            />
          ) : todo.isDone ? (
            <span className='line-through focus:outline-none p-1 border-none'>
              {todo.todo}
            </span>
          ) : (
            <span>{todo.todo}</span>
          )}
          <div className=' focus:outline-none flex p-1 border-none justify-end'>
            <span
              className='ml-2 cursor-pointer'
              onClick={() => {
                if (!edit && !todo.isDone) {
                  setEdit(!edit);
                }
              }}>
              <AiFillEdit />
            </span>
            <span className='ml-2 cursor-pointer'>
              <AiFillDelete onClick={() => handleDelete(todo.id)} />
            </span>
            <span
              className='ml-2 cursor-pointer'
              onClick={() => handleDone(todo.id)}>
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
