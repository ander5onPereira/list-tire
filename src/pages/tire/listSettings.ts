import type { dataTableColumnType } from '@components/dataTable/context/types';

export const columns: Array<dataTableColumnType> = [
  {
    uniqueId: 'id',
    key: 'id',
    label: 'ID',
    className: 'w-20',
  },
  {
    uniqueId: 'serialNumber',
    key: 'serialNumber',
    label: 'Série',
    className: 'w-20',
  },
  {
    uniqueId: 'make.name',
    key: 'make',
    label: 'Marca',
    className: 'w-20',
    render: (make: any) => make.name,
  },
  {
    uniqueId: 'model.name',
    key: 'model',
    label: 'Modelo',
    className: 'w-20',
    render: (model: any) => model.name,
  },
  {
    uniqueId: 'Medida',
    key: 'tireSize',
    label: 'Medida',
    className: 'w-20',
    render: (tireSize: any) =>
      `${tireSize.width}/${tireSize.height} R${tireSize.rim}`,
  },
  {
    uniqueId: 'DOT',
    key: 'dot',
    label: 'DOT',
    className: 'w-20',
  },
  {
    uniqueId: 'status',
    key: 'status',
    label: 'status',
    className: 'w-20',
  },
];
