import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import * as useDataTableModule from '@components/dataTable/hook/useDataTable';
import { Filter } from '@components/dataTable/components/filter';

describe('Filter component', () => {
  it('should render input with correct props', () => {
    vi.spyOn(useDataTableModule, 'useDataTable').mockReturnValue({
      filters: '',
      updateFilters: vi.fn(),
    } as any);

    render(<Filter />);

    const input = screen.getByRole('textbox', { name: 'Filter' });

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', ' ');
  });

  it('should render input with correct label', () => {
    render(<Filter />);
    const input = screen.getByLabelText('Filter'); // usa <label>
    expect(input).toBeInTheDocument();
  });

  it('should call updateFilters when input changes', () => {
    const mockUpdateFilters = vi.fn();

    vi.spyOn(useDataTableModule, 'useDataTable').mockReturnValue({
      filters: '',
      updateFilters: mockUpdateFilters,
    } as any);

    render(<Filter />);

    const input = screen.getByLabelText(/filter/i);
    fireEvent.change(input, { target: { value: 'example' } });

    expect(mockUpdateFilters).toHaveBeenCalledWith('example');
  });
});
