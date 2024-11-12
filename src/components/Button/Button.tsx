import React from 'react';

type Props = {
  title?: string;
  type?: 'primary' | 'danger' | 'black';
  icon?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export default function Button({ title, type, icon, onClick }: Props) {
  const baseStyles = "px-4 py-2 rounded-lg font-semibold inline-flex items-center space-x-2";
  const typeStyles = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    danger: "bg-red-500 text-white hover:bg-red-600",
    black: "bg-black text-white hover:bg-gray-800",
  };

  return (
    <button
      className={`${baseStyles} ${typeStyles[type || 'primary']}`}
      onClick={onClick}  // Pass the onClick to the button element
    >
      {icon && <span>{icon}</span>}
      {title && <span>{title}</span>}
    </button>
  );
}
