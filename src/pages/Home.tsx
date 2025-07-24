import { MdOutlineMail } from 'react-icons/md';
import { Button } from '../components/button';
import { Input } from '../components/inputs';
import { FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export function HomePage() {
  const navegate = useNavigate();
  return (
    <div className='flex w-screen h-screen items-center justify-center flex-col gap-8'>
      <div className='flex flex-col gap-2 items-center'>
        <h1>Bem vindo!!</h1>
        <h3>Teste Prático | Web - React</h3>
      </div>
      <Button type='button' onClick={() => navegate(-1)} className='gap-2'>
        <FaArrowRight className='color-current' />
        Entrar
      </Button>
    </div>
  );
}
