import { Input } from '../../../inputs';
import { useDataTableV1 } from '../../hook/useDataTable';

export function Filter() {
  const { filters, updateFilters } = useDataTableV1();
  return (
    <div>
      <Input
        name='textQuery'
        id='textQuery'
        label='Filter'
        placeholder='Filter'
        value={filters}
        onChange={(e) => updateFilters(e.target.value)}
      />
    </div>
  );
}
