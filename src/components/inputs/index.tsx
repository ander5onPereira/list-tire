import { type ComponentProps, type ReactNode } from 'react';
import clsx from 'clsx';

interface InputProps extends ComponentProps<'input'> {
  icon?: ReactNode;
  label?: string;
}

export function Input({ icon, label, name, className, ...rest }: InputProps) {
  return (
    <div className="relative w-max min-w-[280px]">
      <div
        className={clsx(
          'flex items-center border-b-2 transition-colors duration-200 h-12 text-soft-greyzy',
          'border-soft-greyzy focus-within:border-normal-bluee focus-within:text-normal-bluee'
        )}
      >
        {icon && <span className=" ml-1 mr-2 pt-1 size-5">{icon}</span>}
        <div className="relative w-full">
          <input
            {...rest}
            id={name}
            name={name}
            placeholder=" "
            className={clsx(
              'w-full bg-transparent outline-none text-base text-soft-greyzy pl-0 pt-1',
              className
            )}
          />
          {label && (
            <label
              htmlFor={name}
              className={clsx(
                'absolute left-0 top-1 text-soft-greyzy text-base transition-all duration-200 pointer-events-none',
                'peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-soft-greyzy',
                'peer-focus:top-[-0.5rem] peer-focus:text-xs peer-focus:text-normal-bluee'
              )}
            >
              {label}
            </label>
          )}
        </div>
      </div>
    </div>
  );
}
