import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AppRoutes from '../router';
import { describe, expect, it, vi } from 'vitest';

// Mocks de páginas (cobrem importações nomeadas e por default/lazy)
vi.mock('../pages/Home', () => ({
  HomePage: () => <div>Home Page</div>,
  default: () => <div>Home Page</div>,
}));

vi.mock('../pages/tire', () => ({
  TirePage: () => <div>Tire Page</div>,
  default: () => <div>Tire Page</div>,
}));

vi.mock('../pages/tireDetail', () => ({
  TireDetailPage: () => <div>Tire Detail Page</div>,
  default: () => <div>Tire Detail Page</div>,
}));

describe('AppRoutes', () => {
  it('renderiza HomePage na rota /', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(await screen.findByText('Home Page')).toBeInTheDocument();
  });

  it('renderiza TirePage na rota /tire', async () => {
    render(
      <MemoryRouter initialEntries={['/tire']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(await screen.findByText('Tire Page')).toBeInTheDocument();
  });

  it('renderiza TireDetailPage na rota /tire/:id', async () => {
    render(
      <MemoryRouter initialEntries={['/tire/123']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(await screen.findByText('Tire Detail Page')).toBeInTheDocument();
  });
});