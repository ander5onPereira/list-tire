import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { useTire } from '@hooks/useTire';
import { TireMakeModelCard } from '@pages/tireDetail/components/TireCards/TireMakeModelCard';

// mock do hook
vi.mock('@hooks/useTire');

const mockedUseTire = useTire as unknown as jest.MockedFunction<typeof useTire>;

describe('TireMakeModelCard', () => {
  it('não renderiza nada se tire ou tire.disposal for undefined', () => {
    mockedUseTire.mockReturnValue({ tire: undefined } as any);

    const { container } = render(<TireMakeModelCard />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renderiza marca, modelo, sulcos e profundidade corretamente', () => {
    mockedUseTire.mockReturnValue({
      tire: {
        disposal: {
          disposalReasonId: 1,
          disposalImagesUrl: [],
          disposalReasonDescription: 'qualquer',
        }, // necessary to pass the if
        make: { id: 1, name: 'Pirelli' },
        model: {
          id: 1,
          name: 'Cinturato P1',
          groovesQuantity: 4,
          treadDepth: 7.5,
        },
      },
    } as any);

    render(<TireMakeModelCard />);

    expect(screen.getByText('Marca & Modelo')).toBeInTheDocument();
    expect(screen.getByText(/Marca:/)).toHaveTextContent('Marca: Pirelli');
    expect(screen.getByText(/Modelo:/)).toHaveTextContent(
      'Modelo: Cinturato P1'
    );
    expect(screen.getByText(/Sulcos:/)).toHaveTextContent('Sulcos: 4');
    expect(screen.getByText(/Profundidade:/)).toHaveTextContent(
      'Profundidade: 7.5 mm'
    );
  });

  it('renderiza com valores ausentes como texto vazio ou undefined', () => {
    mockedUseTire.mockReturnValue({
      tire: {
        disposal: { disposalReasonDescription: 'ok' },
        make: null,
        model: {},
      },
    } as any);

    render(<TireMakeModelCard />);

    expect(screen.getByText(/Marca:/)).toHaveTextContent('Marca:');
    expect(screen.getByText(/Modelo:/)).toHaveTextContent('Modelo:');
    expect(screen.getByText(/Sulcos:/)).toHaveTextContent('Sulcos:');
    expect(screen.getByText(/Profundidade:/)).toHaveTextContent(
      'Profundidade: mm'
    );
  });
});
