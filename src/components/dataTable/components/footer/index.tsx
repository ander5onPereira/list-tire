import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import { useDataTable } from '../../hook/useDataTable';
import { Button } from '../../../button';

export function TbFooter() {
  const { pageNumber, pageSize, setCurrentPage, setItemsPerPage, data } =
    useDataTable();

  const totalItems = data.length;
  const isFirstPage = pageNumber === 0;
  const isLastPage = totalItems < pageSize;

  return (
    <div className='flex justify-between items-center pt-4'>
      <div className='flex gap-1 items-center'>
        <span>Total/Page</span>
        <select
          value={pageSize}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
          className='h-10 bg-white rounded-md focus:outline-none border-2 focus:border-b-2 focus:border-x-2 focus:border-t-2 focus:border-x-violet-200 focus:border-t-violet-200 focus:border-primary-arp px-2 w-full'
        >
          {[5, 10, 20, 50].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      <div className='flex space-x-2 items-center'>
        <Button
          className='border p-2 rounded disabled:opacity-50'
          disabled={isFirstPage}
          aria-label='arrow back'
          onClick={() => setCurrentPage(pageNumber - 1)}
        >
          <MdArrowBackIosNew />
        </Button>
        <span>{pageNumber}</span>
        <Button
          className='border p-2 rounded disabled:opacity-50'
          disabled={isLastPage}
          aria-label='arrow forward'
          onClick={() => setCurrentPage(pageNumber + 1)}
        >
          <MdArrowForwardIos />
        </Button>
      </div>
    </div>
  );
}
