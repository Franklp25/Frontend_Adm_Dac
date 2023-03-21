import { useTable, usePagination } from "react-table";

export default function Table({ columns, data }) {
    const {
        page,
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 },
        },
        usePagination
    );

    return (
        <>
            <div className="flex flex-col mx-4 mt-52">
                <div className="overflow-x-auto">
                    <div className=" w-full inline-block align-middle">
                        <div className="rounded-lg overflow-x-auto">
                            <table
                                className="min-w-full divide-y divide-gray-200"
                                {...getTableProps()}
                            >
                                <thead className=" bg-emerald-800 ">
                                    {headerGroups.map((headerGroup) => (
                                        <tr
                                            {...headerGroup.getHeaderGroupProps()}
                                        >
                                            {headerGroup.headers.map(
                                                (column) => (
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-xs font-bold text-left text-gray-100 uppercase "
                                                        {...column.getHeaderProps()}
                                                    >
                                                        {column.render(
                                                            "Header"
                                                        )}
                                                    </th>
                                                )
                                            )}
                                        </tr>
                                    ))}
                                </thead>
                                <tbody
                                    className="divide-y divide-gray-200"
                                    {...getTableBodyProps()}
                                >
                                    {page.map((row, i) => {
                                        prepareRow(row);
                                        return (
                                            <tr {...row.getRowProps()}>
                                                {row.cells.map((cell) => {
                                                    return (
                                                        <>
                                                            <td
                                                                className="bg-gray-100 px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap"
                                                                {...cell.getCellProps()}
                                                            >
                                                                {cell.render(
                                                                    "Cell"
                                                                )}
                                                            </td>
                                                        </>
                                                    );
                                                })}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="pb-4 w-full flex flex-wrap items-center justify-end">
                        <div className="shrink-0 w-56 py-2 px-2">
                            <button
                                type="button"
                                className="ml-6  text-gray-400 rounded-md text-2xl font-semibold hover:text-black"
                                onClick={() => gotoPage(0)}
                                disabled={!canPreviousPage}
                            >
                                {/* <FontAwesomeIcon
                                    className="hover:cursor-pointer"
                                    icon={icon({
                                        name: "backward",
                                        style: "solid",
                                    })}
                                /> */}
                            </button>
                            <button
                                type="button"
                                className="ml-6  text-gray-400 rounded-md text-2xl font-semibold hover:text-black"
                                onClick={() => previousPage()}
                                disabled={!canPreviousPage}
                            >
                                {/* <FontAwesomeIcon
                                    className="hover:cursor-pointer"
                                    icon={icon({
                                        name: "backward-step",
                                        style: "solid",
                                    })}
                                /> */}
                            </button>
                            <button
                                type="button"
                                className="ml-8  text-gray-400 rounded-md text-2xl font-semibold hover:text-black"
                                onClick={() => nextPage()}
                                disabled={!canNextPage}
                            >
                                {/* <FontAwesomeIcon
                                    className="hover:cursor-pointer"
                                    icon={icon({
                                        name: "forward-step",
                                        style: "solid",
                                    })}
                                /> */}
                            </button>
                            <button
                                type="button"
                                className="ml-6 navbar-text text-gray-400 rounded-md text-2xl font-semibold hover:text-black"
                                onClick={() => gotoPage(pageCount - 1)}
                                disabled={!canNextPage}
                            >
                                {/* <FontAwesomeIcon
                                    className="hover:cursor-pointer"
                                    icon={icon({
                                        name: "forward",
                                        style: "solid",
                                    })}
                                /> */}
                            </button>
                        </div>
                        <div className="w-auto py-2 px-2 text-gray-600">
                            <span>
                                Página{" "}
                                <strong>
                                    {pageIndex + 1} de {pageOptions.length}
                                </strong>{" "}
                            </span>
                        </div>
                        <div className="w-auto py-2 px-2 text-gray-600">
                            <span>
                                | Ir a página:{" "}
                                <input
                                    className="h-8 bg-gray-200 border-2 border-neutral-400 rounded-md hover:shadow-md"
                                    type="number"
                                    defaultValue={pageIndex + 1}
                                    onChange={(e) => {
                                        const page = e.target.value
                                            ? Number(e.target.value) - 1
                                            : 0;
                                        gotoPage(page);
                                    }}
                                    style={{ width: "60px" }}
                                />
                            </span>{" "}
                        </div>
                        <div className="w-auto py-2 px-2">
                            <select
                                className="h-8 bg-gray-200 border-2 border-neutral-400 rounded-md hover:shadow-md"
                                value={pageSize}
                                onChange={(e) => {
                                    setPageSize(Number(e.target.value));
                                }}
                            >
                                {[5, 10, 15].map((pageSize) => (
                                    <option key={pageSize} value={pageSize}>
                                        Filas: {pageSize}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
