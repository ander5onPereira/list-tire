import { Card } from '../../../../components/card';
import { useTire } from '../../../../hooks/useTire';
import { DetailItem } from '../DetailItem';

export function TireDetailCard() {
  const { tire } = useTire();

  if (!tire?.id) return null;
  
  const {
    id,
    serialNumber,
    companyGroupName,
    currentLifeCycle,
    timesRetreaded,
    maxRetreadsExpected,
    maxLifeCycles,
    recommendedPressure,
    currentPressure,
    branchOfficeName,
    dot = '',
    purchaseCost,
    status,
    createdAt = '',
  } = tire;

  return (
    <div className='lg:col-span-2 col-span-3'>
      <Card>
        <h1 className='font-semibold text-normal_blue mb-6'>
          Detalhes do Pneu
        </h1>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <DetailItem label='ID' value={id} />
          <DetailItem label='Número de Série' value={serialNumber} />
          <DetailItem label='Empresa' value={companyGroupName} />
          <DetailItem label='Filial' value={branchOfficeName} />
          <DetailItem label='Ciclo Atual' value={currentLifeCycle} />
          <DetailItem label='Reformas Feitas' value={timesRetreaded} />
          <DetailItem label='Reformas Máximas' value={maxRetreadsExpected} />
          <DetailItem label='Ciclos Máximos' value={maxLifeCycles} />
          <DetailItem
            label='Pressão Recomendada'
            value={`${recommendedPressure} PSI`}
          />
          <DetailItem label='Pressão Atual' value={`${currentPressure} PSI`} />
          <DetailItem label='DOT' value={dot} />
          <DetailItem label='Custo' value={`R$ ${purchaseCost}`} />
          <DetailItem label='Status' value={status} />
          <DetailItem
            label='Criado em'
            value={createdAt ? new Date(createdAt).toLocaleDateString() : ''}
          />
        </div>
      </Card>
    </div>
  );
}
