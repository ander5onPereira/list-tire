import { Card } from '../../../../components/card';
import { useTire } from '../../../../hooks/useTire';

export function TireSizeCard() {
  const { tire } = useTire();

  if (!tire?.disposal) return null;

  const { height, width, rim } = tire.tireSize;

  return (
    <Card className={'mx-0 h-full md:w-full'}>
      <div>
        <h2 className='font-semibold text-dark_blue mb-4'>Dimensões</h2>
        <div className='flex gap-4 text-sm flex-col'>
          <span className='bg-light_blue text-dark-greyzy px-3 py-1 rounded-full font-medium'>
            Altura: {height}
          </span>
          <span className='bg-light_blue text-dark-greyzy px-3 py-1 rounded-full font-medium'>
            Largura: {width}
          </span>
          <span className='bg-light_blue text-dark-greyzy px-3 py-1 rounded-full font-medium'>
            Aro: {rim}
          </span>
        </div>
      </div>
    </Card>
  );
}
