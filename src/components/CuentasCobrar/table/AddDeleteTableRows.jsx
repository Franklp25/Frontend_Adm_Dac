import { useState } from "react";
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableContainer,
    Modal,
    TextField,
} from "@mui/material";
import TableRows from "./TableRows";

function AddDeleteTableRows() {
    const [rowsData, setRowsData] = useState([]);

    const addTableRows = () => {
        const rowsInput = {
            fullName: "",
            emailAddress: "",
            salary: "",
        };
        setRowsData([...rowsData, rowsInput]);
    };
    const deleteTableRows = (index) => {
        const rows = [...rowsData];
        rows.splice(index, 1);
        setRowsData(rows);
    };

    const handleChange = (index, evnt) => {
        const { name, value } = evnt.target;
        const rowsInput = [...rowsData];
        rowsInput[index][name] = value;
        setRowsData(rowsInput);
    };
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-8">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Full Name</th>
                                <th>Email Address</th>
                                <th>Salary</th>
                                <th>
                                    <button
                                        className="btn btn-outline-success"
                                        onClick={addTableRows}
                                    >
                                        +
                                    </button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <TableRows
                                rowsData={rowsData}
                                deleteTableRows={deleteTableRows}
                                handleChange={handleChange}
                            />
                        </tbody>
                    </table>
                </div>
                <div className="col-sm-4"></div>
            </div>
        </div>
    );
}
export default AddDeleteTableRows;
