import React, { SetStateAction, useRef } from "react";

interface Props {
  todo: string;
  setTodo: React.Dispatch<SetStateAction<string>>;
  onHandleAdd: (e: React.FormEvent) => void;
}

const InputField = ({ todo, setTodo, onHandleAdd }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <form
      className='flex relative items-center'
      onSubmit={(e) => {
        onHandleAdd(e);
        inputRef.current?.blur();
      }}>
      <input
        ref={inputRef}
        type='text'
        placeholder='Enter a task'
        className='w-12/12 px-4 py-8 duration-200 shadow-inner input__box'
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button type='submit' className='active:scale-50'>
        Go
      </button>
    </form>
  );
};

export default InputField;
