import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { TireProvider } from '../context/TireContext';
import { useTire } from './useTire';

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <MemoryRouter>
    <QueryClientProvider client={queryClient}>
      <TireProvider>{children}</TireProvider>
    </QueryClientProvider>
  </MemoryRouter>
);

describe('useTire hook', () => {
  it('deve retornar contexto corretamente dentro do TireProvider', () => {
    const { result } = renderHook(() => useTire(), { wrapper });

    expect(result.current.currentId).toBeNull();

    act(() => {
      result.current.handleCurrentDetail(42);
    });

    expect(result.current.currentId).toBe(42);
  });

  it('deve lançar erro se usado fora do provider', () => {
    expect(() => renderHook(() => useTire())).toThrow(
      'useTire must be used within a TireProvider'
    );
  });
});
