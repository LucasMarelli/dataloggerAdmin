import { Paper, Table, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';

export default function MyTable({ data, devices }) {
    if (!data?.length) return (<div>No data</div>)
    console.log("data", data)
    const columns = devices.map((device) => {
        return {
            field: device.name,
            headerName: `${device.name} [${device.unit}]`,
            width: 250,
            headerAlign: 'center',
            align: 'center'
        }
    })
    columns.unshift({
        field: "dateTime", width: 150,
        headerName: "Tiempo",
        headerAlign: 'center',
        align: 'center'
    })
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