import { TbBody } from './body';
import { Filter } from './filter';
import { TbFooter } from './footer';
import { TbHeader } from './header';

export function TableContainer() {
  return (
    <div className='w-full p-4 rounded-lg shadow bg-white'>
      <Filter />
      <table className='w-full rounded-lg overflow-hidden'>
        <TbHeader />
        <TbBody />
      </table>
      <TbFooter />
    </div>
  );
}
