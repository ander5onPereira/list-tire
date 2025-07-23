import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTire } from '../../hooks/useTire';
import { TireDetailCard } from './components/TireCards/TireDetailCard';
import { TireDisposalCard } from './components/TireCards/TireDisposalCard';
import { TireMakeModelCard } from './components/TireCards/TireMakeModelCard';
import { TireNotDetailCard } from './components/TireCards/TireNotDetailCard';
import { TireSizeCard } from './components/TireCards/TireSizeCard';
import { LoadingDetails } from './components/LoadingDetails';

export function TireDetailPage() {
  const { id } = useParams();
  const { handleCurrentDetail, isLoading, tire } = useTire();

  useEffect(() => {
    const tireId = Number(id);
    if (!isNaN(tireId)) {
      handleCurrentDetail(tireId);
    }
  }, [id, handleCurrentDetail]);

  if (isLoading || !tire) {
    return <LoadingDetails />;
  }

  if (!tire?.id) {
    return <TireNotDetailCard />;
  }
  return (
    <div className='grid grid-cols-3 gap-4 mx-16'>
      <TireDetailCard />
      <div className='lg:col-span-1 col-span-3  flex lg:flex-col flex-col md:flex-row  justify-between gap-4'>
        <TireSizeCard />
        <TireMakeModelCard />
      </div>
      <div className='col-span-3'>
        <TireDisposalCard />
      </div>
    </div>
  );
}
