import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Input } from './';
import { FiSearch } from 'react-icons/fi';

describe('Input', () => {
  it('renderiza input com label', () => {
    render(<Input name="email" label="E-mail" />);
    const input = screen.getByLabelText('E-mail');
    expect(input).toBeInTheDocument();
  });

  it('renderiza input com ícone', () => {
    render(<Input name="search" label="Buscar" icon={<FiSearch aria-label="search-icon" />} />);
    const icon = screen.getByLabelText('search-icon');
    expect(icon).toBeInTheDocument();
  });

  it('aplica className customizado', () => {
    render(<Input name="nome" label="Nome" className="text-red-500" />);
    const input = screen.getByLabelText('Nome');
    expect(input).toHaveClass('text-red-500');
  });

  it('renderiza input sem label e ícone', () => {
    render(<Input name="sem-nada" />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });
});
