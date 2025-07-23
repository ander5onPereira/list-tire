import { render, screen } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';

vi.mock('./header', () => ({
  TbHeader: () => <thead data-testid="tb-header">Mock Header</thead>,
}));
vi.mock('./body', () => ({
  TbBody: () => <tbody data-testid="tb-body">Mock Body</tbody>,
}));
vi.mock('./footer', () => ({
  TbFooter: () => <div data-testid="tb-footer">Mock Footer</div>,
}));

import { TableContainer } from './TableContainer';

describe('TableContainer', () => {
  it('deve renderizar a estrutura da tabela com header, body e footer', () => {
    render(<TableContainer />);

    expect(screen.getByTestId('tb-header')).toBeInTheDocument();
    expect(screen.getByTestId('tb-body')).toBeInTheDocument();
    expect(screen.getByTestId('tb-footer')).toBeInTheDocument();

    // Também pode verificar a estrutura HTML, ex:
    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();

    // Opcionalmente conferir classes (tailwind)
    expect(table).toHaveClass('w-full rounded-lg overflow-hidden');
  });
});
