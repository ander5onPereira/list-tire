import tireApi from './'; // ajuste o caminho se precisar
import { api } from '../..';
import { toastError } from '../../../../function/notifications';
import { vi, describe, it, expect, beforeEach } from 'vitest';

vi.mock('../..', () => ({
  api: {
    get: vi.fn(),
  },
}));

vi.mock('../../../../function/notifications', () => ({
  toastError: vi.fn(),
}));

describe('tireApi', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getItems', () => {
    it('deve retornar dados em caso de sucesso', async () => {
      const mockResponse = { data: { content: [{ id: 1 }], total: 1 } };
      (api.get as any).mockResolvedValueOnce(mockResponse);

      const result = await tireApi.getItems({
        pageSize: 10,
        pageNumber: 1,
      } as any);

      expect(api.get).toHaveBeenCalledWith(expect.any(String), {
        params: { pageSize: 10, pageNumber: 1 },
      });
      expect(result).toEqual(mockResponse.data);
      expect(toastError).not.toHaveBeenCalled();
    });

    it('deve chamar toastError e retornar erro em caso de falha', async () => {
      const error = { response: { data: { message: 'Erro personalizado' } } };
      (api.get as any).mockRejectedValueOnce(error);

      const result = await tireApi.getItems();

      expect(toastError).toHaveBeenCalledWith({
        content: 'Erro personalizado',
      });
      expect(result).toHaveProperty('error', 'Erro personalizado');
      expect(result.content).toEqual([]);
    });

    it('deve usar fallback quando erro não tiver mensagem', async () => {
      (api.get as any).mockRejectedValueOnce({});

      const result = await tireApi.getItems();

      expect(toastError).toHaveBeenCalledWith({ content: 'Erro desconhecido' });
      expect('error' in result).toBe(true);
      if ('error' in result) {
        expect(result.error).toBe('Erro desconhecido');
        expect(result.content).toEqual([]);
      }
    });
  });

  describe('getTire', () => {
    it('deve retornar dados do pneu em caso de sucesso', async () => {
      const mockTire = { id: 42, serialNumber: 'ABC123' };
      (api.get as any).mockResolvedValueOnce({ data: mockTire });

      const result = await tireApi.getTire(42);

      expect(api.get).toHaveBeenCalledWith(expect.stringContaining('42'));
      expect(result).toEqual(mockTire);
      expect(toastError).not.toHaveBeenCalled();
    });

    it('deve chamar toastError e retornar null em caso de erro', async () => {
      const error = { response: { data: { message: 'Erro no getTire' } } };
      (api.get as any).mockRejectedValueOnce(error);

      const result = await tireApi.getTire(99);

      expect(toastError).toHaveBeenCalledWith({ content: 'Erro no getTire' });
      expect(result).toBeNull();
    });

    it('deve usar fallback quando erro não tiver mensagem', async () => {
      (api.get as any).mockRejectedValueOnce({});

      const result = await tireApi.getTire(100);

      expect(toastError).toHaveBeenCalledWith({ content: 'Erro desconhecido' });
      expect(result).toBeNull();
    });
  });
});
