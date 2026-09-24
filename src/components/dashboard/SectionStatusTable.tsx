import { SectionStatus } from '../../types';
import { Table } from '../ui/data-table';
import { StatusBadge } from '../ui/StatusBadge';

export const SectionStatusTable = ({ data }: { data: SectionStatus[] }) => {
  return (
    <Table
      data={data}
      keyExtractor={(item) => item.section}
      emptyMessage="No sections active. Submit a maintenance request to begin."
      columns={[
        {
          header: 'SECTION',
          accessor: (item) => <span className="font-medium">{item.section}</span>,
        },
        {
          header: 'REQUESTS',
          accessor: (item) => <span className="font-mono">{item.requests}</span>,
        },
        {
          header: 'EMERGENCY',
          accessor: (item) => (
            <span className={`font-mono ${item.emergency > 0 ? 'text-status-emergency font-bold' : 'text-text-muted'}`}>
              {item.emergency}
            </span>
          ),
        },
        {
          header: 'CONFLICTS',
          accessor: (item) => (
            <span className={`font-mono ${item.conflicts > 0 ? 'text-status-warning font-bold' : 'text-text-muted'}`}>
              {item.conflicts}
            </span>
          ),
        },
        {
          header: 'STATUS',
          accessor: (item) => <StatusBadge status={item.status} />,
        },
      ]}
    />
  );
};
