import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TbBody } from '.';

// Mock do hook useDataTable
vi.mock('../../hook/useDataTable', () => ({
  useDataTable: vi.fn(),
}));
import { useDataTable } from '../../hook/useDataTable';

// Mock simples do Loading
vi.mock('../../../loading', () => ({
  Loading: () => <div data-testid="loading-spinner">Loading...</div>,
}));

describe('TbBody', () => {
  const baseColumns = [
    { key: 'id', uniqueId: 'col1' },
    { key: 'name', uniqueId: 'col2', avoidRowClick: false },
  ];

  it('renderiza Loading quando está carregando', () => {
    (useDataTable as any).mockReturnValue({
      data: [],
      columns: baseColumns,
      onRowClick: undefined,
      isLoading: true,
    });

    render(<table><TbBody /></table>);

    // O loading spinner deve estar presente
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('renderiza mensagem de nenhum resultado encontrado quando data está vazio', () => {
    (useDataTable as any).mockReturnValue({
      data: [],
      columns: baseColumns,
      onRowClick: undefined,
      isLoading: false,
    });

    render(<table><TbBody /></table>);

    expect(screen.getByText(/nenhum resultado encontrado/i)).toBeInTheDocument();
  });

  it('renderiza linhas de dados corretamente e chama onRowClick ao clicar', () => {
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

    render(<table><TbBody /></table>);

    // Verifica que as células são renderizadas
    expect(screen.getByText('Teste 1')).toBeInTheDocument();
    expect(screen.getByText('Teste 2')).toBeInTheDocument();

    // Clica na célula que permite onRowClick
    const cell = screen.getByText('Teste 1');
    fireEvent.click(cell);

    expect(onRowClick).toHaveBeenCalledWith(data[0]);
  });

  it('não chama onRowClick se avoidRowClick for true', () => {
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

    render(<table><TbBody /></table>);

    // A célula da coluna com avoidRowClick=true
    const cell = screen.getByText('1');
    fireEvent.click(cell);

    expect(onRowClick).not.toHaveBeenCalled();
  });

  it('renderiza className correto para cursor baseado em avoidRowClick e onRowClick', () => {
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

    render(<table><TbBody /></table>);

    const cells = screen.getAllByRole('cell');

    // Coluna com avoidRowClick = cursor-default
    expect(cells[0].className).toContain('cursor-default');

    // Coluna sem avoidRowClick e com onRowClick = cursor-pointer
    expect(cells[1].className).toContain('cursor-pointer');
  });

  it('usa col.render para renderizar célula se definido', () => {
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

    render(<table><TbBody /></table>);

    expect(screen.getByText('Render: Renderizado')).toBeInTheDocument();
  });

  it('renderiza linha extra de loading quando isLoading é true', () => {
    (useDataTable as any).mockReturnValue({
      data: [{ id: 1, name: 'Teste' }],
      columns: baseColumns,
      onRowClick: undefined,
      isLoading: true,
    });

    render(<table><TbBody /></table>);

    // Verifica que tem o loading extra no final
    expect(screen.getAllByTestId('loading-spinner').length).toBeGreaterThan(0);
  });
  it('renderiza loading extra no final quando isLoading é true com dados não vazios', () => {
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

  render(<table><TbBody /></table>);

  // O Loading deve aparecer no tbody, após as linhas de dados
  const loadings = screen.getAllByTestId('loading-spinner');
  expect(loadings.length).toBeGreaterThanOrEqual(1);

  // Verifica se pelo menos um Loading está dentro do último <tr>
  const lastTr = screen.getAllByRole('row').pop();
  expect(lastTr).toContainElement(loadings[loadings.length - 1]);
});
});
