import { DetailItem } from '@pages/tireDetail/components/DetailItem';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

describe('DetailItem', () => {
  it('Should render the label and value properly', () => {
    render(<DetailItem label='Altura' value={55} />);

    expect(screen.getByText('Altura')).toBeInTheDocument();
    expect(screen.getByText('55')).toBeInTheDocument();
  });

  it('Should work when value is a string.', () => {
    render(<DetailItem label='Modelo' value='XPTurbo' />);

    expect(screen.getByText('Modelo')).toBeInTheDocument();
    expect(screen.getByText('XPTurbo')).toBeInTheDocument();
  });
});
