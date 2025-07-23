import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';


// Mock of useDataTable hook
vi.mock('@components/dataTable/hook/useDataTable', () => ({
  useDataTable: vi.fn(),
}));

import { TbBody } from '@components/dataTable/components/body';
import { useDataTable } from '@components/dataTable/hook/useDataTable';


// Simple mock of Loading
vi.mock('@components/loading', () => ({
  Loading: () => <div data-testid='loading-spinner'>Loading...</div>,
}));

describe('TbBody', () => {
  const baseColumns = [
    { key: 'id', uniqueId: 'col1' },
    { key: 'name', uniqueId: 'col2', avoidRowClick: false },
  ];

  it('renders Loading when loading', () => {
    (useDataTable as any).mockReturnValue({
      data: [],
      columns: baseColumns,
      onRowClick: undefined,
      isLoading: true,
    });

    render(
      <table>
        <TbBody />
      </table>
    );

    // should have the loading spinner present
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('renders a "no results found" message when data is empty', () => {
    (useDataTable as any).mockReturnValue({
      data: [],
      columns: baseColumns,
      onRowClick: undefined,
      isLoading: false,
    });

    render(
      <table>
        <TbBody />
      </table>
    );

    expect(
      screen.getByText(/nenhum resultado encontrado/i)
    ).toBeInTheDocument();
  });

  it('renders data rows correctly and calls onRowClick when clicked', () => {
    const onRowClick = vi.fn();
    const data = [
      { id: 1, name: 'Teste 1' },
      { id: 2, name: 'Teste 2' },
    ];

    (useDataTable as any).mockReturnValue({
      data,
      columns: baseColumns,
      onRowClick,
      isLoading: false,
    });

    render(
      <table>
        <TbBody />
      </table>
    );

    // verifies that the cells are rendered
    expect(screen.getByText('Teste 1')).toBeInTheDocument();
    expect(screen.getByText('Teste 2')).toBeInTheDocument();

    // clicks on the cell to trigger onRowClick
    const cell = screen.getByText('Teste 1');
    fireEvent.click(cell);

    expect(onRowClick).toHaveBeenCalledWith(data[0]);
  });

  it('does not call onRowClick if avoidRowClick is true', () => {
    const onRowClick = vi.fn();
    const columnsWithAvoid = [
      { key: 'id', uniqueId: 'col1', avoidRowClick: true },
      { key: 'name', uniqueId: 'col2' },
    ];
    const data = [{ id: 1, name: 'Teste 1' }];

    (useDataTable as any).mockReturnValue({
      data,
      columns: columnsWithAvoid,
      onRowClick,
      isLoading: false,
    });

    render(
      <table>
        <TbBody />
      </table>
    );

    // the cell in the column with avoidRowClick=true
    const cell = screen.getByText('1');
    fireEvent.click(cell);

    expect(onRowClick).not.toHaveBeenCalled();
  });

  it('renders the correct cursor className based on avoidRowClick and onRowClick', () => {
    const onRowClick = vi.fn();
    const columns = [
      { key: 'id', uniqueId: 'col1', avoidRowClick: true },
      { key: 'name', uniqueId: 'col2' },
    ];
    const data = [{ id: 1, name: 'Teste Cursor' }];

    (useDataTable as any).mockReturnValue({
      data,
      columns,
      onRowClick,
      isLoading: false,
    });

    render(
      <table>
        <TbBody />
      </table>
    );

    const cells = screen.getAllByRole('cell');

    // Column with avoidRowClick has cursor-default
    expect(cells[0].className).toContain('cursor-default');

    // Column without avoidRowClick and with onRowClick has cursor-pointer
    expect(cells[1].className).toContain('cursor-pointer');
  });

  it('uses col.render to render the cell if defined', () => {
    (useDataTable as any).mockReturnValue({
      data: [{ id: 1, name: 'Renderizado' }],
      columns: [
        {
          key: 'name',
          uniqueId: 'col1',
          render: (value: any) => <span>Render: {value}</span>,
        },
      ],
      onRowClick: undefined,
      isLoading: false,
    });

    render(
      <table>
        <TbBody />
      </table>
    );

    expect(screen.getByText('Render: Renderizado')).toBeInTheDocument();
  });

  it('renders an extra loading row when isLoading is true', () => {
    (useDataTable as any).mockReturnValue({
      data: [{ id: 1, name: 'Teste' }],
      columns: baseColumns,
      onRowClick: undefined,
      isLoading: true,
    });

    render(
      <table>
        <TbBody />
      </table>
    );

    // verifies there is an extra loading row at the end
    expect(screen.getAllByTestId('loading-spinner').length).toBeGreaterThan(0);
  });
  it('renders an extra loading row at the end when isLoading is true with non-empty data', () => {
    const data = [
      { id: 1, name: 'Teste 1' },
      { id: 2, name: 'Teste 2' },
    ];

    (useDataTable as any).mockReturnValue({
      data,
      columns: baseColumns,
      onRowClick: undefined,
      isLoading: true,
    });

    render(
      <table>
        <TbBody />
      </table>
    );

    // renders Loading in the tbody after the data rows
    const loadings = screen.getAllByTestId('loading-spinner');
    expect(loadings.length).toBeGreaterThanOrEqual(1);

    // checks if at least one Loading is inside the last <tr>
    const lastTr = screen.getAllByRole('row').pop();
    expect(lastTr).toContainElement(loadings[loadings.length - 1]);
  });
});
