import { Button, Checkbox, Divider, FormControlLabel, FormGroup } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

export default function DeviceFilter({ devices, onChange = (where) => { } }) {
    const [selection, setSelection] = useState([])
    const columns = [{
        field: "name",
        headerName: "Dispositivos",
        width: 180,
    }]
    const onSelectionChange = (ids) => {
        const where = { id: { inq: ids } }
        console.log("ids", ids)
        setSelection(ids)
        onChange(where)
    }
    useEffect(() => {
        const ids = devices?.map((device) => device.id)
        console.log("useEfect", devices, ids)
        setSelection(ids)
    }, [devices])
    if (!devices?.length) return
    return (
        <>  
            <DataGrid
                style={{ maxWidth: 250, marginTop: 30}}
                density="compact"
                rows={devices}
                columns={columns}
                checkboxSelection
                pagination={false}
                hideFooterPagination={true}
                hideFooter={true}
                disableRowSelectionOnClick
                onRowSelectionModelChange={onSelectionChange}
                rowSelectionModel={selection}
            />
        </>
    )
}

{/* <FormGroup style={{ display: "flex", alignItems: "start" }}>
<FormControlLabel control={<Checkbox defaultChecked size="small" />} label={<div style={{ fontSize: 15 }}>Dipositivos</div>} />
<Divider style={{ color: "red" }} />
{devices?.map((device) => <FormControlLabel control={<Checkbox defaultChecked size="small" sx={{
    color: device.color,
    '&.Mui-checked': {
        color: device.color,
    },
}} />} label={<div style={{ color: device.color, fontSize: 15 }}>{device.name}</div>} />)}
</FormGroup> */}