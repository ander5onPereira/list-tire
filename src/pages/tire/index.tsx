import { useCallback } from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { DataTable } from '../../components/dataTable';
import { useTire } from '../../hooks/useTire';
import tireApi from '../../services/api/requests/tire';
import { columns } from './listSettings';
import { Card } from '@components/card';
import { GoBackButton } from '@components/gobackButton';

const BRANCH_OFFICES_ID = Number(
  import.meta.env.VITE_API_BRANCH_OFFICES_ID ?? 0
); // value defined by the documentation description
const COMPANY_ID = Number(import.meta.env.VITE_API_COMPANY_ID ?? 0); //value defined by the documentation description
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
        branchOfficesId: BRANCH_OFFICES_ID,
        companyId: COMPANY_ID,
      });
      return response.content;
    },
    []
  );

  const handleRowClick = useCallback((row: { id: number }) => {
    handleCurrentDetail(row.id);
  }, []);
  return (
    <div className='flex flex-col pt-8 h-screen overflow-hidden mx-2 md:mx-8 lg:max-w-5xl lg:mx-auto'>
      <Card>
        <GoBackButton />
        <DataTable
          columns={columns}
          dataService={fetchTires}
          onRowClick={handleRowClick}
        />
      </Card>
    </div>
  );
}
