import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import AppRoutes from './router';

// Mock dos componentes de página para simplificar o teste
vi.mock('./pages/Home', () => ({
  HomePage: () => <div>Home Page</div>,
}));
vi.mock('./pages/tire', () => ({
  TirePage: () => <div>Tire Page</div>,
}));
vi.mock('./pages/tireDetail', () => ({
  TireDetailPage: () => <div>Tire Detail Page</div>,
}));

describe('AppRoutes', () => {
  it('renderiza HomePage na rota /', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });

  it('renderiza TirePage na rota /tire', () => {
    render(
      <MemoryRouter initialEntries={['/tire']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByText('Tire Page')).toBeInTheDocument();
  });

  it('renderiza TireDetailPage na rota /tire/:id', () => {
    render(
      <MemoryRouter initialEntries={['/tire/123']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByText('Tire Detail Page')).toBeInTheDocument();
  });
});
