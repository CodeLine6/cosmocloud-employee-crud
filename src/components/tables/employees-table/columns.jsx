'use client';

import { CellAction } from './cell-action';

export const columns = [
    {
        accessorKey: '_id',
        header: 'EMP ID',
    },
    {
        accessorKey: 'full_name',
        accessorFn: (row) => `${row.first_name} ${row.last_name}`,
        header: 'Full Name',
    },

    {
        id: 'actions',
        cell: ({ row }) => <CellAction data={row.original} />
    }
];