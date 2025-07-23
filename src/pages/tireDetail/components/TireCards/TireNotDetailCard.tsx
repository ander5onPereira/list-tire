import { useNavigate } from 'react-router-dom';
import { Button } from '../../../../components/button';
import { Card } from '../../../../components/card';
import { useTire } from '../../../../hooks/useTire';

export function TireNotDetailCard() {
  const { handleCurrentDetail } = useTire();
  const navigate = useNavigate();
  return (
    <Card className={'items-center gap-3'}>
      <p className='text-center text-dark_blue'>
        O pneu pesquisado não está disponivel no momento
      </p>
      <div>
        <Button
          onClick={() => {
            navigate('/tire');
            handleCurrentDetail(null);
          }}
        >
          voltar
        </Button>
      </div>
    </Card>
  );
}
