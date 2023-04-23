import { Paper, Table, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import moment from "moment";
import { DataGrid } from '@mui/x-data-grid';
import { groupAndSort } from "../utils/groupAndSort";

export default function MyTable({ data ,devices}) {
    if (!data?.length) return (<div>No data</div>)
    console.log("data", data)
    const columns = devices.map((device) => {
        return {
            field: device.name,
            width: 150,
            headerAlign: 'center',
            align: 'center'
        }
    })
    columns.unshift({ field: "dateTime", width: 150, headerName: "Tiempo" })
    console.log("columns", columns)
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                density="compact"
                showCellVerticalBorder={true}

                rows={data}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                style={{ padding: 10 }}
            />
        </div>
    )
}