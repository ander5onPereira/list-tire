import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

interface CardProps extends ComponentProps<'div'> {}

export function Card({ children, className, ...rest }: CardProps) {
  return (
    <div
      className={twMerge(
        'pt-10 pb-20 px-10 bg-[#f6f7f8] rounded-2xl shadow-md border border-gray-100 flex flex-col',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
