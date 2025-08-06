import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import { useDataTableV1 } from '../../hook/useDataTable';
import { Button } from '../../../button';
import { Input } from '@components/inputs';

export function TbFooter() {
  const { pageNumber, pageSize, setCurrentPage, setItemsPerPage, data } =
    useDataTableV1();

  const totalItems = data.length;
  const isFirstPage = pageNumber === 0;
  const isLastPage = totalItems < pageSize;

  return (
    <div className='flex justify-between items-center pt-4'>
      <div className='flex gap-2 items-center'>
        <span className=''>Total/Page</span>
        <div className='w-5'>
          <Input
            containerClassName='min-w-auto w-12'
            type='number'
            min='1'
            max='100'
            value={pageSize}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
          />
        </div>
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
