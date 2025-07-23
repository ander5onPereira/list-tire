import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useContext } from 'react';
import tireApi from '@services/api/requests/tire';
import TireContext, { TireProvider } from '@context/TireContext';



// Mock of the tireApi
vi.mock('@services/api/requests/tire', () => ({
  default: {
    getTire: vi.fn(),
    getItems: vi.fn(),
  },
}));

// Mock implementation of useNavigate hook from react-router-dom
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

//Mock of @tanstack/react-query
const mockUseQuery = vi.fn();

vi.mock('@tanstack/react-query', () => ({
  useQuery: (...args: any[]) => mockUseQuery(...args),
}));

describe('TireProvider', () => {
  beforeEach(() => {
    mockNavigate.mockReset();
    (tireApi.getTire as ReturnType<typeof vi.fn>).mockReset();
    mockUseQuery.mockReset();
  });

  it('provides default context and updates currentId', () => {
    // configures mockUseQuery return for the test
    mockUseQuery.mockReturnValue({
      data: { id: 1, serialNumber: '123' },
      isLoading: false,
    });

    function TestComponent() {
      const { tire, isLoading, currentId, handleCurrentDetail } =
        useContext(TireContext);

      return (
        <div>
          <p>Loading: {isLoading ? 'Yes' : 'No'}</p>
          <p>Current ID: {currentId ?? 'null'}</p>
          <p>Tire Serial: {tire?.serialNumber ?? 'no tire'}</p>
          <button onClick={() => handleCurrentDetail(42)}>Set ID to 42</button>
          <button onClick={() => handleCurrentDetail(null)}>Clear ID</button>
        </div>
      );
    }

    render(
      <MemoryRouter>
        <TireProvider>
          <TestComponent />
        </TireProvider>
      </MemoryRouter>
    );

    expect(screen.getByText('Loading: No')).toBeInTheDocument();
    expect(screen.getByText('Current ID: null')).toBeInTheDocument();
    expect(screen.getByText('Tire Serial: 123')).toBeInTheDocument();

    act(() => {
      screen.getByText('Set ID to 42').click();
    });

    expect(screen.getByText('Current ID: 42')).toBeInTheDocument();
    expect(mockNavigate).toHaveBeenCalledWith('/tire/42');

    act(() => {
      screen.getByText('Clear ID').click();
    });

    expect(screen.getByText('Current ID: null')).toBeInTheDocument();
  });

  it('Should not run query if ID is invalid.', () => {
    // Here we set mock to enabled: false
    mockUseQuery.mockImplementation(({ enabled }: { enabled: boolean }) => {
      expect(enabled).toBe(false);
      return { data: undefined, isLoading: false };
    });

    render(
      <MemoryRouter>
        <TireProvider>{null}</TireProvider>
      </MemoryRouter>
    );
  });
});
