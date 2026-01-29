interface TableProps {
  columns: {
    id: string;
    label: string;
    width?: string;
  }[];
  data: {
    [key: string]: any;
  }[];
}

export default function Table({ columns, data }: TableProps) {
  return (
    <div className="w-full overflow-x-auto border border-gray-300 rounded-sm">
      <table className="w-full min-w-max text-sm">
        <thead className="bg-gray-100 border-b border-gray-300">
          <tr>
            {columns.map((column) => (
              <th
                key={column.id}
                className="px-4 py-2 text-left font-semibold text-gray-700 whitespace-nowrap"
                style={{ width: column.width }}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-gray-50">
          {data.map((row) => (
            <tr key={row.id} className="hover:bg-gray-100 transition-colors">
              {columns.map((column) => (
                <td
                  key={column.id}
                  className="px-4 py-2 whitespace-nowrap"
                  style={{ width: column.width }}
                >
                  {row[column.id]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
