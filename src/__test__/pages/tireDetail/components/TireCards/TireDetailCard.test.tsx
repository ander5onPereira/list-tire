import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { useTire } from '@hooks/useTire';
import { TireDetailCard } from '@pages/tireDetail/components/TireCards/TireDetailCard';

vi.mock('@hooks/useTire');
const mockedUseTire = useTire as jest.MockedFunction<typeof useTire>;

describe('TireDetailCard', () => {
  it('não renderiza nada se tire ou tire.id for undefined', () => {
    mockedUseTire.mockReturnValue({ tire: undefined } as any);
    const { container } = render(<TireDetailCard />);
    expect(container.firstChild).toBeNull();
  });

  it('renderiza todos os detalhes do pneu corretamente', () => {
    mockedUseTire.mockReturnValue({
      tire: {
        id: 123,
        serialNumber: 'SN123',
        companyGroupName: 'Prolog',
        currentLifeCycle: 2,
        timesRetreaded: 1,
        maxRetreadsExpected: 3,
        maxLifeCycles: 5,
        recommendedPressure: 80,
        currentPressure: 75,
        branchOfficeName: 'Filial X',
        dot: 'DOT2025',
        purchaseCost: 500.0,
        status: 'ANALYSIS',
        createdAt: '2023-09-10T10:00:00.000Z',
      },
    } as any);

    render(<TireDetailCard />);

    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('123')).toBeInTheDocument();

    expect(screen.getByText('Número de Série')).toBeInTheDocument();
    expect(screen.getByText('SN123')).toBeInTheDocument();

    expect(screen.getByText('Empresa')).toBeInTheDocument();
    expect(screen.getByText('Prolog')).toBeInTheDocument();

    expect(screen.getByText('Filial')).toBeInTheDocument();
    expect(screen.getByText('Filial X')).toBeInTheDocument();

    expect(screen.getByText('Ciclo Atual')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();

    expect(screen.getByText('Reformas Feitas')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();

    expect(screen.getByText('Reformas Máximas')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();

    expect(screen.getByText('Ciclos Máximos')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();

    expect(screen.getByText('Pressão Recomendada')).toBeInTheDocument();
    expect(screen.getByText('80 PSI')).toBeInTheDocument();

    expect(screen.getByText('Pressão Atual')).toBeInTheDocument();
    expect(screen.getByText('75 PSI')).toBeInTheDocument();

    expect(screen.getByText('DOT')).toBeInTheDocument();
    expect(screen.getByText('DOT2025')).toBeInTheDocument();

    expect(screen.getByText('Custo')).toBeInTheDocument();
    expect(screen.getByText('R$ 500')).toBeInTheDocument();

    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('ANALYSIS')).toBeInTheDocument();

    expect(screen.getByText('Criado em')).toBeInTheDocument();
    expect(screen.getByText('10/09/2023')).toBeInTheDocument(); // depende do locale
  });
});
