import { twMerge } from 'tailwind-merge';
import { useDataTableV1 } from '../../hook/useDataTable';

export function TbHeader() {
  const { columns } = useDataTableV1();
  return (
    <thead>
      <tr className='bg-header-table rounded-t-md'>
        {columns.map((col) => (
          <th
            key={col.uniqueId}
            className={twMerge('pt-2 pb-2 px-0.5', col.className)}
          >
            <div className='flex flex-col'>
              <p className='flex items-center text-base pl-1 gap-1 w-full text-left cursor-pointer font-semibold'>
                {col.label}
              </p>
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
}
