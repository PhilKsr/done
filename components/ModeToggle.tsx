import { useContext } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { ThemeContext } from "../themes/mode";

const ModeToggle = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div className='transition duration-500 ease-in-out rounded-full p-2'>
      {theme === "dark" ? (
        <FaSun
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className='text-2xl cursor-pointer text-slate-500 dark:text-slate-400'
        />
      ) : (
        <FaMoon
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className='text-2xl cursor-pointer text-slate-500 dark:text-slate-400'
        />
      )}
    </div>
  );
};

export default ModeToggle;
