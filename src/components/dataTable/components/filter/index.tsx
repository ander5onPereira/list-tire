import { Input } from '../../../inputs';
import { useDataTable } from '../../hook/useDataTable';

export function Filter() {
  const { filters, updateFilters } = useDataTable();
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
