import { TableContainer } from './components/TableContainer';
import { DataTableProvider } from './context';
import type { Props } from './context/types';

export function DataTable<T>({ columns, onRowClick, dataService }: Props<T>) {
  if (!columns.length) {
    return <div>No columns defined.</div>;
  }

  if (typeof dataService !== 'function') {
    return <div>Invalid data service provided.</div>;
  }
  return (
    <DataTableProvider
      columns={columns}
      onRowClick={onRowClick}
      dataService={dataService}
    >
      <TableContainer />
    </DataTableProvider>
  );
}
