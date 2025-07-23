import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TireDisposalCard } from './TireDisposalCard';
import { useTire } from '../../../../hooks/useTire';

// Mock do hook useTire
vi.mock('../../../../hooks/useTire');
const mockedUseTire = useTire as jest.MockedFunction<typeof useTire>;

describe('TireDisposalCard', () => {
  it('não renderiza nada se tire ou tire.disposal for undefined', () => {
    mockedUseTire.mockReturnValue({
      tire: null,
    } as any);

    const { container } = render(<TireDisposalCard />);
    expect(container.firstChild).toBeNull();

    mockedUseTire.mockReturnValue({
      tire: {},
    } as any);

    const { container: container2 } = render(<TireDisposalCard />);
    expect(container2.firstChild).toBeNull();
  });

  it('renderiza corretamente motivo e imagens de descarte', () => {
    mockedUseTire.mockReturnValue({
      tire: {
        disposal: {
          disposalReasonDescription: 'Pneu com desgaste excessivo',
          disposalImagesUrl: [
            'https://example.com/image1.jpg',
            'https://example.com/image2.jpg',
          ],
        },
      },
    } as any);

    render(<TireDisposalCard />);

    // Verifica o título
    expect(
      screen.getByRole('heading', { name: /motivo do descarte/i })
    ).toBeInTheDocument();

    // Verifica o texto do motivo do descarte
    expect(
      screen.getByText(/pneu com desgaste excessivo/i)
    ).toBeInTheDocument();

    // Verifica as imagens
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute('src', 'https://example.com/image1.jpg');
    expect(images[0]).toHaveAttribute('alt', 'Imagem do descarte 1');
    expect(images[1]).toHaveAttribute('src', 'https://example.com/image2.jpg');
    expect(images[1]).toHaveAttribute('alt', 'Imagem do descarte 2');
  });
});
