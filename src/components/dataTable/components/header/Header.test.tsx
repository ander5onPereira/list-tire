import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TbHeader } from './';
import { useDataTable } from '../../hook/useDataTable';

vi.mock('../../hook/useDataTable');

describe('TbHeader', () => {
  it('renderiza corretamente as colunas', () => {
    (useDataTable as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      columns: [
        { uniqueId: '1', label: 'Coluna 1', className: 'class-1', key: 'col1' },
        { uniqueId: '2', label: 'Coluna 2', className: 'class-2', key: 'col2' },
      ],
    });

    render(<table><TbHeader /></table>);

    const thElements = screen.getAllByRole('columnheader');
    expect(thElements).toHaveLength(2);

    expect(screen.getByText('Coluna 1')).toBeInTheDocument();
    expect(screen.getByText('Coluna 2')).toBeInTheDocument();

    expect(thElements[0]).toHaveClass('class-1');
    expect(thElements[1]).toHaveClass('class-2');
  });
});
