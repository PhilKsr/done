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
      className='flex relative items-center xl:w-2/5'
      onSubmit={(e) => {
        onHandleAdd(e);
        inputRef.current?.blur();
      }}>
      <input
        ref={inputRef}
        type='text'
        placeholder='Enter a task'
        className='w-full px-6 py-3 m-4 duration-200 shadow-inner shadow-slate-400 rounded-xl focus:outline-none'
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button
        type='submit'
        className='p-3 active:scale-90 absolute right-0 mr-5'>
        Go
      </button>
    </form>
  );
};

export default InputField;
