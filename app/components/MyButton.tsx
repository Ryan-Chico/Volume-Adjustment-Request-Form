"use client";

type MyButtonProps = {
  text: string;
  number?: number;
  onClick?: () => void;
  children?: React.ReactNode;
};

export default function MyButton({
  text,
  number,
  onClick,
  children,
}: MyButtonProps) {
  return (
    <button
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      onClick={onClick}
    >
      {text} {number} {children}
    </button>
  );
}