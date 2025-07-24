import { render, screen } from '@testing-library/react';
import { GoBackButton } from '@components/gobackButton';
import { describe, it, expect } from 'vitest';

describe('GoBackButton', () => {
  it('renders with correct href and icon class', () => {
    const { container } = render(<GoBackButton href='/tire' />);
    
    const link = screen.getByRole('link', { name: /voltar/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/tire');

    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
    expect(icon?.getAttribute('class')).toContain('color-current');
  });
});
