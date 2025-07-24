import type { dataTableColumnType } from '@components/dataTable/types';

export const columns: Array<dataTableColumnType> = [
  {
    uniqueId: 'id',
    key: 'id',
    label: 'ID',
    filter: false,
    className: 'w-20',
    filterType: 'text',
  },
  {
    uniqueId: 'serialNumber',
    key: 'serialNumber',
    label: 'Série',
    filter: false,
    className: 'w-20',
    filterType: 'text',
  },
  {
    uniqueId: 'make.name',
    key: 'make',
    label: 'Marca',
    filter: false,
    className: 'w-20',
    render: (make: any) => make.name,
  },
  {
    uniqueId: 'model.name',
    key: 'model',
    label: 'Modelo',
    filter: false,
    className: 'w-20',
    filterType: 'text',
    render: (model: any) => model.name,
  },
  {
    uniqueId: 'Medida',
    key: 'tireSize',
    label: 'Medida',
    filter: false,
    className: 'w-20',
    filterType: 'text',
    render: (tireSize: any) =>
      `${tireSize.width}/${tireSize.height} R${tireSize.rim}`,
  },
  {
    uniqueId: 'DOT',
    key: 'dot',
    label: 'DOT',
    filter: false,
    className: 'w-20',
    filterType: 'text',
  },
  {
    uniqueId: 'status',
    key: 'status',
    label: 'status',
    filter: false,
    className: 'w-20',
    filterType: 'text',
  },
];
