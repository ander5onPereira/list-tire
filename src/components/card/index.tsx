import { twMerge } from 'tailwind-merge';

export function Card({ children, className, ...rest }: any) {
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
