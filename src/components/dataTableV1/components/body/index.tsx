import { twMerge } from 'tailwind-merge';
import { useDataTableV1 } from '../../hook/useDataTable';
import { Loading } from '../../../loading';


export function TbBody() {
  const { data, columns, onRowClick, isLoading } = useDataTableV1();
  if (isLoading) {
    return (
      <tbody>
        <tr>
          <td className='p-4 text-center bg-white' colSpan={columns.length}>
            <Loading />
          </td>
        </tr>
      </tbody>
    );
  }
  if (data.length === 0) {
    return (
      <tbody>
        <tr>
          <td colSpan={columns.length} className='text-center p-4'>
            Nenhum resultado encontrado.
          </td>
        </tr>
      </tbody>
    );
  }
  return (
    <tbody>
      {data.map((row, index) => (
        <tr
          key={index}
          data-bg={Boolean(index % 2)}
          className={twMerge(
            'transition-colors duration-200',
            'data-[bg=true]:bg-gray-50 hover:bg-gray-100'
          )}
        >
          {columns.map((col) => {
            const value = row[`${col.key}`];
            return (
              <td
                onClick={() =>
                  col.avoidRowClick ? null : onRowClick && onRowClick(row)
                }
                key={col.uniqueId}
                className={twMerge(
                  'p-2',
                  col?.avoidRowClick
                    ? 'cursor-default'
                    : onRowClick
                    ? 'cursor-pointer'
                    : 'cursor-default'
                )}
              >
                {col.render ? col.render(value, row) : row[col.key]}
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
}
