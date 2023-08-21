import { HTMLProps, forwardRef, useState } from 'react';
import { EyeIcon } from '../icons/EyeIcon';

interface InputProps extends HTMLProps<HTMLInputElement> {
  label: string;
  isPassword?: boolean;
}
// eslint-disable-next-line react/display-name
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, isPassword = false, ...rest }, ref) => {
    const [selectedType, setSelectedType] = useState(
      isPassword ? 'password' : 'text'
    );

    function handleToggleVisibility() {
      setSelectedType((prev) => {
        return prev === 'password' ? 'text' : 'password';
      });
    }

    return (
      <div className='w-full'>
        <label className='heading block mb-[1.25rem]' htmlFor=''>
          {label}
        </label>
        <div className='w-full h-[3.75rem]   relative'>
          <input
            {...rest}
            className='w-full h-full p-5 bg-gray-input rounded-common'
            ref={ref}
            type={selectedType}
          />
          {isPassword && (
            <div
              onClick={handleToggleVisibility}
              className='text-gray-placeholder hover:text-gray-common absolute right-5 top-[50%] translate-y-[-50%] cursor-pointer'
            >
              <EyeIcon isHidden={selectedType === 'password'} />
            </div>
          )}
        </div>
      </div>
    );
  }
);
