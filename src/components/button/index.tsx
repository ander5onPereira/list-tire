import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends ComponentProps<'button'> {
  mode?: 'base' | 'outline' | 'text';
}
const modeClasses = {
  base: 'bg-primary-light hover:bg-soft-marine active:bg-soft-bluee disabled:bg-light-bluee text-white',
  outline:
    'bg-transparent border-3 border-normal-bluee hover:border-soft-marine hover:text-soft-marine active:text-soft-bluee active:border-soft-bluee focus:border-soft-bluee disabled:border-light-bluee disabled:text-light-bluee text-soft-bluee disabled:bg-transparent  ',
  text: 'bg-transparent text-primary-light focus:underline hover:underline decoration-2 hover:decoration-soft-marine active:decoration-soft-bluee active:text-soft-bluee underline-offset-10 hover:text-soft-marine disabled:text-light-bluee disabled:no-underline focus:border-hidden ',
} as const;
export function Button({
  children,
  className,
  mode = 'base',
  ...rest
}: ButtonProps) {
  return (
    <button
      className={twMerge(
        'cursor-pointer disabled:cursor-auto flex text-base items-center  justify-center rounded-lg  font-montserrat font-bold  transition-all duration-300 ease-in-out py-4 px-[26px]',
        modeClasses[mode],
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
