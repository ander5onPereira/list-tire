import { Card } from '../../../../components/card';
import { useTire } from '../../../../hooks/useTire';

export function TireMakeModelCard() {
  const { tire } = useTire();

  if (!tire?.disposal) return null;

  const { make, model } = tire;

  return (
    <Card className={'mx-0 h-full md:w-full'}>
      <div>
        <h2 className=' font-semibold text-dark_blue mb-4'>Marca & Modelo</h2>
        <p className='text-gray-800 mb-2'>
          Marca: <strong>{make?.name}</strong>
        </p>
        <p className='text-gray-800 mb-2'>
          Modelo: <strong>{model?.name}</strong>
        </p>
        <p className='text-gray-800 mb-2'>Sulcos: {model?.groovesQuantity}</p>
        <p className='text-gray-800'>Profundidade: {model?.treadDepth} mm</p>
      </div>
    </Card>
  );
}
