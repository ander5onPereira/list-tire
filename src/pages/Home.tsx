import { MdOutlineMail } from 'react-icons/md';
import { Button } from '../components/button';
import { Input } from '../components/inputs';

export function HomePage() {
  return (
    <div className='flex gap-1.5 flex-col'>
      HomePage
      <div>
        <Button>ENTRAR EM CONTATO</Button>
      </div>
      <div>
        <Button mode='outline'>ENTRAR EM CONTATO</Button>
      </div>
      <div>
        <Button mode='text'>ENTRAR EM CONTATO</Button>
      </div>
      <Input
        icon={<MdOutlineMail className='color-current size-5' />}
        label='Email'
        id='email'
        name='email'
        placeholder='Email'
      />
    </div>
  );
}
