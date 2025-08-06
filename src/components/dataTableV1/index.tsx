import { TableContainer } from './components/TableContainer';
import { DataTableV1Provider } from './context';
import type { Props } from './context/types';

export function DataTableV1<T>({ columns, onRowClick, data ,isLoading}: Props<T>) {
  if (!columns.length) {
    return <div>No columns defined.</div>;
  }

  return (
    <DataTableV1Provider
      columns={columns}
      onRowClick={onRowClick}
      data={data}
      isLoading={isLoading}
    >
      <TableContainer />
    </DataTableV1Provider>
  );
}
