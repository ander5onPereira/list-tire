import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';



vi.mock('../../hook/useDataTable', () => ({
  useDataTable: vi.fn(),
}));

import { useDataTable } from '../../hook/useDataTable';
import { TbFooter } from '.';

describe('TbFooter', () => {
  const setCurrentPage = vi.fn();
  const setItemsPerPage = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renderiza controles com estado correto e chama funções ao interagir', () => {
    (useDataTable as any).mockReturnValue({
      pageNumber: 1,
      pageSize: 10,
      setCurrentPage,
      setItemsPerPage,
      data: new Array(25).fill({}),
    });

    render(<TbFooter />);

    // Verifica se o select tem o valor correto
    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('10');

    // Verifica se o texto da página está correto
    expect(screen.getByText('1')).toBeInTheDocument();

    // Botões devem estar habilitados (não é primeira nem última página)
    
    const prevButton = screen.getByRole('button', { name: /arrow back/i });
    const nextButton = screen.getByRole('button', { name: /arrow forward/i });
    expect(prevButton).not.toBeDisabled();
    expect(nextButton).not.toBeDisabled();

    // Muda o select para 20
    fireEvent.change(select, { target: { value: '20' } });
    expect(setItemsPerPage).toHaveBeenCalledWith(20);

    // Clica no botão de página anterior
    fireEvent.click(prevButton);
    expect(setCurrentPage).toHaveBeenCalledWith(0);

    // Clica no botão de página próxima
    fireEvent.click(nextButton);
    expect(setCurrentPage).toHaveBeenCalledWith(2);
  });

  it('botão anterior está desabilitado na primeira página', () => {
    (useDataTable as any).mockReturnValue({
      pageNumber: 0,
      pageSize: 10,
      setCurrentPage,
      setItemsPerPage,
      data: new Array(25).fill({}),
    });

    render(<TbFooter />);

    const prevButton = screen.getByRole('button', { name: /arrow back/i });
    expect(prevButton).toBeDisabled();
  });

  it('botão próximo está desabilitado quando não há mais itens', () => {
    (useDataTable as any).mockReturnValue({
      pageNumber: 1,
      pageSize: 10,
      setCurrentPage,
      setItemsPerPage,
      data: new Array(5).fill({}), // menos que pageSize
    });

    render(<TbFooter />);

    const nextButton = screen.getByRole('button', { name: /arrow forward/i });
    expect(nextButton).toBeDisabled();
  });
});
