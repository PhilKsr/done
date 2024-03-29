import { SetStateAction } from "react";
import { Droppable } from "react-beautiful-dnd";
import Todo from "../types/Todo";
import SingleTodo from "./SingleTodo";

interface Props {
  todos: Todo[];
  onSetTodos: React.Dispatch<SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  onSetCompletedTodos: React.Dispatch<SetStateAction<Todo[]>>;
}

const TodoList = ({
  todos,
  onSetTodos,
  completedTodos,
  onSetCompletedTodos,
}: Props) => {
  return (
    <div className='flex flex-col xl:flex-row min-w-0 w-2/3 xl:w-11/12 justify-evenly group '>
      <Droppable droppableId='TodosList'>
        {(provided, snapshot) => (
          <div
            className={`${
              snapshot.isDraggingOver
                ? "hover:bg-green-400 dark:hover:bg-green-200"
                : ""
            } flex flex-col p-5 m-4 bg-green-300 rounded-lg min-w-0 xl:w-11/12 text-center`}
            ref={provided.innerRef}
            {...provided.droppableProps}>
            <span>ACTIVE</span>
            {todos.map((t, index) => (
              <SingleTodo
                index={index}
                key={t.id}
                todo={t}
                todos={todos}
                onSetTodos={onSetTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId='TodosDone'>
        {(provided, snapshot) => (
          <div
            className={`${
              snapshot.isDraggingOver
                ? "hover:bg-red-400 dark:hover:bg-red-200"
                : ""
            } flex flex-col p-5 m-4 bg-red-300 rounded-xl min-w-0 xl:w-11/12 text-center`}
            ref={provided.innerRef}
            {...provided.droppableProps}>
            <span>DONE</span>
            {completedTodos.map((t, index) => (
              <SingleTodo
                index={index}
                key={t.id}
                todo={t}
                todos={completedTodos}
                onSetTodos={onSetCompletedTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
