import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { DetailItem } from './DetailItem';

describe('DetailItem', () => {
  it('renderiza o label e o valor corretamente', () => {
    render(<DetailItem label="Altura" value={55} />);

    expect(screen.getByText('Altura')).toBeInTheDocument();
    expect(screen.getByText('55')).toBeInTheDocument();
  });

  it('funciona com valor string', () => {
    render(<DetailItem label="Modelo" value="XPTurbo" />);

    expect(screen.getByText('Modelo')).toBeInTheDocument();
    expect(screen.getByText('XPTurbo')).toBeInTheDocument();
  });
});
