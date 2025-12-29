import React from 'react'

import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'

export default function Table({column,rows}) {
 
  const table=useReactTable({
    data:rows,
    columns:column,
    getCoreRowModel:getCoreRowModel(),
      getRowId: row => row.id,
  })
  return (
    <>
    
<div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base ">
  <table className="w-full text-sm text-left rtl:text-right text-body ">
    <thead className="text-sm text-body bg-neutral-secondary-soft  rounded-base ">
      

    {table.getHeaderGroups().map(group => (
      <tr key={group.id}>
        {group.headers.map(header => (
          <th key={header.id} className='text-gray-500 text-lg font-medium text-start'>
            {flexRender( header.column.columnDef.header,
            header.getContext()
            
            )}
          </th>
        ))}
      </tr>
    ))}
    
      
    </thead>
   <tbody>
  {table.getRowModel().rows.map(row => (
    <tr key={row.id}>
      {row.getVisibleCells().map(cell => (
              <td
                    key={cell.id}
                    className=" py-2 text-start"
                  >
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
  )
}
