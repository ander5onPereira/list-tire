import { useCallback } from 'react';
import { DataTable } from '../../components/dataTable';
import { useTire } from '../../hooks/useTire';
import tireApi from '../../services/api/requests/tire';
import { columns } from './listSettings';

export function TirePage() {
  const { handleCurrentDetail } = useTire();
  const fetchTires = useCallback(
    async ({
      pageSize,
      pageNumber,
    }: {
      pageSize: number;
      pageNumber: number;
    }) => {
      const response = await tireApi.getItems({
        pageSize,
        pageNumber,
        branchOfficesId: import.meta.env.VITE_API_BRANCH_OFFICES_ID,
        companyId: import.meta.env.VITE_API_COMPANY_ID,
      });
      return response.content;
    },
    []
  );

  const handleRowClick = useCallback((row: { id: number }) => {
    handleCurrentDetail(row.id);
  }, []);
  return (
    <DataTable
      columns={columns}
      dataService={fetchTires}
      onRowClick={handleRowClick}
    />
  );
}
