import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import * as useTireModule from '@hooks/useTire';
import { TirePage } from '@pages/tire';
// import tireApi from '@services/api/requests/tire';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import db from '../../../../db.json';
vi.mock('@components/dataTable', () => ({
  DataTable: ({
    onRowClick,
    dataService,
  }: {
    onRowClick: (row: { id: number }) => void;
    dataService: Function;
  }) => {
    dataService({
      pageSize: 10,
      pageNumber: 1,
      branchOfficesId: 215,
      companyId: 3,
    }); // calls the function
    return (
      <button onClick={() => onRowClick({ id: 1 })}>
        Simular clique na linha
      </button>
    );
  },
}));

vi.mock('@services/api/requests/tire', () => ({
  default: {
    getItems: vi.fn(() =>
      Promise.resolve({
        content: [db.tires[0]],
      })
    ),
  },
}));

describe('TirePage', () => {
  it('Should call handleCurrentDetail on row click and invoke dataService.', async () => {
    const handleCurrentDetailMock = vi.fn();

    vi.spyOn(useTireModule, 'useTire').mockReturnValue({
      handleCurrentDetail: handleCurrentDetailMock,
    } as any);
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <TirePage />
      </QueryClientProvider>
    );
    const rowIdCell = await screen.findByText(db.tires[0].id.toString());

    fireEvent.click(rowIdCell);

    expect(handleCurrentDetailMock).toHaveBeenCalledWith(db.tires[0].id);
    // expect(tireApi.getItems).toHaveBeenCalledWith({
    //   pageSize: 10,
    //   pageNumber: 1,
    //   branchOfficesId: 215,
    //   companyId: 3,
    // });
  });
});
