import { toastError } from '@function/notifications';
import { api } from '@services/api';
import tireApi from '@services/api/requests/tire';

import { vi, describe, it, expect, beforeEach } from 'vitest';

vi.mock('@services/api', () => ({
  api: {
    get: vi.fn(),
  },
}));

vi.mock('@function/notifications', () => ({
  toastError: vi.fn(),
}));

describe('tireApi', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getItems', () => {
    it('Should return data on success.', async () => {
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

    it('Should call toastError and return an error on failure.', async () => {
      const error = { response: { data: { message: 'Erro personalizado' } } };
      (api.get as any).mockRejectedValueOnce(error);

      const result = await tireApi.getItems();

      expect(toastError).toHaveBeenCalledWith({
        content: 'Erro personalizado',
      });
      expect(result).toHaveProperty('error', 'Erro personalizado');
      expect(result.content).toEqual([]);
    });

    it('Should use fallback when the error has no message.', async () => {
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
    it('Should return tire details in a successful response', async () => {
      const mockTire = { id: 42, serialNumber: 'ABC123' };
      (api.get as any).mockResolvedValueOnce({ data: mockTire });

      const result = await tireApi.getTire(42);

      expect(api.get).toHaveBeenCalledWith(expect.stringContaining('42'));
      expect(result).toEqual(mockTire);
      expect(toastError).not.toHaveBeenCalled();
    });

    it('Should trigger toastError and return null in case of failure.', async () => {
      const error = { response: { data: { message: 'Erro no getTire' } } };
      (api.get as any).mockRejectedValueOnce(error);

      const result = await tireApi.getTire(99);

      expect(toastError).toHaveBeenCalledWith({ content: 'Erro no getTire' });
      expect(result).toBeNull();
    });

    it('Should use fallback when the error has no message.', async () => {
      (api.get as any).mockRejectedValueOnce({});

      const result = await tireApi.getTire(100);

      expect(toastError).toHaveBeenCalledWith({ content: 'Erro desconhecido' });
      expect(result).toBeNull();
    });
  });
});
