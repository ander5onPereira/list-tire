import { TbFooter } from '@components/dataTable/components/footer';
import { useDataTable } from '@components/dataTable/hook/useDataTable';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

vi.mock('@components/dataTable/hook/useDataTable', () => ({
  useDataTable: vi.fn(),
}));

describe('TbFooter', () => {
  const setCurrentPage = vi.fn();
  const setItemsPerPage = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders controls with correct state and calls functions on interaction', () => {
    (useDataTable as any).mockReturnValue({
      pageNumber: 1,
      pageSize: 10,
      setCurrentPage,
      setItemsPerPage,
      data: new Array(25).fill({}),
    });

    render(<TbFooter />);

    // checks if the input has the correct value
    const input = screen.getByRole('spinbutton');
    expect(input).toHaveValue(10);

    // checks if the page text is correct
    expect(screen.getByText('1')).toBeInTheDocument();

    // buttons should be enabled (not first or last page)

    const prevButton = screen.getByRole('button', { name: /arrow back/i });
    const nextButton = screen.getByRole('button', { name: /arrow forward/i });
    expect(prevButton).not.toBeDisabled();
    expect(nextButton).not.toBeDisabled();

    // change the input to 20
    fireEvent.change(input, { target: { value: 20 } });
    expect(setItemsPerPage).toHaveBeenCalledWith(20);

    // clicks the previous page button
    fireEvent.click(prevButton);
    expect(setCurrentPage).toHaveBeenCalledWith(0);

    // clicks the next page button
    fireEvent.click(nextButton);
    expect(setCurrentPage).toHaveBeenCalledWith(2);
  });

  it('disables the previous button on the first page', () => {
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

  it('disables the next button when there are no more items', () => {
    (useDataTable as any).mockReturnValue({
      pageNumber: 1,
      pageSize: 10,
      setCurrentPage,
      setItemsPerPage,
      data: new Array(5).fill({}), // less than pageSize
    });

    render(<TbFooter />);

    const nextButton = screen.getByRole('button', { name: /arrow forward/i });
    expect(nextButton).toBeDisabled();
  });
});
