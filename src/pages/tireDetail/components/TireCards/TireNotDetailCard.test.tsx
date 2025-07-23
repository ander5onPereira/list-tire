import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { useNavigate } from 'react-router-dom';
import { TireNotDetailCard } from './TireNotDetailCard';
import { useTire } from '../../../../hooks/useTire';

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

vi.mock('../../../../hooks/useTire');

const mockedUseTire = useTire as unknown as jest.MockedFunction<typeof useTire>;
const mockedNavigate = vi.fn();

describe('TireNotDetailCard', () => {
  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockedNavigate);
  });

  it('renderiza mensagem e botão corretamente', () => {
    mockedUseTire.mockReturnValue({
      handleCurrentDetail: vi.fn(),
    } as any);

    render(<TireNotDetailCard />);

    expect(
      screen.getByText('O pneu pesquisado não está disponivel no momento')
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /voltar/i })).toBeInTheDocument();
  });

  it('navega para /tire e limpa detalhe ao clicar no botão', async () => {
    const handleCurrentDetail = vi.fn();
    mockedUseTire.mockReturnValue({ handleCurrentDetail } as any);
    const user = userEvent.setup();

    render(<TireNotDetailCard />);

    await user.click(screen.getByRole('button', { name: /voltar/i }));

    expect(mockedNavigate).toHaveBeenCalledWith('/tire');
    expect(handleCurrentDetail).toHaveBeenCalledWith(null);
  });
});
