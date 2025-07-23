import { TireProvider } from '@context/TireContext';
import { useTire } from '@hooks/useTire';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <MemoryRouter>
    <QueryClientProvider client={queryClient}>
      <TireProvider>{children}</TireProvider>
    </QueryClientProvider>
  </MemoryRouter>
);

describe('useTire hook', () => {
  it('Should return context correctly within TireProvider', () => {
    const { result } = renderHook(() => useTire(), { wrapper });

    expect(result.current.currentId).toBeNull();

    act(() => {
      result.current.handleCurrentDetail(42);
    });

    expect(result.current.currentId).toBe(42);
  });

  it('Should throw an error if used outside the provider', () => {
    expect(() => renderHook(() => useTire())).toThrow(
      'useTire must be used within a TireProvider'
    );
  });
});
