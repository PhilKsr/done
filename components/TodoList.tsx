import { SetStateAction } from "react";
import { Todo } from "../lib/model";

interface Props {
  todos: Todo[];
  onSetTodos: React.Dispatch<SetStateAction<string>>;
}

const TodoList = ({ todos, onSetTodos }: Props) => {
  return (
    <div>
      {todos.map((t) => (
        <li>{t.todo}</li>
      ))}
    </div>
  );
};

export default TodoList;
