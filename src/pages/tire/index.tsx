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
        branchOfficesId: 215,
        companyId: 3,
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
