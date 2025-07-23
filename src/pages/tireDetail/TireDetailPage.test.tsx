import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { useTire } from '../../hooks/useTire';
import { TireDetailPage } from '.';

vi.mock('../../hooks/useTire');
const mockedUseTire = useTire as jest.MockedFunction<typeof useTire>;

describe('TireDetailPage', () => {
  it('exibe LoadingDetails quando está carregando', () => {
    mockedUseTire.mockReturnValue({
      isLoading: true,
      tire: null,
      handleCurrentDetail: vi.fn(),
    } as any);

    render(
      <MemoryRouter initialEntries={['/pneu/1']}>
        <Routes>
          <Route path="/pneu/:id" element={<TireDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('status')).toBeInTheDocument(); // ou ajuste conforme seu LoadingDetails
  });

  it('exibe TireNotDetailCard quando tire não tem id', () => {
    mockedUseTire.mockReturnValue({
      isLoading: false,
      tire: {},
      handleCurrentDetail: vi.fn(),
    } as any);

    render(
      <MemoryRouter initialEntries={['/pneu/2']}>
        <Routes>
          <Route path="/pneu/:id" element={<TireDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/O pneu pesquisado não está disponivel no momento/i)).toBeInTheDocument(); // ajuste se necessário
  });

  it('exibe todos os cards quando dados são válidos', async () => {
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
          <Route path="/pneu/:id" element={<TireDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      // Confirma detalhes principais
      expect(screen.getByText('Detalhes do Pneu')).toBeInTheDocument();
      expect(screen.getByText(/SN001/)).toBeInTheDocument();
      expect(screen.getByText(/Prolog/)).toBeInTheDocument();
      expect(screen.getByText(/Unidade Teste/)).toBeInTheDocument();

      // Confirma Make e Model
      expect(screen.getByText(/Goodyear/)).toBeInTheDocument();
      expect(screen.getByText(/Eagle/)).toBeInTheDocument();

      // Confirma tamanho
      expect(screen.getByText(/245/)).toBeInTheDocument();
      expect(screen.getByText(/80/)).toBeInTheDocument();
      expect(screen.getByText(/16/)).toBeInTheDocument();

      // Confirma descarte
      expect(screen.getByText(/Desgaste natural/)).toBeInTheDocument();
    });
  });
});
