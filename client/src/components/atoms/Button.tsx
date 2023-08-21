import { HTMLProps } from 'react';

interface ButtonProps extends HTMLProps<HTMLButtonElement> {
  onClick?: () => void;
  children: React.ReactNode;
  type?: 'button' | 'submit';
}

function Button({ onClick, children, type }: ButtonProps) {
  return (
    <button
      type={type}
      className='w-full p-2 buttonText bg-black-common text-white-common rounded-half border-[transparent] border-[2px] hover:border-black-common hover:bg-white-common hover:text-black-common active:bg-white-hover duration-300 flex items-center justify-center h-[3.5625rem]'
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
