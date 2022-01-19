// import React, { useState, useEffect } from "react";
// // import "./Tables.css";
// import { listReservations } from "../utils/api";
// import ErrorAlert from "../layout/ErrorAlert";
// import { useHistory } from "react-router-dom";

// const TableList = ({ table, loadDashboard }) => {
//     const [reservations, setReservations] = useState([]);
//     const [error, setError] = useState(null);
//     const history = useHistory()
//     useEffect(() => {
//         listReservations().then(setReservations);
//     }, []);

//     async function handleFinish(tableId) {
//         if (
//             window.confirm(
//                 "Is this table ready to seat new guests?  This cannot be undone."
//             )
//         ) {
//             try {
//                 await (tableId);
//                 history.go()
//             } catch (err) {
//                 setError(err);
//             }
//         }
//     }

//     const foundRes = reservations.find(
//         (reservation) =>
//             Number(reservation.reservation_id) === Number(table.reservation_id)
//     );

//     return (
//         <div className="table">
//             <ErrorAlert error={error} />
//             <h5 className="table-name text-center">Name: {table.table_name}</h5>
//             <hr />
//             <p>Capacity: {table.capacity}</p>
//             <p data-table-id-status={`${table.table_id}`}>
//                 Status: {table.reservation_id ? <span className="text-danger">Occupied by </span> : <span>Free</span>}
//                 {foundRes && (
//                     <span className="text-danger">
//                         {foundRes.first_name} {foundRes.last_name}
//                     </span>
//                 )}
//             </p>

//             {table.reservation_id && (
//                 <button
//                     type="submit"
//                     variant="contained"
//                     color="warning"
//                     data-table-id-finish={`${table.table_id}`}
//                     onClick={() => handleFinish(table.table_id)}
//                 >
//                     Finish
//                 </button>
//             )}
//         </div>
//     );
// };

// export default TableList;

// import React, { useState } from 'react';
// import { Link, useHistory } from 'react-router-dom';
// import { finishTable } from '../utils/api';
// import ErrorAlert from '../layout/ErrorAlert';

// // import './Table.css';

// const Table = ({table}) => {
//     const { table_name, capacity, table_id, reservation_id } = table;
//     const [tableError, setTableError] = useState(null);
//     const history = useHistory();

//     let status = reservation_id ? 'occupied' : 'free';
//     let tableShape = capacity <= 2 ? 'double' : capacity <= 4 ? 'quad' : 'great';

//     const handleFinish = () => {
//         if (
//             window.confirm(
//                 'Is this table ready to seat new guests? This cannot be undone.'
//             )
//         ) {
//             const abortController = new AbortController();
//             setTableError(null);

//             finishTable(table_id, abortController.signal)
//                 .then(() => history.go(0))
//                 .catch(setTableError);
//             return () => abortController.abort();
//         }
//     };

//     let editBtn = reservation_id ? null : (
//         <Link to={`/tables/${table_id}/edit`}>
//             <span className="oi oi-cog" />
//         </Link>
//     );

//     let finishBtn = null;
//     if (reservation_id) {
//         finishBtn = (
//             <button
//                 className="btn btn-info shadow mb-2"
//                 onClick={handleFinish}
//                 data-table-id-finish={`${table_id}`}
//             >
//                 <span>Finish</span>
//             </button>
//         );
//     }

//     return (
//         <div
//             className="card tableCard m-2"
//             style={{ minWidth: '250px', maxWidth: '350px' }}
//             key={table_id}
//         >
//             <div className="card-header d-flex justify-content-between align-content-center">
//                 <h5 className="m-0">{table_name}</h5>
//                 {editBtn}
//             </div>
//             <div className="d-flex justify-content-center tableShape">
//                 <div className={`${tableShape}`} />
//             </div>
//             <div>
//                 Status:&nbsp;
//                 <span
//                     className={
//                         status === 'free'
//                             ? 'text-success font-weight-bold text-uppercase'
//                             : 'text-danger font-weight-bold text-uppercase'
//                     }
//                     data-table-id-status={`${table_id}`}
//                 >
//                     {status}
//                 </span>
//             </div>
//             <h5>Capacity: {capacity}</h5>
//             <div className="d-flex justify-content-center">{finishBtn}</div>
//             <ErrorAlert error={tableError} />
//         </div>
//     );
// };

// export default Table;

// import React, { useState } from "react";
// // import { useHistory } from "react-router";
// import Table from "react-bootstrap/Table";
// // import { createTable } from "../utils/api";

// export default function Tables({date}) {
// //   const initialTable = {
// //     table_name: "",
// //     capacity: 0,
// //   };


// const [reservation, setReservation] = useState({
//     first_name: "",
//     last_name: "",
//     mobile_number: "",
//     reservation_date: {date},
//     reservation_time: "",
//     people: "1",
// })

//   const [table, setTable] = useState([]);
// //   const history = useHistory();

//   function handleChange(event) {
//     setTable({
//       ...table,
//       [event.target.name]: event.target.value,
//     });
//   }



//   function goHome() {
//     history.push("/");
//   }

//   async function formHandler(event) {
//     event.preventDefault();
//     await createTable(table)
//       .then((response) => {
//         setTable({ ...initialTable });
//         goHome();
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }



//   return (
//     <>
//       <Table stripped bordered hover size="sm" onChange={handleChange}>
//         <thead>
//           <tr>
//             <th width="170">#</th>
//             <th width="170">NAME</th>
//             <th width="170">PHONE</th>
//             <th width="870">DATE</th>
//             <th width="1950">TIME</th>
//             <th width="1950">PEOPLE</th>
//             <th width="1950">STATUS</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>{reservation.reservation_id}</td>
//             <td>CHRISTINA</td>
//             <td>1234567890</td>
//             <td>01-28-2023</td>
//             <td>2:00PM</td>
//             <td>1</td>
//             <td>BOOKED</td>
//           </tr>
//         </tbody>
//       </Table>
//     </>
//   );
// }


import React, { useState } from "react";
import { deleteTable, listTables, updateReservationStatus } from "../utils/api";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";

function Table({ table }) {
  const [currentTable, setCurrentTable] = useState(table);
  const history = useHistory();
  const [error, setError] = useState(null);


  async function clearAndLoadTables() {
    const abortController = new AbortController();
    try {
      const response = await deleteTable(currentTable.table_id, abortController.signal);
      const tableToSet = response.find((table) => table.tableInfo === currentTable.table_id);
      setCurrentTable({ ...tableToSet })
      listTables()
      return tableToSet;
    } catch (error) {
      setError(error);
    }
  }

  async function handleClear(event) {
    const abortController = new AbortController();
    event.preventDefault();
    setError(null);
    if (window.confirm("Is this table ready to seat new guests? This cannot be undone.")) {
      await updateReservationStatus({ status: "finished" }, currentTable.reservation_id, abortController.signal);
      const newTable = await clearAndLoadTables();
      console.log(newTable);
      history.push("/tables");
      return;
    }

  }

  return (
    <>
      <ErrorAlert error={error} />
      <tr>
        <th scope="row"> {currentTable.table_id} </th>
        <td> {currentTable.table_name} </td>
        <td> {currentTable.capacity} </td>
        <td> {currentTable.reservation_id} </td>
        <td data-table-id-status={`${table.table_id}`}> {currentTable.table_status} </td>
        <td >
          {currentTable.reservation_id ?
            <button
              className="btn btn-danger"
              onClick={handleClear}
              data-table-id-finish={`${table.table_id}`}
            >
              Finish
            </button>
            :
            <></>
          }
        </td>
      </tr>
    </>
  );
}

export default Table;