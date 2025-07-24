import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { useTire } from '@hooks/useTire';
import { TireDetailPage } from '@pages/tireDetail';

vi.mock('@hooks/useTire');
const mockedUseTire = useTire as jest.MockedFunction<typeof useTire>;

describe('TireDetailPage', () => {
  it('Should render LoadingDetails during loading state.', () => {
    mockedUseTire.mockReturnValue({
      isLoading: true,
      tire: null,
      handleCurrentDetail: vi.fn(),
    } as any);

    render(
      <MemoryRouter initialEntries={['/pneu/1']}>
        <Routes>
          <Route path='/pneu/:id' element={<TireDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('status')).toBeInTheDocument(); // ou ajuste conforme seu LoadingDetails
  });

  it('Should render TireNotDetailCard if tire ID is missing', () => {
    mockedUseTire.mockReturnValue({
      isLoading: false,
      tire: {},
      handleCurrentDetail: vi.fn(),
    } as any);

    render(
      <MemoryRouter initialEntries={['/pneu/2']}>
        <Routes>
          <Route path='/pneu/:id' element={<TireDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(
      screen.getByText(/O pneu pesquisado não está disponivel no momento/i)
    ).toBeInTheDocument(); // ajuste se necessário
  });

  it('Should render all cards if the data is valid.', async () => {
    mockedUseTire.mockReturnValue({
      isLoading: false,
      handleCurrentDetail: vi.fn(),
      tire: {
        id: 123,
        serialNumber: 'SN001',
        companyGroupId: 1,
        companyGroupName: 'Prolog',
        branchOfficeId: 2,
        branchOfficeName: 'Unidade Teste',
        currentLifeCycle: 1,
        timesRetreaded: 0,
        maxRetreadsExpected: 2,
        maxLifeCycles: 4,
        recommendedPressure: 90,
        currentPressure: 85,
        dot: 'DOTXYZ',
        purchaseCost: 1000,
        newTire: true,
        status: 'INVENTORY',
        createdAt: '2025-01-01T12:00:00Z',

        tireSize: {
          id: 1,
          width: 245,
          height: 80,
          rim: 16,
        },
        make: {
          id: 1,
          name: 'Goodyear',
        },
        model: {
          id: 2,
          name: 'Eagle',
          groovesQuantity: 4,
          treadDepth: 8,
        },

        registrationImages: [],

        disposal: {
          disposalReasonId: 1,
          disposalReasonDescription: 'Desgaste natural',
          disposalImagesUrl: [],
        },
      },
    } as any);

    render(
      <MemoryRouter initialEntries={['/pneu/3']}>
        <Routes>
          <Route path='/pneu/:id' element={<TireDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      // Confirm key details
      expect(screen.getByText('Detalhes do Pneu')).toBeInTheDocument();
      expect(screen.getByText(/SN001/)).toBeInTheDocument();
      expect(screen.getByText(/Prolog/)).toBeInTheDocument();
      expect(screen.getByText(/Unidade Teste/)).toBeInTheDocument();

      // Confirm Make and Model
      expect(screen.getByText(/Goodyear/)).toBeInTheDocument();
      expect(screen.getByText(/Eagle/)).toBeInTheDocument();

      // Confirm size
      expect(screen.getByText(/245/)).toBeInTheDocument();
      expect(screen.getByText(/80/)).toBeInTheDocument();
      expect(screen.getByText(/16/)).toBeInTheDocument();

      // Confirms disposal
      expect(screen.getByText(/Desgaste natural/)).toBeInTheDocument();
    });
  });
  it('Should render the GoBackButton with correct href', async () => {
  mockedUseTire.mockReturnValue({
    isLoading: false,
    handleCurrentDetail: vi.fn(),
    tire: {
      id: 123,
      serialNumber: 'SN001',
      companyGroupId: 1,
      companyGroupName: 'Prolog',
      branchOfficeId: 2,
      branchOfficeName: 'Unidade Teste',
      currentLifeCycle: 1,
      timesRetreaded: 0,
      maxRetreadsExpected: 2,
      maxLifeCycles: 4,
      recommendedPressure: 90,
      currentPressure: 85,
      dot: 'DOTXYZ',
      purchaseCost: 1000,
      newTire: true,
      status: 'INVENTORY',
      createdAt: '2025-01-01T12:00:00Z',
      tireSize: {
        id: 1,
        width: 245,
        height: 80,
        rim: 16,
      },
      make: {
        id: 1,
        name: 'Goodyear',
      },
      model: {
        id: 2,
        name: 'Eagle',
        groovesQuantity: 4,
        treadDepth: 8,
      },
      registrationImages: [],
      disposal: {
        disposalReasonId: 1,
        disposalReasonDescription: 'Desgaste natural',
        disposalImagesUrl: [],
      },
    },
  } as any);

  render(
    <MemoryRouter initialEntries={['/pneu/3']}>
      <Routes>
        <Route path='/pneu/:id' element={<TireDetailPage />} />
      </Routes>
    </MemoryRouter>
  );

  const backButton = await screen.findByRole('link', { name: /voltar/i });
  expect(backButton).toBeInTheDocument();
  expect(backButton).toHaveAttribute('href', '/tire');
});
});
