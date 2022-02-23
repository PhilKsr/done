const Background = ({ children }: any) => {
  return (
    <div className='bg-white dark:bg-slate-700 transition-all'>
      <div className='absolute right-0 top-0 mr-4 mt-4 md:mr-6 md:mt-6'></div>
      {children}
    </div>
  );
};

export default Background;
