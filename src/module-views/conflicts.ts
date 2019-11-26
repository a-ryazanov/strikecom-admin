import { ModuleView } from '@/interfaces';

export default {
  name: 'conflicts',
  tableView: {
    columns: [
      {
        name: 'documentNumber',
        title: 'Номер',
        typeOfCell: 'string',
        minWidth: 60,
      },
      {
        name: 'invoiceDate',
        title: 'Дата и время',
        typeOfCell: 'date',
        format: 'DD-MM-YY HH:mm',
        minWidth: 80,
      },
      {
        name: 'customerName',
        title: 'Корреспондент',
        typeOfCell: 'string',
        minWidth: 100,
      },
    ],
  },
} as ModuleView;
