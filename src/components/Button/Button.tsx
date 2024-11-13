import React from 'react';

type Props = {
  title?: string;
  type?: 'primary' | 'danger' | 'black';
  icon?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  styles?: string;
};

export default function Button({ title, type, icon, onClick, styles }: Props) {
  const baseStyles = "px-2 py-1 rounded-md font-semibold inline-flex items-center space-x-2";
  const typeStyles = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    danger: "bg-red-500 text-white hover:bg-red-600",
    black: "bg-black text-white hover:bg-gray-800",
  };

  return (
    <button
      className={`${baseStyles} ${styles} ${typeStyles[type || 'primary']}`}
      onClick={onClick}  // Pass the onClick to the button element
    >
      {icon && <span>{icon}</span>}
      {title && <span>{title}</span>}
    </button>
  );
}
