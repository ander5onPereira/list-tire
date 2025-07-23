import { Card } from '../../../../components/card';
import { useTire } from '../../../../hooks/useTire';

export function TireDisposalCard() {
  const { tire } = useTire();

  if (!tire?.disposal) return null;

  const { disposalReasonDescription, disposalImagesUrl = [] } = tire.disposal;

  return (
    <Card className='w-full'>
      <section aria-labelledby='disposal-title'>
        <h2 id='disposal-title' className='text-xl font-semibold mb-4'>
          Motivo do Descarte
        </h2>

        <p className='text-gray-800 mb-4'>{disposalReasonDescription}</p>

        <div className='flex flex-wrap gap-4'>
          {disposalImagesUrl.map((url, i) => (
            <img
              key={url || i}
              src={url}
              alt={`Imagem do descarte ${i + 1}`}
              className='w-40 h-40 object-cover rounded-xl border border-gray-200'
              loading='lazy'
            />
          ))}
        </div>
      </section>
    </Card>
  );
}
