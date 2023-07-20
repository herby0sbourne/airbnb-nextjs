'use client';

interface MenuItemProps {
  handleClick: () => void;
  label: string;
}
const MenuItem = ({ handleClick, label }: MenuItemProps) => {
  return (
    <div
      className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
      onClick={handleClick}
    >
      {label}
    </div>
  );
};
export default MenuItem;
