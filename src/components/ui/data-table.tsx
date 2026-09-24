import { ReactNode } from "react";

interface Column<T> {
  header: string;
  accessor: (item: T) => ReactNode;
  className?: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string;
  onRowClick?: (item: T) => void;
  emptyMessage?: string;
}

export function Table<T>({ columns, data, keyExtractor, onRowClick, emptyMessage = "No data available" }: TableProps<T>) {
  if (data.length === 0) {
    return <div className="rounded-md border border-border bg-surface p-6 text-center text-sm text-text-muted">{emptyMessage}</div>;
  }

  return <div className="overflow-x-auto rounded-xl border border-border"><table className="w-full whitespace-nowrap text-left text-xs"><thead className="bg-surface2/70 font-mono text-[9px] uppercase tracking-[0.14em] text-text-muted"><tr>{columns.map((column, index) => <th key={index} className={`px-3 py-3 font-medium ${column.className || ""}`}>{column.header}</th>)}</tr></thead><tbody className="divide-y divide-border/70 bg-surface">{data.map((item, index) => <tr key={keyExtractor(item)} onClick={() => onRowClick?.(item)} className={`${index % 2 === 0 ? "bg-surface" : "bg-surface2/25"} ${onRowClick ? "cursor-pointer transition-colors hover:bg-surface2/60" : ""}`}>{columns.map((column, columnIndex) => <td key={columnIndex} className={`px-3 py-3 text-text-primary ${column.className || ""}`}>{column.accessor(item)}</td>)}</tr>)}</tbody></table></div>;
}
