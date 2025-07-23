import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useContext } from 'react';
import DataTableContext, {
  DataTableProvider,
} from '@components/dataTable/context';
import type { dataTableColumnType } from '@components/dataTable/types';

vi.mock('@components/dataTable/hook/useDataTableQuery', () => ({
  useDataTableQuery: () => ({
    data: [{ id: 1, name: 'Test Item' }],
    isLoading: false,
  }),
}));

function ConsumerTest() {
  const context = useContext(DataTableContext);

  return (
    <div>
      <p>Loading: {context.isLoading ? 'Yes' : 'No'}</p>
      <p>Data length: {context.data.length}</p>
      <p>Page size: {context.pageSize}</p>
      <button onClick={() => context.updateFilters('value')}>Set Filter</button>
      <p>Filter value: {context.filters || 'none'}</p>
    </div>
  );
}

describe('DataTableProvider', () => {
  it('should provide context with data and functions', async () => {
    const columns: dataTableColumnType[] = [
      { uniqueId: '1', key: 'id', label: 'ID' },
      { uniqueId: '2', key: 'name', label: 'Name' },
    ];

    const dataServiceMock = vi.fn().mockResolvedValue([]);

    render(
      <DataTableProvider columns={columns} dataService={dataServiceMock}>
        <ConsumerTest />
      </DataTableProvider>
    );

    expect(screen.getByText('Loading: No')).toBeInTheDocument();
    expect(screen.getByText('Data length: 1')).toBeInTheDocument();
    expect(screen.getByText('Page size: 10')).toBeInTheDocument();

    screen.getByText('Set Filter').click();

    await waitFor(() => {
      expect(screen.getByText('Filter value: value')).toBeInTheDocument();
    });
  });
});
