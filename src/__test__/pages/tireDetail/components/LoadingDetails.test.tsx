import { LoadingDetails } from '@pages/tireDetail/components/LoadingDetails';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

vi.mock('@components/loading', () => ({
  Loading: () => <div data-testid='loading' />,
}));

describe('LoadingDetails', () => {
  it('Should render the loading component in the center.', () => {
    render(<LoadingDetails />);

    const loading = screen.getByTestId('loading');
    expect(loading).toBeInTheDocument();
  });
});
