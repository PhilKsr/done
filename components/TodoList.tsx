import { SetStateAction } from "react";
import { Todo } from "../lib/model";
import SingleTodo from "./SingleTodo";

interface Props {
  todos: Todo[];
  onSetTodos: React.Dispatch<SetStateAction<Todo[]>>;
}

const TodoList = ({ todos, onSetTodos }: Props) => {
  return (
    <div>
      <div>
        <span>Active Tasks</span>
        {todos.map((t) => (
          <SingleTodo
            key={t.id}
            todo={t}
            todos={todos}
            onSetTodos={onSetTodos}
          />
        ))}
      </div>
      <div>
        <span>Completed Tasks</span>
        {todos.map((t) => (
          <SingleTodo
            key={t.id}
            todo={t}
            todos={todos}
            onSetTodos={onSetTodos}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
