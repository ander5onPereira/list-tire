import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TireSizeCard } from './TireSizeCard';
import { useTire } from '../../../../hooks/useTire';

vi.mock('../../../../hooks/useTire');

const mockedUseTire = useTire as unknown as jest.MockedFunction<typeof useTire>;

describe('TireSizeCard', () => {
  it('não renderiza nada se tire.disposal for falsy', () => {
    mockedUseTire.mockReturnValue({
      tire: null,
    } as any);

    const { container } = render(<TireSizeCard />);
    expect(container.firstChild).toBeNull();
  });

  it('renderiza corretamente as dimensões do pneu', () => {
    mockedUseTire.mockReturnValue({
      tire: {
        disposal: true,
        tireSize: {
          height: 55,
          width: 205,
          rim: 16,
        },
      },
    } as any);

    render(<TireSizeCard />);

    expect(screen.getByText('Dimensões')).toBeInTheDocument();
    expect(screen.getByText(/Altura: 55/)).toBeInTheDocument();
    expect(screen.getByText(/Largura: 205/)).toBeInTheDocument();
    expect(screen.getByText(/Aro: 16/)).toBeInTheDocument();
  });
});
