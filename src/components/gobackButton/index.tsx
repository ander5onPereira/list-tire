import { FaChevronLeft } from 'react-icons/fa';
interface GoBlackProps {
  href?: string;
}
export function GoBackButton({ href = '/' }: GoBlackProps) {
  return (
    <div className='w-full'>
      <a
        href={href}
        className='w-fit gap-2 cursor-pointer flex text-base items-center justify-center rounded-lg font-montserrat font-bold transition-all duration-300 ease-in-out py-4 px-[26px] bg-transparent text-primary-light focus:underline hover:underline decoration-2 hover:decoration-soft-marine active:decoration-soft-bluee active:text-soft-bluee underline-offset-10 hover:text-soft-marine disabled:text-light-bluee disabled:no-underline focus:border-hidden'
      >
        <FaChevronLeft className='color-current' />
        Voltar
      </a>
    </div>
  );
}
