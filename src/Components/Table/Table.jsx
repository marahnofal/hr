import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

export default function Table({ column, rows }) {
  const table = useReactTable({
    data: rows,
    columns: column,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row.id,
  });
  return (
    <>
      <div className="bg-neutral-primary-soft rounded-base relative w-full overflow-x-auto shadow-xs">
        <table className="text-body mx-auto w-[95%] text-left text-sm rtl:text-right">
          <thead className="text-body bg-neutral-secondary-soft rounded-base text-sm">
            {table.getHeaderGroups().map((group) => (
              <tr key={group.id}>
                {group.headers.map((header) => (
                  <th
                    key={header.id}
                    className="text-start text-lg font-medium text-gray-500"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="py-2 text-start">
                    {cell.column.columnDef.cell
                      ? flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )
                      : cell.getValue()}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
