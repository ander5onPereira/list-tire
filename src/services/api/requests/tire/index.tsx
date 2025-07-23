import { api } from '../..';
import { toastError } from '../../../../function/notifications';

import { urls } from '../../urls';
import type {
  GetTiresParams,
  TireItem,
  TireListError,
  TireListResponse,
} from './types';

function handleApiError(error: any, fallback = 'Erro desconhecido') {
  const message = error?.response?.data?.message ?? fallback;
  toastError({ content: message });

  return {
    content: [],
    error: message,
  } as TireListError;
}
async function getItems(
  params?: GetTiresParams
): Promise<TireListResponse | TireListError> {
  try {
    const response = await api.get(urls.tire.getAll, { params });
    return response.data as TireListResponse;
  } catch (error) {
    return handleApiError(error);
  }
}
async function getTire(id: number): Promise<TireItem | null> {
  try {
    const response = await api.get(`${urls.tire.getAll}/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
    return null;
  }
}

const tireApi = {
  getItems,
  getTire,
};

export default tireApi;
