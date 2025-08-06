import { TbBody } from './body';
import { Filter } from './filter';
import { TbFooter } from './footer';
import { TbHeader } from './header';

export function TableContainer() {
  return (
    <div className='w-full p-4 rounded-lg shadow bg-white'>
      <Filter />
      {/* <table className='w-full rounded-lg h-[50dvh]'>
        <TbHeader />
        <TbBody />
      </table> */}
      <div className='rounded-lg overflow-hidden'>
        <table data-testid="header-table" className='w-full'>
          <TbHeader />
        </table>

        <div className='max-h-[70vh] overflow-y-auto w-full'>
          <table data-testid="body-table" className='w-full'>
            <TbBody />
          </table>
        </div>
      </div>
      <TbFooter />
    </div>
  );
}
