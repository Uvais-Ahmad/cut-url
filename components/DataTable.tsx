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

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    isAuthenticated?: boolean
    maxRowsForGuest?: number
}

export function DataTable<TData, TValue>({
    columns,
    data,
    isAuthenticated = false,
    maxRowsForGuest = 3,
}: DataTableProps<TData, TValue>) {
    // Limit data for non-authenticated users
    const displayData = isAuthenticated ? data : data.slice(0, maxRowsForGuest)
    const table = useReactTable({
        data: displayData,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div className="w-full relative">
            <div className="rounded-md border overflow-hidden">
                <Table className="w-full">
                    <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                            // Define column widths
                            const getColumnWidth = (id: string) => {
                                switch (id) {
                                    case 'shortUrl': return 'w-[25%] min-w-[200px]'
                                    case 'originalUrl': return 'w-[35%] min-w-[250px]'
                                    case 'qrCode': return 'w-[8%] min-w-[80px]'
                                    case 'clicks': return 'w-[10%] min-w-[80px]'
                                    case 'active': return 'w-[12%] min-w-[100px]'
                                    case 'createdAt': return 'w-[10%] min-w-[90px]'
                                    default: return ''
                                }
                            }
                            
                            return (
                            <TableHead 
                                key={header.id} 
                                className={`px-2 py-3 ${getColumnWidth(header.id)}`}
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
                        table.getRowModel().rows.map((row, index) => (
                        <TableRow
                            key={row.id}
                            data-state={row.getIsSelected() && "selected"}
                            className={`hover:bg-muted/50 transition-colors ${
                                !isAuthenticated && index >= maxRowsForGuest - 1 ? 'opacity-60' : ''
                            }`}
                        >
                            {row.getVisibleCells().map((cell) => {
                                // Apply same width classes to cells
                                const getColumnWidth = (id: string) => {
                                    switch (id) {
                                        case 'shortUrl': return 'w-[25%] min-w-[200px]'
                                        case 'originalUrl': return 'w-[35%] min-w-[250px]'
                                        case 'qrCode': return 'w-[8%] min-w-[80px]'
                                        case 'clicks': return 'w-[10%] min-w-[80px]'
                                        case 'active': return 'w-[12%] min-w-[100px]'
                                        case 'createdAt': return 'w-[10%] min-w-[90px]'
                                        default: return ''
                                    }
                                }
                                
                                return (
                                <TableCell 
                                    key={cell.id} 
                                    className={`px-2 py-3 ${getColumnWidth(cell.column.id)}`}
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
                            No results.
                        </TableCell>
                        </TableRow>
                    )}
                    </TableBody>
                </Table>
            </div>
            
            {/* Fade overlay for non-authenticated users */}
            {!isAuthenticated && data.length > maxRowsForGuest && (
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none"></div>
            )}
        </div>
    )
}
