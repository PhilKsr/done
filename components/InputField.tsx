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
      className='flex relative items-center w-full md:w-3/5 xl:w-2/5 mt-8 xl:mt-40'
      onSubmit={(e) => {
        onHandleAdd(e);
        inputRef.current?.blur();
      }}>
      <input
        ref={inputRef}
        type='text'
        placeholder='Get your things done'
        className='w-full px-6 py-3 m-4 duration-200 shadow-inner shadow-slate-400 rounded-xl focus:outline-none'
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button
        type='submit'
        className='py-2 px-3 active:scale-90 absolute right-0 mr-5 bg-slate-400 dark:bg-slate-700 rounded-full'>
        Go
      </button>
    </form>
  );
};

export default InputField;
