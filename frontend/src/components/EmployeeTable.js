import React from 'react';
import { useTable, usePagination } from 'react-table';

const EmployeeTable = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    usePagination
  );

  return (
    <>
      <table {...getTableProps()} style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} style={{ backgroundColor: '#3498db', color: 'white' }}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} style={{ padding: '10px', borderBottom: '2px solid #ddd' }}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, rowIndex) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} style={{ backgroundColor: rowIndex % 2 === 0 ? '#f2f2f2' : 'white' }}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          style={{ padding: '10px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          Previous
        </button>
        <span style={{ fontSize: '16px' }}>
          Page{' '}
          <strong>
            {pageIndex + 1} of {Math.ceil(data.length / pageSize)}
          </strong>{' '}
        </span>
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          style={{ padding: '10px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default EmployeeTable;
