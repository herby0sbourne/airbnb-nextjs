"use client";

interface GridProps {
  children: React.ReactNode;
  extClass?: string;
}

const Grid = ({ children, extClass }: GridProps) => {
  return (
    <div
      className={`${extClass} grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8`}>
      {children}
    </div>
  );
};
export default Grid;
