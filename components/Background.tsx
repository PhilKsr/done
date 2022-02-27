const Background = ({ children }: any) => {
  return (
    <div className='bg-white dark:bg-slate-700 transition-all h-screen'>
      <div className='absolute right-0 top-0'></div>
      {children}
    </div>
  );
};

export default Background;
