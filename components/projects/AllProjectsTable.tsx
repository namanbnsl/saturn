'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { ProjectPriority } from '@/types/db/enums';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table';
import { useRouter } from 'next/navigation';

interface DataTableProps<TData> {
  data: TData[];
}

export type Project = {
  id: string;
  name: string;
  priority: ProjectPriority;
};

export function ProjectsDataTable<TData>({ data }: DataTableProps<TData>) {
  const columns: ColumnDef<Project>[] = [
    {
      accessorKey: 'name',
      header: 'Name'
    },
    {
      accessorKey: 'priority',
      header: 'Priority',
      cell: ({ row }) => {
        return (
          <div>
            {row.getValue('priority') === 'LOW' ? (
              <div className="flex items-center gap-x-2">
                <div className="w-4 h-4 bg-green-400 rounded-full" />
                <div>Low</div>
              </div>
            ) : row.getValue('priority') === 'MEDIUM' ? (
              <div className="flex items-center gap-x-2">
                <div className="w-4 h-4 bg-yellow-400 rounded-full" />
                <div>Medium</div>
              </div>
            ) : (
              <div className="flex items-center gap-x-2">
                <div className="w-4 h-4 bg-red-400 rounded-full" />
                <div>High</div>
              </div>
            )}
          </div>
        );
      }
    }
  ];

  const table = useReactTable({
    data,

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  const router = useRouter();

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                className="cursor-pointer"
                onClick={() =>
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  router.push(`/dashboard/projects/${row?.original?.id}`)
                }
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
