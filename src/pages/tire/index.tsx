import { Card } from '@components/card';
import { GoBackButton } from '@components/gobackButton';
import { useCallback } from 'react';
import { useTire } from '../../hooks/useTire';
import tireApi from '../../services/api/requests/tire';
import { columns } from './listSettings';
import { DataTableV1 } from '@components/dataTableV1';
import { useQuery } from '@tanstack/react-query';

export function TirePage() {
  const { handleCurrentDetail } = useTire();
  const { data: tires, isLoading } = useQuery({
    queryKey: ['tires'],
    queryFn: () => tireApi.getItems(),
    staleTime: 60000,
  });

  const handleRowClick = useCallback((row: { id: number }) => {
    handleCurrentDetail(row.id);
  }, []);
  return (
    <div className='flex flex-col pt-8 h-screen overflow-hidden mx-2 md:mx-8 lg:max-w-7xl lg:mx-auto'>
      <Card>
        <GoBackButton />
        <DataTableV1
          columns={columns}
          data={tires?.content || []}
          onRowClick={handleRowClick}
          isLoading={isLoading}
        />
      </Card>
    </div>
  );
}
