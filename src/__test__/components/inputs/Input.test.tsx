import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { FiSearch } from 'react-icons/fi';
import { Input } from '@components/inputs';

describe('Input', () => {
  it('renders input with label', () => {
    render(<Input name="email" label="E-mail" />);
    const input = screen.getByLabelText('E-mail');
    expect(input).toBeInTheDocument();
  });

  it('renders input with icon', () => {
    render(<Input name="search" label="Buscar" icon={<FiSearch aria-label="search-icon" />} />);
    const icon = screen.getByLabelText('search-icon');
    expect(icon).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Input name="nome" label="Nome" className="text-red-500" />);
    const input = screen.getByLabelText('Nome');
    expect(input).toHaveClass('text-red-500');
  });

  it('renders input without label and icon', () => {
    render(<Input name="sem-nada" />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });
});
