import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { LoadingDetails } from './LoadingDetails';

vi.mock('../../../components/loading', () => ({
  Loading: () => <div data-testid='loading' />,
}));

describe('LoadingDetails', () => {
  it('renderiza o componente de loading centralizado', () => {
    render(<LoadingDetails />);

    const loading = screen.getByTestId('loading');
    expect(loading).toBeInTheDocument();
  });
});
