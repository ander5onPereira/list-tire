import { TbBody } from './body';
import { TbFooter } from './footer';
import { TbHeader } from './header';

export function TableContainer() {
  return (
    <div className='w-full p-4 rounded-lg shadow bg-white'>
      <table className='w-full rounded-lg overflow-hidden'>
        <TbHeader />
        <TbBody />
      </table>
      <TbFooter />
    </div>
  );
}
