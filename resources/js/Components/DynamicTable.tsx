import React from "react";

interface Column<T> {
    header: string;
    key: keyof T | string;
    render?: (row: T) => React.ReactNode;
}

interface DynamicTableProps<T> {
    columns: Column<T>[];
    data: T[];
}

export default function DynamicTable<T extends { id: number }>({ columns, data }: DynamicTableProps<T>) {
    return (
        <table className="table">
            <thead className="text-center">
            <tr>
                {columns.map((col) => (
                    <th key={col.header}>{col.header}</th>
                ))}
            </tr>
            </thead>
            <tbody className="text-center">
            {data.map((row) => (
                <tr key={row.id}>
                    {columns.map((col) => (
                        <td className="align-middle" key={col.key.toString()}>
                            {col.render ? col.render(row) : (row as any)[col.key]}
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
}
