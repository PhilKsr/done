import { SetStateAction } from "react";
import { Droppable } from "react-beautiful-dnd";
import { Todo } from "../lib/model";
import SingleTodo from "./SingleTodo";

interface Props {
  todos: Todo[];
  onSetTodos: React.Dispatch<SetStateAction<Todo[]>>;
}

const TodoList = ({ todos, onSetTodos }: Props) => {
  return (
    <div className='flex flex-wrap xl:w-2/5 justify-around group'>
      <Droppable droppableId='TodosList'>
        {(provided, snapshot) => (
          <div
            className={`${
              snapshot.isDraggingOver ? "dragactive" : ""
            } p-5 m-4 bg-green-400 rounded-xl hover:scale-105 hover:bg-green-300`}
            ref={provided.innerRef}
            {...provided.droppableProps}>
            <span>Active Tasks</span>
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
              snapshot.isDraggingOver ? "dragcomplete" : ""
            } p-5 m-4 bg-red-400 rounded-xl hover:scale-105 hover:bg-red-300`}
            ref={provided.innerRef}
            {...provided.droppableProps}>
            <span>Done Tasks</span>
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
    </div>
  );
};

export default TodoList;
