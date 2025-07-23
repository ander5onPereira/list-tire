import { Loading } from '../../../components/loading';

export function LoadingDetails() {
  return (
    <div role="status" className='flex w-screen h-screen justify-center items-center'>
      <Loading />
    </div>
  );
}
