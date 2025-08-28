"use client"

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

interface AuthenticatedDataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function AuthenticatedDataTable<TData, TValue>({
    columns,
    data,
}: AuthenticatedDataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div className="w-full">
            <Table className="w-full">
                <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                        // Define column widths for authenticated users
                        const getColumnWidth = (id: string) => {
                            switch (id) {
                                case 'shortUrl': return 'w-[20%] min-w-[180px]'
                                case 'originalUrl': return 'w-[30%] min-w-[250px]'
                                case 'qrCode': return 'w-[8%] min-w-[80px]'
                                case 'clicks': return 'w-[10%] min-w-[80px]'
                                case 'active': return 'w-[10%] min-w-[100px]'
                                case 'createdAt': return 'w-[12%] min-w-[100px]'
                                case 'actions': return 'w-[10%] min-w-[100px]'
                                default: return ''
                            }
                        }
                        
                        return (
                        <TableHead 
                            key={header.id} 
                            className={`px-4 py-3 ${getColumnWidth(header.id)}`}
                        >
                            {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                                )}
                        </TableHead>
                        )
                    })}
                    </TableRow>
                ))}
                </TableHeader>
                <TableBody>
                {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                    <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                        className="hover:bg-muted/50 transition-colors border-b"
                    >
                        {row.getVisibleCells().map((cell) => {
                            // Apply same width classes to cells
                            const getColumnWidth = (id: string) => {
                                switch (id) {
                                    case 'shortUrl': return 'w-[20%] min-w-[180px]'
                                    case 'originalUrl': return 'w-[30%] min-w-[250px]'
                                    case 'qrCode': return 'w-[8%] min-w-[80px]'
                                    case 'clicks': return 'w-[10%] min-w-[80px]'
                                    case 'active': return 'w-[10%] min-w-[100px]'
                                    case 'createdAt': return 'w-[12%] min-w-[100px]'
                                    case 'actions': return 'w-[10%] min-w-[100px]'
                                    default: return ''
                                }
                            }
                            
                            return (
                            <TableCell 
                                key={cell.id} 
                                className={`px-4 py-3 ${getColumnWidth(cell.column.id)}`}
                            >
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                            )
                        })}
                    </TableRow>
                    ))
                ) : (
                    <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                        No results found.
                    </TableCell>
                    </TableRow>
                )}
                </TableBody>
            </Table>
        </div>
    )
}
