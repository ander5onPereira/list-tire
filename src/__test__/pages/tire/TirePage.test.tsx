import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import * as useTireModule from '@hooks/useTire';
import { TirePage } from '@pages/tire';
import tireApi from '@services/api/requests/tire';

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
        content: [{ id: 1, serialNumber: 'ABC123' }],
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

    render(<TirePage />);

    fireEvent.click(screen.getByText('Simular clique na linha'));

    expect(handleCurrentDetailMock).toHaveBeenCalledWith(1);
    expect(tireApi.getItems).toHaveBeenCalledWith({
      pageSize: 10,
      pageNumber: 1,
      branchOfficesId: 215,
      companyId: 3,
    });
  });
});
